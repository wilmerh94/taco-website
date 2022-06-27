import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment'
  },
  build: {
    lib: {
      entry: './src/main.jsx'
    },
    rollupOptions: {
      external: ['react', 'react-dom']
    }
  }
});
