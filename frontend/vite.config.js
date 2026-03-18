import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
    server: {
        proxy: {
            '/api': {
                target: "http://localhost:8080",
                changeOrigin: true,
            }
        }
    },
    plugins: [solid(), tailwindcss()],
})
