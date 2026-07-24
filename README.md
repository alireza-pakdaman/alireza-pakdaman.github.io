# alirezapakdaman.com

Personal portfolio of **Alireza Pakdaman** — software engineer, CS @ Ontario
Tech University ('27). Live at [alirezapakdaman.com](https://alirezapakdaman.com).

## What's in here

- **[Astro](https://astro.build) islands architecture** — the homepage ships
  ~zero JavaScript; React loads only on `/playground` for the live Sandpack
  code editor.
- **Native View Transitions** — project cards morph into detail pages; the
  theme toggle sweeps a `clip-path` circle from the click point.
- **Hand-rolled interaction** — spring-physics cursor, ⌘K command palette, and
  a terminal easter egg (press `>`), all small vanilla TypeScript modules.
- **Build-time data** — the GitHub activity chart is a static SVG rendered at
  deploy time from the GitHub API (with a committed snapshot as fallback).
- **Accessibility & performance as features** — keyboard navigable, visible
  focus rings, `aria-live` announcements, `prefers-reduced-motion` fallbacks,
  self-hosted subset fonts, AVIF/WebP images.

## Development

```sh
npm install
npm run dev       # local dev server
npm run build     # production build → dist/
npm run preview   # serve the production build locally
```

## Editing content (no code required)

| What | Where |
| --- | --- |
| Projects | `src/content/projects/*.md` — one markdown file per project. Delete a file to remove it from the site; look for `TODO(Alireza)` comments to fill in details. |
| Jobs, skills, education, links | `src/data/profile.ts` |
| Portrait & project images | drop files into `src/assets/images/` — see the README in that folder |
| Resume | replace `public/resume.pdf` |

Every push to `main` triggers the GitHub Actions workflow, which builds the
site and deploys it to GitHub Pages (custom domain via `public/CNAME`).

## License

Code is MIT licensed. Content (text, images, resume) is © Alireza Pakdaman.
