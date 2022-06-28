module.exports = {
  extends: [
    'standard',
    'semistandard',
    'plugin:vue/vue3-recommended',
    'plugin:vuejs-accessibility/recommended',
  ],
  env: {
    browser: true,
    node: true,
    amd: true,
  },
  rules: {
    'comma-dangle': ['error', 'always-multiline'],
    'vue/comma-dangle': ['error', 'always-multiline'],
    'max-len': ['error', {
      code: 120,
      tabWidth: 2,
    }],
  },
};
