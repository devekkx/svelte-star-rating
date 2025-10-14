import {defineConfig} from 'vite'
import {svelte} from '@sveltejs/vite-plugin-svelte'
import * as path from "node:path";

// https://vite.dev/config/
export default defineConfig({
    plugins: [svelte()],
    build: {
        lib: {
            entry: path.resolve(__dirname, 'src/index.ts'),
            name: '@dev-ekkx/svelte-star-rating',
            formats: ['es', 'cjs'],
            fileName: (format) => `index.${format}.js`
        },
        rollupOptions: {
            external: ['svelte'],
            output: {
                globals: {
                    svelte: 'Svelte'
                }
            }
        }
    }
})
