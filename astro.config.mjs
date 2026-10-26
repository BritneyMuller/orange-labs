// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://orangelabs.co',
  // Serve pages at /page (no trailing slash) so URLs, canonicals and the
  // sitemap all agree. 'file' emits page.html, which Netlify serves at /page.
  trailingSlash: 'never',
  build: { format: 'file' },
  integrations: [react(), sitemap()],

  redirects: {
    '/ai-watermarking': '/watermarking',
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
