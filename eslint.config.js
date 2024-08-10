import airbnbBase from 'eslint-config-airbnb-base';
import eslintPluginImport from 'eslint-plugin-import';

/** @type {import('eslint').Linter.FlatConfig} */
export default [
  {
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    rules: {
      'no-underscore-dangle': ['error', { allow: ['__filename', '__dirname'] }],
      'import/extensions': 'off',
      'import/no-extraneous-dependencies': 'off',
      'no-console': 'off',
    },
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx'],
        },
      },
    },
  },
  // Включаем конфигурацию airbnb-base напрямую
  {
    languageOptions: {
      globals: {
        node: 'readonly',
        es2021: 'readonly',
      },
    },
    rules: {
      ...airbnbBase.rules,
    },
    plugins: {
      'import': eslintPluginImport,
    },
  },
];

