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
        mdi: ['github', 'linkedin', 'magnify'],
      }
    }),
    mdx()
  ],
  markdown: {
    shikiConfig: {
      theme: 'gruvbox-dark-medium',
    },
  },
  vite: {
    // @tailwindcss/vite resolves its own nested `vite` copy, whose Plugin type
    // doesn't structurally match the one Astro bundles - hence the cast.
    plugins: [
      tailwindcss() as any
    ],
  },
  output: 'static',
  adapter: node({
    mode: 'standalone',
  })
});