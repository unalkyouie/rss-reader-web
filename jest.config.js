/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],

  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/__mocks__/'],

  moduleNameMapper: {
    '^~/(.*)$': '<rootDir>/src/$1',
    '^~/components/(.*)$': '<rootDir>/src/components/$1',
    '^~/features/(.*)$': '<rootDir>/src/features/$1',
    '^~/hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^~/utils/(.*)$': '<rootDir>/src/utils/$1',
  },

  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },

  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
