module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
    'jest/globals': true
  },
  extends:  ["eslint:recommended"],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  plugins: ["jest"],
  rules: {
    'linebreak-style': 0,
    indent: ['error', 2],
  },
};
