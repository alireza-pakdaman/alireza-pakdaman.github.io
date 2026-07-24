import { getCollection } from 'astro:content';
import { OGImageRoute } from 'astro-og-canvas';

const projects = await getCollection('projects');

const pages: Record<string, { title: string; description: string }> = {
  site: {
    title: 'Alireza Pakdaman',
    description: 'Software engineer · CS @ Ontario Tech ’27 · data analysis & generative AI',
  },
  playground: {
    title: 'Component Playground',
    description: 'Live, editable code. Components from this site running in your browser',
  },
  ...Object.fromEntries(
    projects.map((p) => [`projects/${p.id}`, { title: p.data.title, description: p.data.tagline }])
  ),
};

export const { getStaticPaths, GET } = await OGImageRoute({
  param: 'route',
  pages,
  getImageOptions: (_path, page) => ({
    title: page.title,
    description: page.description,
    bgGradient: [
      [10, 13, 19],
      [16, 20, 29],
    ],
    border: { color: [62, 207, 142], width: 12, side: 'inline-start' },
    padding: 72,
    font: {
      title: {
        size: 64,
        weight: 'Bold',
        color: [231, 234, 242],
        lineHeight: 1.15,
        families: ['Space Grotesk', 'Arial'],
      },
      description: {
        size: 30,
        color: [154, 162, 180],
        lineHeight: 1.4,
      },
    },
  }),
});
