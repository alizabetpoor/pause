#!/usr/bin/env bash
set -Eeuo pipefail
umask 077

APP_DIR="${1:-}"
GHCR_IMAGE="${2:-}"
NEW_TAG="${3:-}"

fail() {
  printf 'Deployment error: %s\n' "$*" >&2
  exit 1
}

[[ -n "$APP_DIR" && "$APP_DIR" == /* ]] || fail "VPS_APP_DIR must be an absolute deployment directory."
[[ "$APP_DIR" != "/" ]] || fail "VPS_APP_DIR cannot be the filesystem root."
[[ "$APP_DIR" =~ ^/[A-Za-z0-9_./-]+$ ]] || fail "VPS_APP_DIR may contain only letters, digits, slash, dot, underscore, and hyphen."
[[ ! "$APP_DIR" =~ (^|/)\.\.(/|$) ]] || fail "VPS_APP_DIR cannot contain parent-directory segments."
[[ "$GHCR_IMAGE" =~ ^ghcr\.io/[a-z0-9_.-]+/[a-z0-9_.-]+$ ]] || fail "The GHCR image path is invalid."
[[ "$NEW_TAG" =~ ^sha-[0-9a-f]{40}$ ]] || fail "The deployment tag must be sha- followed by the full commit SHA."

[[ -d "$APP_DIR" ]] || fail "Deployment directory does not exist: $APP_DIR. Create it during VPS setup first."
[[ -f "$APP_DIR/.env" ]] || fail "Production .env is missing in $APP_DIR; create it without copying the repository's local .env."
[[ -f "$APP_DIR/compose.production.yaml" ]] || fail "Production Compose file was not installed."
command -v docker >/dev/null || fail "Docker is not installed or unavailable to this deployment user."
docker compose version >/dev/null 2>&1 || fail "Docker Compose v2 is required on the VPS."

cd "$APP_DIR"
export GHCR_IMAGE
IMAGE_TAG="$NEW_TAG"
export IMAGE_TAG

docker compose -f compose.production.yaml config --quiet \
  || fail "Compose configuration is invalid; check the deployment .env and transferred configuration."

PREVIOUS_TAG=""
STATE_FILE="$APP_DIR/.last-successful-image-tag"
if [[ -f "$STATE_FILE" ]]; then
  stored_tag="$(<"$STATE_FILE")"
  if [[ "$stored_tag" =~ ^sha-[0-9a-f]{40}$ && "$stored_tag" != "$NEW_TAG" ]]; then
    PREVIOUS_TAG="$stored_tag"
  fi
fi

# Prefer the actual currently running image if it belongs to this repository.
running_id="$(docker compose -f compose.production.yaml ps --quiet app 2>/dev/null || true)"
if [[ -n "$running_id" ]]; then
  running_image="$(docker inspect --format '{{.Config.Image}}' "$running_id" 2>/dev/null || true)"
  if [[ "$running_image" =~ ^${GHCR_IMAGE//./\.}:sha-([0-9a-f]{40})$ ]]; then
    PREVIOUS_TAG="sha-${BASH_REMATCH[1]}"
  fi
fi

wait_until_healthy() {
  if ! docker compose -f compose.production.yaml up --detach --no-build --wait --wait-timeout 120 app; then
    return 1
  fi

  local container_id status attempt
  container_id="$(docker compose -f compose.production.yaml ps --quiet app)" || return 1
  [[ -n "$container_id" ]] || return 1

  for attempt in {1..12}; do
    status="$(docker inspect --format '{{if .State.Health}}{{.State.Health.Status}}{{else}}{{.State.Status}}{{end}}' "$container_id" 2>/dev/null || true)"
    [[ "$status" == "healthy" ]] && return 0
    [[ "$status" == "exited" || "$status" == "dead" ]] && break
    sleep 5
  done

  return 1
}

printf 'Pulling %s:%s\n' "$GHCR_IMAGE" "$NEW_TAG"
docker compose -f compose.production.yaml pull app

if wait_until_healthy; then
  state_tmp="$STATE_FILE.tmp.$$"
  printf '%s\n' "$NEW_TAG" > "$state_tmp"
  mv -f "$state_tmp" "$STATE_FILE"
  printf 'Deployment healthy: %s:%s\n' "$GHCR_IMAGE" "$NEW_TAG"
  exit 0
fi

printf 'New deployment failed its health check. Recent application logs follow.\n' >&2
docker compose -f compose.production.yaml logs --tail 100 app >&2 || true

if [[ -n "$PREVIOUS_TAG" ]]; then
  printf 'Attempting rollback to %s:%s\n' "$GHCR_IMAGE" "$PREVIOUS_TAG" >&2
  IMAGE_TAG="$PREVIOUS_TAG"
  export IMAGE_TAG
  if docker compose -f compose.production.yaml pull app && wait_until_healthy; then
    printf 'Rollback healthy: %s:%s\n' "$GHCR_IMAGE" "$PREVIOUS_TAG" >&2
  else
    printf 'Rollback failed. Previous image tag: %s. Inspect Docker and application logs.\n' "$PREVIOUS_TAG" >&2
    docker compose -f compose.production.yaml logs --tail 100 app >&2 || true
  fi
else
  printf 'No previous successful image is available for rollback. Removing only the failed app service.\n' >&2
  docker compose -f compose.production.yaml rm --stop --force app >/dev/null 2>&1 || true
fi

exit 1
