// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const eslintConfigPrettier = require('eslint-config-prettier/flat');

module.exports = defineConfig([
  expoConfig,
  eslintConfigPrettier,
  {
    ignores: ['dist/*'],
    rules: {
      '@typescript-eslint/no-empty-object-type': 'off',
      'eqeqeq': 'off',
      'react-hooks/exhaustive-deps': 'off'
    }
  },
]);
