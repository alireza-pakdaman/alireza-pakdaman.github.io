---
title: 'This Website'
tagline: 'Astro portfolio with view transitions, a live code playground, and a perfect-Lighthouse budget'
year: '2026'
role: 'Design + build'
stack: ['Astro', 'TypeScript', 'React', 'View Transitions API', 'GitHub Actions']
featured: true
order: 6
repo: 'https://github.com/alireza-pakdaman/alireza-pakdaman.github.io'
link: 'https://arshiatech.me'
hue: 222
---

This site is itself an engineering case study. The constraint: ship the flashy
features recruiters remember **without** sacrificing the fundamentals engineers
check.

## Under the hood

- **Astro islands architecture** — the homepage ships almost zero JavaScript;
  React loads only on the [playground](/playground) for the live code sandbox.
- **Native View Transitions** — project cards morph into their detail pages
  with the browser's View Transitions API. No animation library.
- **Hand-rolled interaction** — the spring-physics cursor, ⌘K command palette,
  and the terminal (type `>` anywhere) are small vanilla TypeScript modules,
  written from scratch.
- **Theatrical dark mode** — the theme toggle sweeps a `clip-path` circle from
  your click point using the same View Transitions API.
- **Accessibility as a feature** — full keyboard navigation, visible focus
  rings, `aria-live` announcements, and every animation gated behind
  `prefers-reduced-motion`.
- **Build-time data** — the GitHub activity chart is a static SVG rendered at
  deploy time from the GitHub API. Zero runtime requests, zero trackers.

The source is public — check the repo to see how it's put together.
