// eslint.config.js
import tsParser from '@typescript-eslint/parser';
import angularPlugin from '@angular-eslint/eslint-plugin';
import angularTemplate from '@angular-eslint/eslint-plugin-template';
import angularParser from '@angular-eslint/template-parser';

export default [
  {
    ignores: [
      '**/dist/**',
      '**/node_modules/**',
      '**/.angular/**',
      'projects/magary-mcp/**',
      'e2e/playwright/report/**',
      'e2e/playwright/test-results/**',
      'e2e/playwright/snapshots/**',
      'e2e/playwright/{configDir}/**',
    ],
  },
  {
    files: ['projects/ng-magary/src/**/*.ts', 'projects/demo-app/src/**/*.ts'],
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
      '@angular-eslint/no-output-on-prefix': 'off',
      '@angular-eslint/no-input-rename': 'off',
      '@angular-eslint/no-output-native': 'off',
      '@angular-eslint/prefer-inject': 'off',
      '@angular-eslint/no-empty-lifecycle-method': 'off',
    },
  },
  {
    files: [
      'projects/ng-magary/src/**/*.html',
      'projects/demo-app/src/**/*.html',
    ],
    languageOptions: {
      parser: angularParser,
    },
    plugins: {
      '@angular-eslint/template': angularTemplate,
    },
    rules: {
      ...angularTemplate.configs.recommended.rules,
      '@angular-eslint/template/prefer-control-flow': 'off',
    },
  },
  {
    files: ['e2e/playwright/**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
  },
];
