# NU Student Help Website

Public MVP frontend for National University students to browse notices, routines, syllabus, previous year questions, notes, and request missing resources.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- REST API integration with mock fallback

## Environment

Create a local `.env.local` from `.env.example`.

```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api
NEXT_PUBLIC_USE_MOCKS=true
```

Set `NEXT_PUBLIC_USE_MOCKS=false` when the backend is running and ready to serve the API contract.

## Features

- Public-only student website, no authentication
- Search-first home page
- Resource listing pages with filters and pagination
- Detail pages with preview and download support
- Verified/unverified badges
- Missing resource request form posting to `/api/student-requests`
- Mock data mode for offline frontend preview

## Routes

- `/`
- `/notices`
- `/notices/[slug]`
- `/routines`
- `/routines/[slug]`
- `/syllabus`
- `/syllabus/[slug]`
- `/questions`
- `/questions/[slug]`
- `/notes`
- `/notes/[slug]`
- `/request-resource`
- `/about`
- `/contact`
- `/search`

## Scripts

```bash
pnpm dev
pnpm lint
pnpm build
pnpm start
```

## Notes

- The frontend expects a separate Express + MongoDB backend.
- The current API client tolerates basic response shape variation for paginated endpoints.
- Mock content is focused on Honours, with Accounting, Management, and English sample data.
