# Cogito Academy Website

The official website for **Cogito Academy**, an Indonesian educational organization specializing in competition tutoring. Built as a bilingual (Indonesian/English) platform featuring tutor profiles, a competition calendar, event listings, and password-gated student resources.

**Live CMS:** [Sanity Studio](https://cogitoacademy.sanity.studio/)

**Dev Preview:** [cogitoacademy.vercel.app](https://cogitoacademy.vercel.app)

**Production:** [www.cogitoacademy.id](https://www.cogitoacademy.id)

**Repository:** [cogitoacademy/website](https://github.com/cogitoacademy/website)

## Tech Stack

| Category        | Technology                       |
| --------------- | -------------------------------- |
| Framework       | Next.js 16 (App Router)          |
| React           | React 19 + React Compiler        |
| Language        | TypeScript 5                     |
| CSS             | Tailwind CSS v4                  |
| Components      | shadcn/ui + Base UI primitives   |
| CMS             | Sanity v5 (with next-sanity)     |
| i18n            | next-intl (Indonesian + English) |
| Animation       | Motion (Framer Motion)           |
| Monorepo        | Turborepo                        |
| Package Manager | Bun                              |
| Linting         | Oxlint + Biome                   |
| Formatting      | Oxfmt + Biome                    |

## Project Structure

```
cogito-acad/
└── apps/
    ├── web/                  # Next.js frontend
    │   ├── src/
    │   │   ├── app/[locale]/ # Locale-based routing (id, en)
    │   │   ├── components/   # UI components (landing, events, calendar, etc.)
    │   │   ├── queries/      # Sanity GROQ queries
    │   │   ├── sanity/       # Sanity client config
    │   │   ├── i18n/         # Locale routing + message loading
    │   │   ├── lib/          # Utilities, config, transforms
    │   │   └── types/        # TypeScript type definitions
    │   └── messages/         # Translation files (id.json, en.json)
    └── studio/               # Sanity Content Studio (CMS admin)
        └── schemaTypes/      # Content schemas (tutor, event, competition, etc.)
```

## Pages

| Route                | Description                                                     |
| -------------------- | --------------------------------------------------------------- |
| `/`                  | Landing page (hero, events, methods, tutors, testimonials, FAQ) |
| `/tutors`            | Filterable tutor directory with detail modals                   |
| `/calendar`          | Interactive competition calendar (month/week/day/agenda views)  |
| `/events/[category]` | Event listings by category (upcoming + past)                    |
| `/blog`              | Bilingual blog index backed by the Cogito app content API        |
| `/student-resources` | Password-gated study materials                                  |
| `/contact`           | Contact info, collaboration, tutor recruitment                  |

All routes are prefixed with locale: `/id/...` (Indonesian, default) or `/en/...` (English).

## Blog

`/[locale]/blog` lists published articles from the Cogito app. The article route is
`/[locale]/blog/[slug]`. Category hubs use `/[locale]/blog/kategori/[slug]` in
Indonesian and `/[locale]/blog/category/[slug]` in English; a mixed locale and
segment pair returns 404. `/blog-sitemap.xml` emits one entry per published locale
version with `xhtml:link` alternates.

Blog content is owned by the Cogito app. Marketing reads it through
`COGITO_APP_API_URL` at request time with a 60-second revalidation window. There is
no publish webhook, so updates appear after the ISR window. A failed request renders
a localized retry state; it never renders an empty article.

Image delivery uses the public R2 URL returned by the API. Set
`NEXT_PUBLIC_R2_HOST` to the bucket's public host so `next/image` can optimize the
files. Local development also allows `localhost` and `127.0.0.1` image hosts.

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) >= 1.3.2
- A Sanity project (for CMS content)

### Installation

```bash
bun install
```

### Environment Variables

Create `apps/web/.env`:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:2001
COGITO_APP_API_URL=http://localhost:3001
NEXT_PUBLIC_R2_HOST=<public-r2-host>
NEXT_PUBLIC_SANITY_PROJECT_ID=<your-sanity-project-id>
NEXT_PUBLIC_SANITY_DATASET=development
NEXT_PUBLIC_SANITY_API_VERSION=2024-03-01
SANITY_API_TOKEN=<optional-for-authenticated-requests>
STUDENT_RESOURCES_PASSWORD=<password-for-student-resources>
```

### Development

```bash
# Run all apps (web + studio)
bun run dev

# Run only the web app (localhost:2001)
bun run dev:web
```

### Build

```bash
bun run build
```

## Available Scripts

| Command               | Description                              |
| --------------------- | ---------------------------------------- |
| `bun run dev`         | Start all apps in development mode       |
| `bun run dev:web`     | Start only the web app                   |
| `bun run build`       | Build all apps                           |
| `bun run check-types` | TypeScript type checking across all apps |
| `bun run format`      | Run Oxlint + Oxfmt                       |
| `bun run deploy`      | Deploy Sanity Studio                     |

## Content Model (Sanity)

| Schema                | Description                                                          |
| --------------------- | -------------------------------------------------------------------- |
| `tutor`               | Tutor profiles (name, affiliation, achievements, competition fields) |
| `competition`         | Competitions displayed on the calendar                               |
| `competitionCategory` | Competition category taxonomy                                        |
| `event`               | Events with registration links (upcoming/past)                       |
| `studentResource`     | Password-protected study materials                                   |

Content supports field-level bilingual input (Indonesian + English) via `sanity-plugin-internationalized-array`.

## Testimonials

Mobile testimonials advance every five seconds and loop to the first card. Pointer interaction and keyboard focus pause autoplay; reduced-motion preferences disable it. Swiping and dot navigation remain available. Desktop retains its existing autoplay.

## Credits

- [Andreandhiki Riyanta Putra](https://github.com/Andhiki) (Developer)
- Melinda Annastasia Budijono (UX Designer & UX Researcher)

## Activities

`/[locale]/activities` combines app-backed Cohorts/Masterclasses and one Others
article list from published legacy Sanity events. The heading leads directly to
content, without section shortcuts. `COGITO_APP_API_URL` configures the server-side
class RPC; `NEXT_PUBLIC_APP_URL` configures class detail links and must be the
public app origin. Missing/unavailable classes are reported independently of
Others. Optional Indonesian class title/description falls back to English.
Both legacy localized event category URLs redirect permanently to Activities.
Others DB migration/admin authoring is still pending; this page retains the
existing Sanity content and event detail/registration flow.

Focused adapter checks: `bun test apps/web/tests/activities-api.test.mjs`.

Classes use compact My Bookings-style rows with a date tile, class information,
price and detail action; there is no class cover or placeholder image slot.
Others retains its article thumbnails.

## Others articles (30 October 2026)

Others now reads published articles exclusively from the cogito-app API, with
no Sanity fallback. Edit in app `/activities`: cover URL, localized title and
summary, WIB schedule, location and rich body. Registration links belong in the
body. Drafts are private; Upcoming/Completed is derived from end time.
Migration 0077 must be applied before API deployment.

## Academy class content language

Activities class titles use the same canonical `titleEn` content on the Indonesian and English routes. The class adapter no longer declares alternate `titleId`/`descriptionId` properties. Class/session content is authored once in Cogito app; surrounding website navigation and other content keep their existing localization. This consumer works with the canonical fields already present in the current public API, so it can deploy before the Cogito app change.
