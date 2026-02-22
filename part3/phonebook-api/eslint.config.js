import js from '@eslint/js'
import globals from 'globals'
import json from '@eslint/json'
import { defineConfig } from 'eslint/config'
import stylisticJs from '@stylistic/eslint-plugin'


export default defineConfig([
  {
    ignores: ['dist/**', 'node_modules/**', '.git/**', '.vscode/**', '.idea/**']
  },
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: {
      js,
      '@stylistic/js':stylisticJs
    },
    extends: ['js/recommended'],
    languageOptions: {
      globals: globals.node,
      sourceType: 'module'
    },
    rules: {
      '@stylistic/js/indent': ['error', 2],
      '@stylistic/js/linebreak-style': ['error', 'unix'],
      '@stylistic/js/quotes': ['error', 'single'],
      '@stylistic/js/semi': ['error', 'never'],
      eqeqeq: ['error', 'always'],
      'no-trailing-spaces': 'error',
      'object-curly-spacing': ['error', 'always'],
      'arrow-spacing': ['error', { before: true, after: true }],
    }
  },
  {
    files: ['**/*.json'],
    plugins: { json },
    language: 'json/json',
    extends: ['json/recommended'],
    ignores: ['package-lock.json', 'yarn.lock']
  }
])
