// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeKatex from 'rehype-katex';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';

export default defineConfig({
  site: 'https://blacckmangoo.github.io',
  base: '/blog/',

  markdown: {
    syntaxHighlighting: 'shiki',
  },

  integrations: [
    react(),
    mdx({
      remarkPlugins: [remarkGfm, remarkMath],
      rehypePlugins: [
        rehypeSlug,
        rehypeAutolinkHeadings,
        rehypeKatex,
      ],
    }),
  ],
});