import type { Config } from 'jest';



const config: Config = {
    preset:'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.ts'],
  clearMocks: true,
  verbose: true,
  moduleFileExtensions: ['ts','js', 'json'],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
    '!src/server.ts'
  ],
setupFiles:['dotenv/config'],
setupFilesAfterEnv: ['<rootDir>/src/tests/setup.ts'],
coverageDirectory: 'coverage',
coverageReporters: ['text', 'lcov'],
}
export default config;

