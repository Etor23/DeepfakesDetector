import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: './' makes built asset paths relative so the site works when served
// from any sub-path or opened from the built dist folder.
export default defineConfig({
  base: './',
  plugins: [react()],
})
