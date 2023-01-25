import {defineConfig} from 'vitest/config';
import path from 'path';

import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
// https://vitest.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'~': path.resolve(__dirname, './src'),
			'test-utils': path.resolve(__dirname, './src/tests/test-utils.tsx'),
		},
	},
	test: {
		environment: 'jsdom',
		setupFiles: ['./src/tests/test-setup.ts'],
	},
});
