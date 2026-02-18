import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://techmach.example.com',
  integrations: [tailwind()],
  output: 'static'
});
