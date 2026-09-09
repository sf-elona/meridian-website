import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';

// `base: './'` + BASE_URL-prefixed asset paths + single-file output means the
// built dist/index.html works when simply double-clicked (file://) as long as
// the dist/videos and dist/images folders sit next to it — no server needed.
export default defineConfig({
  base: './',
  plugins: [react(), viteSingleFile()],
  server: {
    port: 5173,
    host: true,
  },
  build: {
    target: 'es2020',
  },
});
