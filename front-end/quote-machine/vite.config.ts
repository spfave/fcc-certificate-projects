import {defineConfig} from 'vitest/config';
import path from 'path';

import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {'~': path.resolve(__dirname, './src')},
	},
	test: {
		environment: 'jsdom',
		setupFiles: ['./src/tests/test-setup.ts'],
	},
});
