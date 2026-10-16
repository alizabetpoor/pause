# PAUSE Architecture Studio

The site is a Next.js App Router application built with React, TypeScript, and Tailwind CSS v4. The current public route is `/`; its established English design remains in place, with Persian service and local-search copy in the Services and About sections. The document language remains English because English is still the primary page language; the Persian passages are explicitly marked `lang="fa"` and `dir="rtl"`.

## Project structure

```text
src/
  app/                         App Router files, global CSS, sitemap and robots
  components/
    layout/                    Site header, mobile navigation, footer and nav data
    ui/                        Shared brand mark, section intro, links and social icons
  features/home/
    home-page.tsx              Homepage composition and JSON-LD script
    data/                      Hero slides, services, projects and study image data
    sections/
      hero/                    Hero composition, controls, project info and slider hook
      services/                Services section and service card
      projects/                 Projects section, carousel and project card
      about/                    About section and exploration carousel
  lib/seo/                     Site profile, domain, metadata and structured data
public/
  assets/figma/                Existing design assets
  images/                      Social sharing images
```

## Where to edit content

- Hero slide order and image descriptions: `src/features/home/data/hero-slides.ts`.
- Slider gesture, keyboard, autoplay and timer behavior: `src/features/home/sections/hero/use-hero-slider.ts`.
- Services and projects: `src/features/home/data/services.ts` and `projects.ts`.
- About study images and desktop placement: `src/features/home/data/exploration-studies.ts`.
- Business name, location, Instagram, and approved Persian description: `src/lib/seo/studio-config.ts`.
- Design tokens and global layout styles: `src/app/globals.css`.
- SEO title, description, canonical, Open Graph and Twitter metadata: `src/lib/seo/metadata.ts`.
- Schema.org business data: `src/lib/seo/structured-data.ts`.

Keep project and service claims grounded in the existing work. Add a detail route only when there is distinct project or service information to publish. New pages belong under `src/app/`; reusable homepage sections belong under `src/features/home/sections/`.

## Production domain

Set `SITE_URL` to the verified HTTPS site origin in the production build environment before `npm run build`. It supplies the canonical URL, sitemap URL, structured-data website URL, and absolute social metadata. Without a valid configured URL, those absolute URLs and social preview images are omitted. Local `.env` is ignored by Git and Docker; `.env.example` documents the values without secrets. Production uses the Actions Variable `SITE_URL` so it is embedded during the GitHub-hosted build.

## Production deployment

The `deploy` branch CI/CD workflow builds and smoke-tests the standalone Docker image on GitHub-hosted runners, publishes an immutable commit SHA tag to GHCR, then deploys that exact image over verified SSH. The VPS does not build the application. See [`docs/deployment.md`](docs/deployment.md) for the required GitHub settings, first-time VPS setup, health checks, rollback, and troubleshooting.

## Run and verify

```bash
npm run dev
npm run lint
npx tsc --noEmit
npm run build
npm run start
```

There is no test or browser automation script in `package.json`. The lint, TypeScript, and production build commands are the available automated checks.

## SEO research

The Persian keyword clusters, intent map, evidence limitations, and content recommendations are documented in [`docs/seo-keyword-map.md`](docs/seo-keyword-map.md). Search volumes and SEO difficulty are intentionally left unreported until Keyword Planner or Search Console data is available.
