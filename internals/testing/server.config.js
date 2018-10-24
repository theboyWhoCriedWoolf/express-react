module.exports = {
  rootDir: '../../',
  collectCoverageFrom: [
    'server/**/*.{js,jsx}',
    '!server/**/*.test.{js,jsx}',
    '!server/*/RbGenerated*/*.{js,jsx}',
    '!server/index.js',
    '!**/internals/**',
  ],
  coverageThreshold: {
    global: {
      statements: 98,
      branches: 91,
      functions: 98,
      lines: 98,
    },
  },
  testPathIgnorePatterns: ['/internals/', '/src/'],
  moduleDirectories: ['node_modules', 'server'],
  setupTestFrameworkScriptFile: '<rootDir>/internals/testing/test-bundler.js',
  testRegex: 'tests/.*\\.test\\.js$',
};
