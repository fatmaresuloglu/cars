module.exports = {
  displayName: 'xxx-system-react-native',
  preset: 'react-native',
  resolver: '@nx/jest/plugins/resolver',
  moduleFileExtensions: ['ts', 'js', 'html', 'tsx', 'jsx'],
  setupFilesAfterEnv: ['<rootDir>/test-setup.ts'],
  moduleNameMapper: {
    // '.svg': '@nx/react-native/plugins/jest/svg-mock',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(@react-native|react-native|react-native-calendars|react-native-swipe-gestures)/)',
  ],
  setupFiles: ['../../node_modules/react-native-gesture-handler/jestSetup.js'],
};
