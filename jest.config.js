module.exports = {
  testEnvironment: 'jsdom',
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
  testPathIgnorePatterns: ['/node_modules/', '/__mocks__/'],
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
};
