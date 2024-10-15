module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'turbo',
  ],
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  ignorePatterns: ['node_modules/', 'dist/', 'build/', '.yarn/'],
  plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/no-unused-vars': [
      'error',
      { argsIgnorePattern: '^_', ignoreRestSiblings: true },
    ],
  },
}
