import { defineConfig } from 'vite'
import { config } from '../vite.config'

// https://vitejs.dev/config/
export default defineConfig({
	...config,
	server: {
		port: 3000
	}
})
