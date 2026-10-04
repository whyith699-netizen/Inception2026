import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://edukids.sch.id',
  output: 'static',
  build: {
    format: 'directory'
  }
});
