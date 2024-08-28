module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.{ts,tsx}'],
  coveragePathIgnorePatterns: ['<rootDir>/src/index.tsx'],
  coverageThreshold: {
    global: {
      statements: 98,
      branches: 96,
      functions: 97,
      lines: 98
    }
  },
  moduleDirectories: ['<rootDir>/node_modules'],
  moduleNameMapper: {
    '^.+\\.scss$': 'identity-obj-proxy'
  },
  rootDir: '../',
  setupFilesAfterEnv: ['<rootDir>/jest/setup.js'],
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/**/*.test.(ts|tsx)'],
  transform: {
    '^.+\\.(j|t)sx?$': 'babel-jest',
    '^.+\\.svg$': 'jest-transformer-svg'
  },
  transformIgnorePatterns: ['<rootDir>/node_modules'],
  verbose: true
};
