module.exports = {
  plugins: [
    "pug"
  ],
  env: {
    browser: true,
    es6: true
  },
  extends: [
    'standard'
  ],
  globals: {
    axios: 'readonly',
    Qs: 'readonly',
    Vue: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  rules: {
    'comma-dangle': ['error', 'only-multiline'],
    'eol-last': ['error', 'never'],
  }
}
