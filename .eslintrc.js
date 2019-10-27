module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  env: {
    browser: true,
    node: true,
    es6: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parserOptions: {
    project: './tsconfig.json'
  },
  rules: {
    '@typescript-eslint/indent': ['error', 2],
    'camelcase': 'off',
    "no-console": "off",
    '@typescript-eslint/camelcase': ['error', { 'properties': 'never' }],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-member-accessibility': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    'no-useless-escape': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-parameter-properties': 'off'
  }
};
