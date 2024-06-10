import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    global: {}
  },
  envDir: "./env",
  server: {
    host: '0.0.0.0',
    port: 2020,
  },
  plugins: [tsconfigPaths(), react()],
})
