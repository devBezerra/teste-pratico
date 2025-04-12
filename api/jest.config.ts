import { pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from './tsconfig.json';

export default {
 preset: 'ts-jest',
 testEnvironment: 'node',
 moduleFileExtensions: ['js', 'json', 'ts'],
 rootDir: './',
 testRegex: '.*\\.spec\\.ts$',
 transform: {
  '^.+\\.ts$': 'ts-jest',
 },
 moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
  prefix: '<rootDir>/',
 }),
};
