# Techmach Technology Website

A static website for Techmach Technology built with plain HTML, CSS, and lightweight JavaScript.

## Pages
- `index.html` — Home
- `about.html` — About
- `contact.html` — Contact
- `cereal.html` — Cereal gallery
- `feedmilling.html` — Feed milling gallery
- `seed.html` — Seed processing gallery

## Design Direction
- Dark-blue client-facing interface with lighter blue accents
- Hero banner uses `assets/img/Silocomplex.jpg` with dark overlay
- Clean corporate layout with stronger section hierarchy
- Primary font stack prioritises **Decimal Mono**

## Project Structure
- `assets/css/main.css` — Site styles
- `assets/js/main.js` — Interactions (active nav, section reveal, footer year, image fallback)
- `assets/img/` — Logo, favicon, and image assets
- `backround suffle/` — Background image shuffle folder (supports JPG/JPEG/PNG/WEBP)
- `projects/cereal/` — Cereal project images
- `projects/feedmilling/` — Feed milling project images
- `projects/seed/` — Seed project images

## Local Run
Open `index.html` directly in a browser, or run:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Image Usage
- Logo file expected: `assets/img/techmachlogo.jpeg`
The Home page reads these image paths directly:
- `projects/cereal/cover.jpg`
- `projects/feedmilling/cover.jpg`
- `projects/seed/cover.jpg`

If these files are missing, the site falls back to `assets/img/project-fallback.svg`.

## Content and asset handover
See **`WHAT_TO_DO_NEXT.md`** for the full handover checklist and exact files to provide.

## Section Gallery Pages
Gallery pages load image files from each project folder using a filename list in `assets/js/main.js`.


The section galleries attempt to discover images with any filename/extension from folder listings, and fall back to common cover/line names on stricter hosts.
