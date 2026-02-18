# Techmach Website (Astro)

Production-ready static Astro website with Tailwind CSS, Astro Content Collections, and Decap CMS.

## Stack
- Astro + TypeScript
- Tailwind CSS
- Astro Content Collections
- Decap CMS (`/admin`)
- Netlify static deployment (`npm run build`, publish `dist`)

## Commands
```bash
npm install
npm run dev
npm run build
npm run preview
```

## Content
- Divisions: `src/content/divisions`
- Projects: `src/content/projects`
- Partners: `src/content/partners`
- CMS editable pages: `src/content/pages`

## CMS
- Admin: `/admin`
- Config: `public/admin/config.yml`
- Media uploads: `public/uploads`

## Netlify
`netlify.toml` is configured for static output.
