const { FlatCompat } = require('@eslint/eslintrc');
const compat = new FlatCompat();
module.exports = [
  ...compat.config({
    extends: ['@react-native'],
    root: true,
  }),
];
