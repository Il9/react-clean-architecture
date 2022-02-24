module.exports = {
  root: true,
  extends: ['@il9/eslint-config-base'],
  settings: {
    'import/internal-regex': ['^@ws/'],
  },
  ignorePatterns: ['node_modules', 'lib'],
};
