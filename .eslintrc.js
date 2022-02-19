require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  extends: ['@il9/eslint-config-base'],
  parserOptions: { tsconfigRootDir: __dirname },
  settings: {
    'import/internal-regex': ['^@ws/'],
  },
  ignorePatterns: ['lib'],
};
