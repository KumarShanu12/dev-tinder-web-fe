import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import daisyui from 'daisyui' // Import daisyui properly

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    
  ],
  server: {
    hot: true, // Ensure HMR is enabled
},
})