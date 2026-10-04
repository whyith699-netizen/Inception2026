import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://sma1klaten.sch.id',
  integrations: [react()],
  output: 'static',
  build: {
    format: 'directory'
  }
});
