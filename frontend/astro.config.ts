import { defineConfig } from 'astro/config';

import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";
import node from "@astrojs/node";
import mdx from "@astrojs/mdx";

import tailwindcss from "@tailwindcss/vite";

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
          'tag-outline',
          'magnify',
          'home'
        ]
      }
    }),
    mdx()
  ],
  vite: {
    plugins: [
      tailwindcss()
    ],
  },
  output: 'static',
  adapter: node({
    mode: 'standalone',
  })
});