import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default [
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
        strictMode: true,
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      semi: ['error', 'always'],
      'array-bracket-spacing': ['error', 'never'],
      'object-curly-spacing': ['error', 'always'],
      'keyword-spacing': ['error', {
        before: true,
        after: true,
      }],
      'no-implicit-coercion': 'error',
      'default-param-last': 'error',
      'no-redeclare': 'error',
      'init-declarations': 'error',
      'consistent-return': 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      'eqeqeq': ['error', 'always'],
      'valid-typeof': ['error', { 'requireStringLiterals': true }],
    },
  },
];
