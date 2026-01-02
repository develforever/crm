module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
   setupFiles: ['<rootDir>/tests/polyfills.ts'],
  setupFilesAfterEnv: ['<rootDir>/tests/setupTests.ts'],
  testMatch: ['**/?(*.)+(test).+(ts|tsx)']
};