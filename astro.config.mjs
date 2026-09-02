// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://orangelabs.co',
  integrations: [react(), sitemap()],

  redirects: {
    '/ai-watermarking': '/watermarking',
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
