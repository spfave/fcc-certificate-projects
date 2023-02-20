import { vi, expect, beforeEach, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import matchers from '@testing-library/jest-dom/matchers'; //pnpm fix: https://github.com/testing-library/jest-dom/issues/123

// extend Vitest's expect method with methods from react-testing-library
expect.extend(matchers);

// run cleanup after each test case (e.g. clearing jsdom)
beforeEach(() => {
	vi.resetAllMocks();
});
afterEach(() => {
	cleanup();
});
