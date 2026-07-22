# Drop your pictures here

Any image placed in this folder gets optimized automatically at build time
(converted to AVIF/WebP, resized, lazy-loaded). Nothing here ships unoptimized.

## The one that matters

| File name | Used for | Ideal size |
| --- | --- | --- |
| `profile.jpg` (or `.png` / `.webp`) | Your portrait in the homepage hero | ≥ 880×880px, roughly square |

As soon as a file named `profile.*` exists here, the next build replaces the
monogram placeholder in the hero with your photo. No code changes needed.

## Project screenshots (optional)

Add screenshots for project pages with descriptive names, e.g.:

- `opera-projections.jpg`
- `hybrid-images-result.png`
- `stock-forecast-ui.png`

Then reference them from the matching file in `src/content/projects/*.md`:

```md
![AI-generated projection during the opera performance](../../assets/images/opera-projections.jpg)
```

Tips:

- Prefer `.jpg`/`.webp` for photos, `.png` for UI screenshots.
- Keep originals under ~4000px wide; the build handles the rest.
