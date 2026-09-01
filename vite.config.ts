import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    proxy: {
      // 1. Reverse proxy to Core Go Backend (FinnApiGo)
      '/render-api': {
        target: 'https://finnapigo.onrender.com',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/render-api/, '')
      },
      // 2. Reverse proxy to Dedicated Jake AI Go Microservice (JakeAI)
      '/jake-ai-api': {
        target: 'https://jakeai.onrender.com',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/jake-ai-api/, '')
      }
    }
  },
});
