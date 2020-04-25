module.exports = {
  env: {
    browser: true,
    es6: true
  },
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    // 'plugin:jsx-a11y/recommended',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: [
    '@typescript-eslint',
    'react',
    'jsx-a11y',
    'react-hooks'
  ],
  settings: {
    react: {
      version: 'detect' // * https://github.com/yannickcr/eslint-plugin-react#configuration
    }
  },
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'jsx-a11y/anchor-is-valid': 'warn',
    'react/display-name': 'off',
    '@typescript-eslint/interface-name-prefix':
      ['error', {prefixWithI: 'always', allowUnderscorePrefix: false}],
    'prefer-const': 'warn',
    'react/prop-types': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/camelcase': 'off',
    'no-empty': ['error', {allowEmptyCatch: true}],
    'no-alert': 'error',
    'no-debugger': 'warn',
    'no-console': ['warn', {allow: ['error']}]
  }
}