const commonRules = {
  'react-hooks/rules-of-hooks': 'error',
  'react-hooks/exhaustive-deps': 'off',
  '@typescript-eslint/explicit-function-return-type': 'off',
  'jsx-a11y/anchor-is-valid': 'warn',
  'react/display-name': 'off',
  '@typescript-eslint/interface-name-prefix':
    ['error', {prefixWithI: 'always', allowUnderscorePrefix: false}],
  '@typescript-eslint/no-empty-interface': 'off',
  '@typescript-eslint/no-explicit-any': 'warn',
  '@typescript-eslint/consistent-type-definitions': ['error', 'type'], // * https://medium.com/@martin_hotell/interface-vs-type-alias-in-typescript-2-7-2a8f1777af4c
  'prefer-const': 'warn',
  'react/prop-types': 'off',
  '@typescript-eslint/camelcase': 'off',
  'no-empty': ['error', {allowEmptyCatch: true}],
  'no-eval': 'error',
  'no-alert': 'error',
  'no-debugger': 'warn',
  'no-console': ['warn', {allow: ['error']}],
  'no-labels': 'error',
  'no-shadow': 'error',
  'no-constant-condition': 'warn',
  'no-unreachable': 'warn',
  'default-case': 'warn',
  // ! 'default-case-last': 'warn',
  'eqeqeq': 'error',
  '@typescript-eslint/array-type': 'warn',
}

const projectSpecificRules = {
}

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
    sourceType: 'module',
    project: './tsconfig.json',
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
    ...commonRules,
    ...projectSpecificRules,
  }
}
