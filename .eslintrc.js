module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    'react-native/react-native': true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    '@react-native-community',
    'prettier',
  ],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', 'react-native', 'prettier'],
  rules: {
    // 'no-unused-vars': ['error', { vars: 'none', args: 'after-used', ignoreRestSiblings: false }],
    indent: ['error', 2, {
      SwitchCase: 1
    }],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single', {
      avoidEscape: true
    }],
    semi: ['error', 'always'],
    'prettier/prettier': ['error', {
      singleQuote: true
    }],
    'react-native/no-inline-styles': 2,
    'react-native/no-unused-styles': 2,
    'react/no-unstable-nested-components': ['off', {
      allowAsProps: true
    }],
  },
};
