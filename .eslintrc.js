module.exports = {
  extends: [
    'standard',
    'semistandard',
    'plugin:jsdoc/recommended',
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
    'import/no-named-default': 0,
    'vue/comma-dangle': ['error', 'always-multiline'],
    'vue/comma-spacing': ['error', { before: false, after: true }],
    'vue/comma-style': ['error', 'last'],
    'vue/no-v-for-template-key': 0,
    'vue/no-v-html': 0,
    'vue/no-v-model-argument': 0,
    'jsdoc/require-jsdoc': 0,
    'jsdoc/no-undefined-types': 0,
    'jsdoc/require-hyphen-before-param-description': 1,
  },
};
