import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: '/bibleflash/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icons/*.png'],
      manifest: {
        name: 'BibleFlash',
        short_name: 'BibleFlash',
        description: 'Daily Bible verse flashcards with push notifications',
        theme_color: '#1e1b4b',
        background_color: '#1e1b4b',
        display: 'standalone',
        start_url: '/bibleflash/',
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,svg}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/bible-api\.com\/.*/i,
            handler: 'StaleWhileRevalidate',
            options: { cacheName: 'bible-api-cache' }
          }
        ]
      }
    })
  ],
  server: {
    proxy: {
      '/api': 'http://localhost:5000'
    }
  }
});