module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module'
  },
  extends: 'eslint:recommended',
  env: {
    browser: true,
    es6: true
  },
  rules: {
    "no-console": 0,
    "comma-dangle": 1,
    "no-extra-semi": 1,
    "no-extra-boolean-cast": 1,
    "no-mixed-spaces-and-tabs": 1
  },
  globals: {
    document: true,
    window: true,
    $: true,
    Ember: true,
  }
};
