import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('codemirror') || id.includes('@lezer')) {
              return 'codemirror';
            }
            if (
              id.includes('react-markdown') ||
              id.includes('remark') ||
              id.includes('rehype') ||
              id.includes('mdast') ||
              id.includes('micromark') ||
              id.includes('hast') ||
              id.includes('unist') ||
              id.includes('vfile')
            ) {
              return 'markdown';
            }
            if (id.includes('react-syntax-highlighter') || id.includes('refractor') || id.includes('highlight.js')) {
              return 'highlighter';
            }
          }
        },
      },
    },
  },
})
