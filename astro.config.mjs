// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import node from '@astrojs/node';

import tailwindcss from '@tailwindcss/vite';

import icon from "astro-icon";

import sitemap from "@astrojs/sitemap";

import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  site: "https://homii.net",

  output: "static",
  adapter: netlify({
    imageCDN: false,
  }),

  integrations: [
    react(),
    icon(),
    sitemap({
      i18n: {
        defaultLocale: "es",
        locales: {
          es: "es-MX",
          en: "en-US",
        },
      },
    }),
  ],

  vite: {
    plugins: [tailwindcss()]
  },

  i18n: {
    defaultLocale: "es",
    locales: ["es", "en"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});