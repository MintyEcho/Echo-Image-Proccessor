const { FlatCompat } = require('@eslint/eslintrc');
const compat = new FlatCompat({
  // tell it which legacy plugins you need
  plugins: { '@typescript-eslint': require('@typescript-eslint/eslint-plugin') },
});

module.exports = [
  // bring in the legacy “recommended” configs
  ...compat.extends(
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended'
  ),

  // Global ignores (these are already applied by default)
  // But you can override or add to them here:
  { ignores: ['build/**', 'node_modules/**', 'uploads/**'] },

  // Then for your TS files:
  {
    files: ['src/**/*.ts'],
    languageOptions: {
      parser: require('@typescript-eslint/parser'),
      parserOptions: {
        project: './tsconfig.json',
        sourceType: 'module',
        ecmaVersion: 'latest'
      }
    },
    rules: {
      "prettier/prettier": ["error", { "endOfLine": "auto" }]
    }
  }
];
