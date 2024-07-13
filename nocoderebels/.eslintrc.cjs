/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    /* 'no-console': 'warn', */
    'no-debugger': 'warn',
    indent: [
      'error',
      2
    ],
    'linebreak-style': ['error', process.platform === 'win32' ? 'windows' : 'unix'],
    'max-len': [
      'error', { code: 120 }
    ],
    'no-unused-vars': ['error', { vars: 'all', args: 'after-used', ignoreRestSiblings: false }],
    'no-multiple-empty-lines': ['error', { max: 1 }],
    quotes: [
      'error',
      'single'
    ],
    semi: [
      'error',
      'never'
    ],
    eqeqeq: ['error', 'always'],
    'comma-dangle': ['error', 'never']
  }
}
