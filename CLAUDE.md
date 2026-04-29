# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # start dev server (Turbopack by default)
npm run build    # production build (Turbopack by default)
npm run lint     # run ESLint directly (next lint is removed in v16)
```

There are no tests configured.

## Stack

- **Next.js 16.2.4** with the App Router (`src/app/`)
- **React 19.2.4**
- **Tailwind CSS v4** — configured via `@tailwindcss/postcss`; no `tailwind.config.*` file; theme tokens defined with `@theme` in `globals.css`
- **TypeScript**

## Key Next.js 16 breaking changes

Read `node_modules/next/dist/docs/` before writing code involving these APIs.

**Async Request APIs** — `cookies()`, `headers()`, `draftMode()`, `params`, and `searchParams` are now async-only. Always `await` them:

```tsx
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
}
```

Run `npx next typegen` to generate `PageProps`, `LayoutProps`, and `RouteContext` helpers.

**`middleware` → `proxy`** — The `middleware.ts` convention is deprecated; use `proxy.ts` with a named `proxy` export. The `edge` runtime is not supported in `proxy`; use `middleware` if you need edge.

**`next lint` removed** — Use `eslint` (or `npx eslint`) directly. `next build` no longer runs linting.

**`serverRuntimeConfig` / `publicRuntimeConfig` removed** — Use environment variables instead.

**Turbopack is the default** — `next dev` and `next build` both use Turbopack. Pass `--webpack` to opt out.

**`revalidateTag`** now requires a second `cacheLife` profile argument.

**`cacheLife` / `cacheTag`** — `unstable_` prefix removed; use the stable names.
