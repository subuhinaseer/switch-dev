module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-paper/babel',
    [
      'module-resolver',
      {
        root: ['./src'],
        // extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '~/assets/*': './src/assets/*',
          '~/components/*': './src/components/*',
          '~/localization/*': './src/localization/*',
          '~/effects/*': './src/effects/*',
          '~/screens/*': './src/screens/*',
          '~/models/*': './src/models/*',
          '~/navigators/*': './src/navigators/*',
          '~/stores/*': './src/stores/*',
          '~/theme/*': './src/theme/*',
          '~/helpers/*': './src/helpers/*',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
  env: {
    production: {
      plugins: ['react-native-paper/babel', 'react-native-reanimated/plugin'],
    },
  },
};
