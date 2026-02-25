# Cogito Academy Website

The official website for **Cogito Academy**, an Indonesian educational organization specializing in competition tutoring. Built as a bilingual (Indonesian/English) platform featuring tutor profiles, a competition calendar, event listings, and password-gated student resources.

**Live CMS:** [Sanity Studio](https://cogitoacademy.sanity.studio/)

**Dev Preview:** [cogitoacademy.vercel.app](https://cogitoacademy.vercel.app)

**Production:** [cogitoacademy.id](https://cogitoacademy.id)

**Repository:** [cogitoacademy/website](https://github.com/cogitoacademy/website)

## Tech Stack

| Category | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| React | React 19 + React Compiler |
| Language | TypeScript 5 |
| CSS | Tailwind CSS v4 |
| Components | shadcn/ui + Base UI primitives |
| CMS | Sanity v5 (with next-sanity) |
| i18n | next-intl (Indonesian + English) |
| Animation | Motion (Framer Motion) |
| Monorepo | Turborepo |
| Package Manager | Bun |
| Linting | Oxlint + Biome |
| Formatting | Oxfmt + Biome |

## Project Structure

```
cogito-acad/
├── apps/
│   ├── web/                  # Next.js frontend
│   │   ├── src/
│   │   │   ├── app/[locale]/ # Locale-based routing (id, en)
│   │   │   ├── components/   # UI components (landing, events, calendar, etc.)
│   │   │   ├── queries/      # Sanity GROQ queries
│   │   │   ├── sanity/       # Sanity client config
│   │   │   ├── i18n/         # Locale routing + message loading
│   │   │   ├── lib/          # Utilities, config, transforms
│   │   │   └── types/        # TypeScript type definitions
│   │   └── messages/         # Translation files (id.json, en.json)
│   └── studio/               # Sanity Content Studio (CMS admin)
│       └── schemaTypes/      # Content schemas (tutor, event, competition, etc.)
└── packages/
    ├── config/               # Shared TypeScript config
    └── env/                  # Shared environment variable validation
```

## Pages

| Route | Description |
|---|---|
| `/` | Landing page (hero, events, methods, tutors, testimonials, FAQ) |
| `/tutors` | Filterable tutor directory with detail modals |
| `/calendar` | Interactive competition calendar (month/week/day/agenda views) |
| `/events/[category]` | Event listings by category (upcoming + past) |
| `/student-resources` | Password-gated study materials |
| `/contact` | Contact info, collaboration, tutor recruitment |

All routes are prefixed with locale: `/id/...` (Indonesian, default) or `/en/...` (English).

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
NEXT_PUBLIC_SERVER_URL=http://localhost:2000
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

# Run only the web app (localhost:2000)
bun run dev:web
```

### Build

```bash
bun run build
```

## Available Scripts

| Command | Description |
|---|---|
| `bun run dev` | Start all apps in development mode |
| `bun run dev:web` | Start only the web app |
| `bun run build` | Build all apps |
| `bun run check-types` | TypeScript type checking across all apps |
| `bun run check` | Run Oxlint + Oxfmt |
| `bun run deploy` | Deploy Sanity Studio |

## Content Model (Sanity)

| Schema | Description |
|---|---|
| `tutor` | Tutor profiles (name, affiliation, achievements, competition fields) |
| `competition` | Competitions displayed on the calendar |
| `competitionCategory` | Competition category taxonomy |
| `event` | Events with registration links (upcoming/past) |
| `studentResource` | Password-protected study materials |

Content supports field-level bilingual input (Indonesian + English) via `sanity-plugin-internationalized-array`.

## Key Libraries

- **motion** -- Page transitions and scroll animations
- **lenis** -- Smooth scrolling
- **@dnd-kit** -- Drag-and-drop in competition calendar
- **@tanstack/react-form** -- Form handling
- **next-themes** -- Dark/light mode support
- **rough-notation** -- Hand-drawn annotation highlights
- **sonner** -- Toast notifications
