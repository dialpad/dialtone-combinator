module.exports = {
  extends: [
    'standard',
    'semistandard',
    'plugin:vue/recommended',
    'plugin:vue/vue3-recommended',
    'plugin:vuejs-accessibility/recommended',
  ],
  env: {
    browser: true,
    node: true,
    amd: true,
  },
  rules: {
    'max-len': ['error', {
      code: 120,
      tabWidth: 2,
    }],
    quotes: ['error', 'single', { allowTemplateLiterals: true }],
    'comma-dangle': ['error', 'always-multiline'],
    'vue/comma-dangle': ['error', 'always-multiline'],
    'vue/comma-spacing': ['error', { before: false, after: true }],
    'vue/comma-style': ['error', 'last'],
  },
};
