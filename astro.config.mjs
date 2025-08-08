import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

import tailwindcss from '@tailwindcss/vite';

import icon from 'astro-icon';

import node from '@astrojs/node';

export default defineConfig({
  site: 'https://maik-hasler.de',
  trailingSlash: 'ignore',
  integrations: [
    sitemap(),
    icon({
      include: {
        mdi: [
          'github',
          'linkedin',
          'clock-outline',
          'calendar-month-outline',
          'tag-outline'
        ]
      }
    })
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  output: 'static',
  adapter: node({
    mode: 'standalone',
  })
});