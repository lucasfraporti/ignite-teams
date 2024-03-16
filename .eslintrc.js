module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'simple-import-sort'],
  rules: {
    'simple-import-sort/imports': 'error',
    'no-useless-catch': 'off',
    'react-hooks/exhaustive-deps': 'off',
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    '@rocketseat/eslint-config/react',
  ],
}
