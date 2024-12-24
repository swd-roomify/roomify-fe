import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    proxy: {
      '/ws': {
        target: 'http://localhost:8081',
        ws: true,
        changeOrigin: true,
      },
    },
  },
  define: {
    global: {},
  },
});
