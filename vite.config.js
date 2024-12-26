import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    proxy: {
      '/ws': {
        target: process.env.VITE_REACT_APP_WS_URL || 'http://localhost:8081',
        ws: true,
        changeOrigin: true,
      },
    },
  },
  define: {
    global: {},
  },
});
