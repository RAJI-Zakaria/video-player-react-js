import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server : {
    host : true,
    port : 3030, // change this to the port you want
    watch: {
      usePolling: true
    }
  },
  plugins: [react()],
})
