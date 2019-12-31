module.exports = {
    parser: 'babel-eslint',
    env: {
      browser: true,
      commonjs: true,
      es6: true,
      node: true,
      jest: true,
    },
    extends: ['eslint:recommended', 'plugin:react/recommended'],
    parserOptions: {
      ecmaFeatures: {
        experimentalObjectRestSpread: true,
        jsx: true,
      },
      sourceType: 'module',
    },
    plugins: ['react'],
    rules: {
      'react/display-name': ['off'],
      'react/no-unescaped-entities': ['off'],
      quotes: ['error', 'single'],
      curly: 'error',
      'no-else-return': 'error',
      'no-unneeded-ternary': 'error',
      'no-useless-return': 'error',
      'no-var': 'error',
      'one-var': ['error', 'never'],
      'prefer-arrow-callback': 'error',
      strict: 'error',
      'symbol-description': 'error',
      yoda: ['error', 'never', {exceptRange: true}],
    },
  };