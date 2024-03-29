// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({ path: '.env.test' });

/* eslint-disable */
export default {
  displayName: 'api',
  preset: '../../jest.preset.js',
  globals: {},
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
      },
    ],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/apps/api',
  testTimeout: 20000,
};
