import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://thespacemanatee.github.io',
  output: 'static',
  trailingSlash: 'ignore',
  integrations: [react(), mdx(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
  experimental: {
    fonts: [
      {
        provider: 'google',
        name: 'Inter',
        cssVariable: '--font-body',
        weights: [400, 500, 600, 700],
        styles: ['normal'],
        subsets: ['latin'],
        fallbacks: ['system-ui', 'sans-serif'],
      },
      {
        provider: 'google',
        name: 'Cabinet Grotesk',
        cssVariable: '--font-display',
        weights: [500, 700, 800],
        styles: ['normal'],
        subsets: ['latin'],
        fallbacks: ['system-ui', 'sans-serif'],
      },
    ],
  },
});
