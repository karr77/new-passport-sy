module.exports = {
  extends: [
    require.resolve('@umijs/max/stylelint'),
    'stylelint-config-standard',
    'stylelint-config-prettier'
  ],
  rules: {
    'no-duplicate-selectors': true,
    'declaration-block-no-duplicate-properties': true,
    'declaration-block-no-shorthand-property-overrides': true,
    'selector-class-pattern': '^[a-z][a-zA-Z0-9]+$',
    'keyframes-name-pattern': '^[a-z][a-zA-Z0-9]+$',
  },
};