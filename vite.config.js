<<<<<<< Updated upstream
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
=======
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
>>>>>>> Stashed changes

export default defineConfig({
  plugins: [react()],
  server: {
<<<<<<< Updated upstream
    host: true,
    port: 5173,
  },
})
=======
    proxy: {
      '/ws': {
        target: 'http://localhost:8081',
        ws: true,
        changeOrigin: true
      }
    }
  },
  define: {
    global: {},
  }
});
>>>>>>> Stashed changes
