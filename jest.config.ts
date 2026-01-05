import type { Config } from 'jest';

const config: Config = {
  verbose: true,
  preset: 'ts-jest',
  roots: ['<rootDir>/assets'],
  testEnvironment: 'jest-fixed-jsdom',
  setupFiles: ['<rootDir>/tests/polyfills.ts'],
  setupFilesAfterEnv: ['<rootDir>/tests/setupTests.ts'],
  transformIgnorePatterns: [
    "/node_modules/(?!(msw|@mswjs|until-async|@bundled-es-modules|headers-polyfill)/)"
  ],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/tests/fileMock.js',
  },
  transform: {
    '^.+\\.(t|j)sx?$': 'babel-jest',
  },
};

export default config;