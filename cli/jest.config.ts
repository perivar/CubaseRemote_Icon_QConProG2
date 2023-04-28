import { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['src'],
  transform: {
    '\\.[jt]sx?$': ['ts-jest', { tsconfig: 'tsconfig.json' }],
  },
  testRegex: '/__tests__/.*.test.ts$',
  verbose: true,
};

export default config;
