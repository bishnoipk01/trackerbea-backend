module.exports = {
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
  },
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  setupFiles: ['<rootDir>/test/setup.e2e.ts'],
  globalSetup: './test/setup.ts',
  globalTeardown: './test/teardown.ts',
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
};
