module.exports = {
	root: true,
	env: {
		browser: true,
		node: true,
		es2021: true,
	},
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:react/recommended',
		'plugin:react-hooks/recommended',
		'prettier', // keep last
	],
	plugins: ['@typescript-eslint', 'react', 'react-hooks'],
	rules: {
		'react/react-in-jsx-scope': 'off',
		'react-hooks/rules-of-hooks': 'error', // Checks rules of hooks
		'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies
		'@typescript-eslint/no-empty-function': 'warn',
		'@typescript-eslint/no-inferrable-types': 'warn',
	},
	overrides: [],
};
