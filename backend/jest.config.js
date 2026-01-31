module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  testMatch: ['**/__tests__/**/*.test.(ts|js)'],
  globals: {
    'ts-jest': {
      isolatedModules: true
    }
  }
};
