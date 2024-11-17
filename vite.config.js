import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Default port
    open: true, // Open browser on startup
  },
  build: {
    sourcemap: false, // Disable source maps
  },
});
