module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'simple-import-sort'],
  rules: {
    'simple-import-sort/imports': 'error',
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    '@rocketseat/eslint-config/react',
  ],
}
