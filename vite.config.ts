import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/kliphub_site/',
  plugins: [react()],
  server: {
    port: 5174,
  },
  preview: {
    port: 5174,
  },
});
