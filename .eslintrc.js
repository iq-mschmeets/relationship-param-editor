module.exports = {
  parser: 'babel-eslint',
  root: true,
  
  plugins: [
    'react',
    'jsx-a11y',
    'import',
  ],
  settings: {
    'import/resolver': {
      webpack: {
        config: 'webpack.config.js',
      },
    },
  },
  env: {
    browser: true,
    node: true,
    es6: true,
    jest: true,
  },
  rules: {
    'arrow-body-style': 1,
    'arrow-parens': [1, 'as-needed', { requireForBlockBody: true }],
    'import/extensions': ['warn', 'always',
      {
        js: 'never',
        jsx: 'never',
      },
    ],
    'max-len': [1, 120],
    'linebreak-style': 'off',
    'react/jsx-filename-extension': 'off',
    'react/jsx-space-before-closing': 'off',
    "react/prefer-stateless-function": [1, { "ignorePureComponents": true }],
    "space-in-parens": [0, "always"],
    "indent":[0,4],
    "react/jsx-indent": [1, 4],
    "comma-spacing":[0],
    "object-curly-spacing":[0]
  },
};
