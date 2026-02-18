# Techmach Main Website (Astro + Tailwind)

Static marketing site for Techmach built with Astro and Tailwind CSS.

## Stack

- Astro (TypeScript)
- Tailwind CSS
- Static assets in `public/images`

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Netlify configuration is included in `netlify.toml`:

- Build command: `npm run build`
- Publish directory: `dist`

## Project structure

- `src/layouts` shared page layout
- `src/components` reusable UI blocks (hero, cards, gallery, navigation, footer)
- `src/pages` static routes
- `src/styles` global Tailwind imports
- `public/images` all static image assets
