import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { handleEnquiryRequest } from './server/enquiryHandler.ts';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'enquiry-api-dev-middleware',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url && (req.url === '/api/enquiry' || req.url.startsWith('/api/enquiry?'))) {
            handleEnquiryRequest(req, res);
          } else {
            next();
          }
        });
      },
      configurePreviewServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url && (req.url === '/api/enquiry' || req.url.startsWith('/api/enquiry?'))) {
            handleEnquiryRequest(req, res);
          } else {
            next();
          }
        });
      },
    },
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/three')) {
            return 'three-vendor';
          }
          if (id.includes('node_modules/gsap')) {
            return 'gsap-vendor';
          }
          if (id.includes('node_modules/lucide-react')) {
            return 'icons-vendor';
          }
        },
      },
    },
  },
});
