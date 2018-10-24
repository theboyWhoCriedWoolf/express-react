const fs = require('fs');

const prettierOptions = JSON.parse(fs.readFileSync('./.prettierrc', 'utf8'));

module.exports = {
  parser: 'babel-eslint',
  extends: [
    'airbnb',
    'prettier',
    'prettier/react',
    'plugin:security/recommended',
    'plugin:flowtype/recommended',
  ],

  plugins: ['prettier', 'react', 'jsx-a11y', 'security', 'flowtype'],

  env: {
    browser: true,
    node: true,
    jest: true,
    es6: true,
  },

  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },

  rules: {
    'prettier/prettier': ['error', prettierOptions],
    'no-use-before-define': 0,
    'react/jsx-filename-extension': 0,
    'react/prefer-stateless-function': 0,
    'react/require-default-props': 0,
    'react/jsx-first-prop-new-line': [2, 'multiline'],
    'react/require-default-props': 0,
    'react/destructuring-assignment': 0,
    'react/forbid-prop-types': 0,
    'import/imports-first': 0,
    'import/prefer-default-export': 0,
    'import/no-extraneous-dependencies': 0,
    'import/no-named-as-default': 0,
    'jsx-a11y/label-has-associated-control': [
      2,
      {
        depth: 3,
      },
    ],
    'jsx-a11y/label-has-for': [2, { allowChildren: true }],
    'no-console': 1,
    'no-use-before-define': 0,
    'prefer-template': 2,
    'newline-before-return': 'error',
    'require-yield': 0,
    'security/detect-object-injection': 0,
  },
  settings: {
    flowtype: {
      onlyFilesWithFlowAnnotation: false,
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.mjs'],
        moduleDirectory: ['node_modules', 'src/', 'server/'],
      },
    },
  },
};
