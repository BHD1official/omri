

import { defineConfig } from 'vite'
import react from '@vitejs/react-swc' // או רק '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/omri/', // <-- השורה הזו היא הסוד!
})
