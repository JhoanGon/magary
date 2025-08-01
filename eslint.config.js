// eslint.config.js
import tsParser from '@typescript-eslint/parser';
import angularPlugin from '@angular-eslint/eslint-plugin';
import angularTemplate from '@angular-eslint/eslint-plugin-template';
import angularParser from '@angular-eslint/template-parser';

export default [
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: [
          './projects/ng-magary/tsconfig.lib.json',
          './projects/ng-magary/tsconfig.spec.json',
          './projects/demo-app/tsconfig.app.json',
          './projects/demo-app/tsconfig.spec.json',
        ],
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      '@angular-eslint': angularPlugin,
    },
    rules: {
      ...angularPlugin.configs.recommended.rules,
    },
  },
  {
    files: ['**/*.html'],
    languageOptions: {
      parser: angularParser,
    },
    plugins: {
      '@angular-eslint/template': angularTemplate,
    },
    rules: {
      ...angularTemplate.configs.recommended.rules,
    },
  },
];
