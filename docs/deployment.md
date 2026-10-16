# Production deployment

This repository builds the PAUSE site in GitHub Actions and publishes the finished Next.js standalone image to `ghcr.io/alizabetpoor/pause`. The VPS only pulls and runs that image. It never checks out the application or runs npm, Next.js, or Docker build commands.

## Runtime choice

The project uses Next.js 16.4.1, React 19, npm (`package-lock.json`), and the App Router. It uses `next/image`, so it needs the Next.js Node server for image optimization. The app has client components for its carousels and mobile navigation, but no Server Actions, API routes, database, or other runtime service. `output: "standalone"` packages the production server and its traced dependencies into a small runtime image. The image uses the current Node.js 24 LTS line, listens on container port 3000, and runs as the unprivileged `node` user. The [Node.js release schedule](https://nodejs.org/en/about/previous-releases) lists v24 as LTS.

Next's local deployment guide distinguishes full-featured Docker/Node hosting from limited static export; this app uses the server deployment path: [Next.js deployment options](https://nextjs.org/docs/app/getting-started/deploying).

## Workflow behavior

`.github/workflows/ci-cd.yaml` is restricted to pull requests targeting `deploy` and pushes to `deploy`:

1. Both events run `npm ci`, ESLint, TypeScript, `next build`, a GitHub-hosted Docker build, and a bounded HTTP smoke check against the container. No test script exists in `package.json`, so the workflow does not invent one.
2. Only a push to `deploy` can publish. That job requires `SITE_URL` and `IMAGE_PLATFORM`, logs in to GHCR with the job-scoped `GITHUB_TOKEN`, builds the production image with Buildx/QEMU, and publishes the immutable `sha-<full-commit-sha>` tag. BuildKit's GitHub Actions cache is used. The workflow inspects the pushed tag before allowing deployment to proceed.
3. CI also renders the production Compose file and validates `caddy/Caddyfile` using the official `caddy:2-alpine` image with a reserved validation-only hostname. The deploy job uses SSH with strict host-key checking, checks the VPS directory, `.env`, Docker, and Compose, creates the Caddy config directory, and transfers `compose.production.yaml`, `caddy/Caddyfile`, and `deploy/deploy.sh`. It never transfers or overwrites `.env`.
4. The VPS pulls the exact GHCR image tag from the preceding job and the official Caddy image, validates Caddy's config, then runs `docker compose up --no-build --wait`. Caddy's health check validates its configuration; the Next.js container retains its HTTP health check. After first deployment, verify the public hostname over HTTPS from outside the VPS to confirm DNS, firewall, and ACME issuance. On failure the script prints bounded app and Caddy logs and attempts to restore the previous successful immutable tag. The deployment exits unsuccessfully even if rollback succeeds, so the failed release remains visible in Actions.

Workflow actions are pinned to full commit SHAs. Pull requests do not receive SSH secrets or package-write permission. Workflow concurrency serializes runs for the same branch; a deploy cannot be superseded mid-flight by another run.

## Configuration inventory

### Application and Compose variables

| Name | Where | Required | Purpose |
|---|---|---:|---|
| `SITE_URL` | Local `.env`; GitHub Actions **Variable** for production | Required for deployment; optional locally | Verified HTTPS origin used at build time for canonical metadata, sitemap, robots and absolute social/structured-data URLs. It is public configuration, not a secret. Changing it requires rebuilding the image. The workflow rejects a missing value. |
| `SITE_DOMAIN` | `.env` on the VPS | Required | Real public hostname served by Caddy. Caddy uses it for automatic HTTPS. This server-side setting is not passed to Next.js; do not use the `.env.example` placeholder. |
| `IMAGE_PLATFORM` | GitHub Actions **Variable** | Required for publishing | Target Docker platform, exactly `linux/amd64` or `linux/arm64`. Set it to match `uname -m` on the VPS (`x86_64` → `linux/amd64`, `aarch64` → `linux/arm64`). The QEMU builder supports the configured cross-platform build. |

There are no `NEXT_PUBLIC_*` variables and no required application runtime secrets. `SITE_URL` is read while Next statically generates the homepage metadata and sitemap, so setting it only in the VPS `.env` cannot update the image. It is provided to the GitHub build instead. Set `SITE_URL` and `SITE_DOMAIN` to the same canonical origin/hostname in their respective GitHub and VPS configuration. The example file documents these variables; `.env` is ignored by Git and Docker. `APP_PORT` is no longer used: Next.js is reachable only on the Compose network at `app:3000`.

### GitHub Actions Variables

Create these under **Repository → Settings → Secrets and variables → Actions → Variables**:

| Variable | Value |
|---|---|
| `SITE_URL` | The real production HTTPS origin, with no path, query, or credentials. Do not use a placeholder, localhost, or an unverified domain. |
| `IMAGE_PLATFORM` | `linux/amd64` or `linux/arm64`, determined from the VPS. |
| `VPS_APP_DIR` | An existing absolute VPS directory containing its production `.env`, for example a chosen `/opt/...` app directory. It must contain only letters, numbers, `/`, `.`, `_`, and `-`, and must not contain `..`. |
| `VPS_PORT` | Optional SSH TCP port; defaults to `22`. |

### GitHub Actions Secrets

Create these under **Repository → Settings → Secrets and variables → Actions → Secrets**:

| Secret | Value |
|---|---|
| `VPS_HOST` | VPS DNS name or IPv4 address. |
| `VPS_USER` | Dedicated deployment account with Docker/Compose access and write access to `VPS_APP_DIR`. Access to the Docker socket is effectively root access. |
| `VPS_SSH_PRIVATE_KEY` | Private key for the deployment account. Use a dedicated key and do not commit it or send it to Codex. |
| `VPS_KNOWN_HOSTS` | The exact known-hosts line for the VPS, including `[host]:port` syntax for a non-default SSH port. Verify its fingerprint using the VPS provider console or another trusted channel before saving it. The workflow does not run `ssh-keyscan` or disable host-key checks. |

`GITHUB_TOKEN` is supplied automatically by Actions. Only the publish job receives `packages: write`; CI and SSH deployment do not. The package path is derived from this repository's verified Git remote, `alizabetpoor/pause`, and lowercased for GHCR.

## First-time GitHub setup

1. Add and protect the `deploy` branch according to your merge policy. Push this configuration to that branch (or open a PR targeting it) after reviewing it.
2. Inspect the VPS architecture with `uname -m`, then set `IMAGE_PLATFORM` as above.
3. Set `SITE_URL` to the verified production origin and set `VPS_APP_DIR`/SSH settings in GitHub. Set `SITE_DOMAIN` to the matching hostname in the VPS `.env`. Deployment will fail closed until the required values are valid.
4. Add `VPS_HOST`, `VPS_USER`, `VPS_SSH_PRIVATE_KEY`, and verified `VPS_KNOWN_HOSTS` secrets. Set `VPS_PORT` only if SSH does not use port 22.
5. In the repository's **Actions** settings, allow GitHub Actions to create and write packages. The workflow grants only the job-scoped `packages: write` permission.

## First-time VPS setup

Perform these steps from the VPS console or a trusted administrative SSH session. The deployment workflow does not install Docker, change firewall rules or DNS, or stop unrelated services.

1. Install a maintained Docker Engine and Docker Compose v2 using the VPS distribution's official instructions. Create a dedicated deployment user. On Debian/Ubuntu, for example:

   ```sh
   sudo adduser --disabled-password --gecos '' pause-deploy
   sudo usermod -aG docker pause-deploy
   ```

   Docker socket access is effectively root-equivalent; only grant it to this trusted deployment account. Log in again as that user and verify `docker compose version` works.
2. Create a dedicated, unencrypted Ed25519 SSH key pair on a trusted workstation (the Actions workflow is non-interactive):

   ```sh
   ssh-keygen -t ed25519 -C 'github-actions PAUSE deploy' -f pause-deploy -N ''
   ```

   Add only `pause-deploy.pub` to the deployment user's `~/.ssh/authorized_keys`, with `.ssh` mode `700` and `authorized_keys` mode `600`. Save the private key file as the GitHub Secret `VPS_SSH_PRIVATE_KEY`. Do not add it to the repository, share it here, or reuse a personal login key.
3. Point the canonical hostname's DNS A record (and AAAA record only if IPv6 reaches this VPS) to the server. Confirm inbound TCP 80 and 443 are permitted and not already occupied by another service. Caddy needs public reachability on those ports for ACME certificate issuance and renewal. The deployment does not change DNS, firewall rules, or existing proxies; resolve any port conflict deliberately before switching traffic.
4. Create the deployment directory and its private Compose environment file. Example (replace the directory and hostname with your real configured values):

   ```sh
   sudo install -d -o pause-deploy -g pause-deploy -m 0750 /opt/pause
   sudo -u pause-deploy sh -c 'umask 077; printf "%s\n" "SITE_DOMAIN=your-verified-domain" > /opt/pause/.env'
   sudo chmod 600 /opt/pause/.env
   ```

   This file is independent of the checkout's local `.env`; deployment does not copy or overwrite it. `SITE_DOMAIN` must be the real public hostname; do not use the `.env.example` placeholder.
5. Verify the SSH host key against a trusted VPS console fingerprint. Store its exact line in `VPS_KNOWN_HOSTS`; do not trust an unverified `ssh-keyscan` result. If you use `ssh-keyscan` to collect the public key, compare its fingerprint with the VPS provider console before adding it to the secret.
6. Choose GHCR image visibility:
   - **Public package:** GHCR permits anonymous image pulls, so no GHCR credential is needed on the VPS.
   - **Private package:** complete a one-time `docker login ghcr.io` on the VPS as the deployment user using a dedicated GitHub PAT (classic) with only `read:packages` and access to this package. Do not put the token in GitHub workflow inputs, this repository, `.env`, or the image. Enter it interactively through `--password-stdin`; restrict `~/.docker` permissions and configure a Docker credential helper where available. GitHub documents `GITHUB_TOKEN` for publishing workflow-associated packages and a classic PAT with `read:packages` for external pulls: [Container registry authentication](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry#authenticating-in-a-github-actions-workflow).

   For a private package, an example interactive setup is:

   ```sh
   install -d -m 700 "$HOME/.docker"
   read -rsp 'GHCR read-only token: ' GHCR_READ_TOKEN; printf '\n'
   printf '%s' "$GHCR_READ_TOKEN" | docker login ghcr.io --username YOUR_GITHUB_USERNAME --password-stdin
   unset GHCR_READ_TOKEN
   chmod 700 "$HOME/.docker"
   chmod 600 "$HOME/.docker/config.json"
   ```

   Run this only on the VPS as the deployment user. Do not paste the token into chat, source control, or a GitHub Actions log.

The first image is deployed by the first successful push/merge to `deploy` after configuration. No prior image exists for rollback on that first deployment; later deploys retain their last successful immutable tag in `.last-successful-image-tag`. Caddy's certificate and runtime state live in the named `caddy_data` and `caddy_config` volumes. Routine deployment does not delete them; do not add `down -v` or volume pruning to this workflow.

## Inspect, rollback, and troubleshoot

Run these on the VPS from `VPS_APP_DIR` as the deployment user:

```sh
docker compose -f compose.production.yaml ps
docker compose -f compose.production.yaml logs --tail 100 app
docker compose -f compose.production.yaml logs --tail 100 caddy
docker compose -f compose.production.yaml exec caddy caddy validate --config /etc/caddy/Caddyfile --adapter caddyfile
docker inspect --format '{{.Config.Image}} {{.State.Health.Status}}' "$(docker compose -f compose.production.yaml ps -q app)"
cat .last-successful-image-tag
```

To manually roll back, select an earlier successful immutable tag from the GHCR package versions, set `IMAGE_TAG` to that exact `sha-<40-hex-commit>` tag, and run `docker compose pull app` followed by `docker compose up -d --no-build --wait app`:

```sh
export GHCR_IMAGE=ghcr.io/alizabetpoor/pause
export IMAGE_TAG='sha-<40-character-commit-sha>'
```

Replace the placeholder with the chosen older tag. Never run `docker compose build` or broad prune/cleanup commands on the VPS.

Common failures:

- **Missing `SITE_URL` / `IMAGE_PLATFORM`:** set the GitHub Actions Variables; the publisher fails before SSH if either is absent or invalid.
- **Missing or incorrect `SITE_DOMAIN`:** set the real public hostname in the VPS app directory's `.env`. Verify its DNS and inbound TCP 80/443 reach this VPS; never copy `.env.example` as production configuration.
- **SSH host-key error:** verify the current host fingerprint out-of-band and update `VPS_KNOWN_HOSTS`. Do not disable strict checking.
- **Remote directory or `.env` error:** create the directory and its own file as described above; deployment intentionally refuses to invent or overwrite runtime configuration.
- **GHCR denied:** confirm the package is public or re-run the VPS's one-time read-only registry login, and make sure that GitHub account can read this package.
- **HTTPS or certificate issue:** inspect Caddy logs, verify `SITE_DOMAIN` DNS records and inbound TCP ports 80/443, and check for another service occupying those ports. UDP 443 is published for HTTP/3 where supported; TCP 80/443 provide HTTP and HTTPS.
- **Architecture mismatch:** compare VPS `uname -m` with `IMAGE_PLATFORM`, update the variable, and publish a new commit.
- **Workflow/package permission error:** verify Actions package write is enabled and the publishing job has not been restricted by organization policy.

## Local commands and validation

```sh
npm ci
npm run lint
npx tsc --noEmit
npm run build
docker build --build-arg SITE_URL=https://YOUR-VERIFIED-DOMAIN -t pause-web:local .
docker run --rm -p 127.0.0.1:3000:3000 pause-web:local
```

Replace the final build URL only with the real verified origin. The repository currently has no test script, and Docker is required for local container validation. The CI workflow performs the image build and HTTP smoke test on GitHub-hosted Ubuntu runners.
