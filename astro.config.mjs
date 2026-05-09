import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig, fontProviders } from 'astro/config';

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
        provider: fontProviders.google(),
        name: 'Inter',
        cssVariable: '--font-body',
        weights: [400, 500, 600, 700],
        styles: ['normal'],
        subsets: ['latin'],
        fallbacks: ['system-ui', 'sans-serif'],
      },
      {
        provider: fontProviders.google(),
        name: 'Outfit',
        cssVariable: '--font-display',
        weights: [500, 700, 800],
        styles: ['normal'],
        subsets: ['latin'],
        fallbacks: ['system-ui', 'sans-serif'],
      },
    ],
  },
});
