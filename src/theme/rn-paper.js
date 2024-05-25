import {MD3DarkTheme, DefaultTheme} from 'react-native-paper';
import {configureFonts} from 'react-native-paper';
import {font} from './fonts';

const fontConfig = {
  default: {
    regular: {
      fontFamily: font.regular,
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: font.medium,
      fontWeight: 'normal',
    },
    light: {
      fontFamily: font.light,
      fontWeight: '400',
    },
    thin: {
      fontFamily: font.light,
      fontWeight: '300',
    },
  },
  android: {
    regular: {
      fontFamily: font.regular,
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: font.medium,
      fontWeight: 'normal',
    },
    light: {
      fontFamily: font.light,
      fontWeight: '400',
    },
    thin: {
      fontFamily: font.light,
      fontWeight: '300',
    },
  },
  ios: {
    regular: {
      fontFamily: font.regular,
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: font.medium,
      fontWeight: 'normal',
    },
    light: {
      fontFamily: font.light,
      fontWeight: '400',
    },
    thin: {
      fontFamily: font.light,
      fontWeight: '300',
    },
  },
};
const colorsLightTheme = {
  colors: {
    primary: 'rgb(36, 109, 0)',
    onPrimary: 'rgb(255, 255, 255)',
    primaryContainer: 'rgb(156, 249, 115)',
    onPrimaryContainer: 'rgb(6, 33, 0)',
    secondary: 'rgb(160, 61, 72)',
    onSecondary: 'rgb(255, 255, 255)',
    secondaryContainer: 'rgb(255, 255, 255)',
    onSecondaryContainer: 'rgb(64, 0, 13)',
    tertiary: 'rgb(0, 104, 116)',
    onTertiary: 'rgb(255, 255, 255)',
    tertiaryContainer: 'rgb(151, 240, 255)',
    onTertiaryContainer: 'rgb(0, 31, 36)',
    error: 'rgb(186, 26, 26)',
    onError: 'rgb(255, 255, 255)',
    errorContainer: 'rgb(255, 218, 214)',
    onErrorContainer: 'rgb(65, 0, 2)',
    background: 'rgb(253, 253, 246)',
    onBackground: 'rgb(26, 28, 24)',
    surface: 'rgb(253, 253, 246)',
    onSurface: 'rgb(26, 28, 24)',
    surfaceVariant: 'rgb(223, 228, 215)',
    onSurfaceVariant: 'rgb(67, 72, 62)',
    outline: 'rgb(115, 121, 109)',
    outlineVariant: 'rgb(195, 200, 187)',
    shadow: 'rgb(0, 0, 0)',
    scrim: 'rgb(0, 0, 0)',
    inverseSurface: 'rgb(47, 49, 45)',
    inverseOnSurface: 'rgb(241, 241, 234)',
    inversePrimary: 'rgb(129, 220, 90)',
    elevation: {
      level0: 'transparent',
      level1: 'rgb(242, 246, 234)',
      level2: 'rgb(236, 242, 226)',
      level3: 'rgb(229, 237, 219)',
      level4: 'rgb(227, 236, 217)',
      level5: 'rgb(223, 233, 212)',
    },
    surfaceDisabled: 'rgba(26, 28, 24, 0.12)',
    onSurfaceDisabled: 'rgba(26, 28, 24, 0.38)',
    backdrop: 'rgba(45, 50, 41, 0.4)',
  },
};
const colorsDarkTheme = {
  colors: {
    primary: 'rgb(129, 220, 90)',
    onPrimary: 'rgb(15, 57, 0)',
    primaryContainer: 'rgb(25, 82, 0)',
    onPrimaryContainer: 'rgb(156, 249, 115)',
    secondary: 'rgb(255, 179, 182)',
    onSecondary: 'rgb(98, 13, 29)',
    secondaryContainer: 'rgb(129, 38, 50)',
    onSecondaryContainer: 'rgb(255, 218, 218)',
    tertiary: 'rgb(79, 216, 235)',
    onTertiary: 'rgb(0, 54, 61)',
    tertiaryContainer: 'rgb(0, 79, 88)',
    onTertiaryContainer: 'rgb(151, 240, 255)',
    error: 'rgb(255, 180, 171)',
    onError: 'rgb(105, 0, 5)',
    errorContainer: 'rgb(147, 0, 10)',
    onErrorContainer: 'rgb(255, 180, 171)',
    background: 'rgb(26, 28, 24)',
    onBackground: 'rgb(227, 227, 220)',
    surface: 'rgb(26, 28, 24)',
    onSurface: 'rgb(227, 227, 220)',
    surfaceVariant: 'rgb(67, 72, 62)',
    onSurfaceVariant: 'rgb(195, 200, 187)',
    outline: 'rgb(141, 146, 135)',
    outlineVariant: 'rgb(67, 72, 62)',
    shadow: 'rgb(0, 0, 0)',
    scrim: 'rgb(0, 0, 0)',
    inverseSurface: 'rgb(227, 227, 220)',
    inverseOnSurface: 'rgb(47, 49, 45)',
    inversePrimary: 'rgb(36, 109, 0)',
    elevation: {
      level0: 'transparent',
      level1: 'rgb(31, 38, 27)',
      level2: 'rgb(34, 43, 29)',
      level3: 'rgb(37, 49, 31)',
      level4: 'rgb(38, 51, 32)',
      level5: 'rgb(40, 55, 33)',
    },
    surfaceDisabled: 'rgba(227, 227, 220, 0.12)',
    onSurfaceDisabled: 'rgba(227, 227, 220, 0.38)',
    backdrop: 'rgba(45, 50, 41, 0.4)',
  },
};
export const CustomLightTheme = {
  ...DefaultTheme,
  ...colorsLightTheme,
  fonts: {
    displayLarge: {
      fontFamily: font.regular,
      letterSpacing: 0,
      fontWeight: '400',
      lineHeight: 64,
      fontSize: 57,
    },
    displayMedium: {
      fontFamily: font.regular,
      letterSpacing: 0,
      fontWeight: '400',
      lineHeight: 52,
      fontSize: 45,
    },
    displaySmall: {
      fontFamily: font.regular,
      letterSpacing: 0,
      fontWeight: '400',
      lineHeight: 44,
      fontSize: 36,
    },
    headlineLarge: {
      fontFamily: font.regular,
      letterSpacing: 0,
      fontWeight: '400',
      lineHeight: 40,
      fontSize: 32,
    },
    headlineMedium: {
      fontFamily: font.regular,
      letterSpacing: 0,
      fontWeight: '400',
      lineHeight: 36,
      fontSize: 28,
    },
    headlineSmall: {
      fontFamily: font.regular,
      letterSpacing: 0,
      fontWeight: '400',
      lineHeight: 32,
      fontSize: 24,
    },
    titleLarge: {
      fontFamily: font.regular,
      letterSpacing: 0,
      fontWeight: '400',
      lineHeight: 28,
      fontSize: 22,
    },
    titleMedium: {
      fontFamily: font.regular,
      letterSpacing: 0.15,
      fontWeight: '500',
      lineHeight: 24,
      fontSize: 16,
    },
    titleSmall: {
      fontFamily: font.regular,
      letterSpacing: 0.1,
      fontWeight: '500',
      lineHeight: 20,
      fontSize: 14,
    },
    labelLarge: {
      fontFamily: font.regular,
      letterSpacing: 0.1,
      fontWeight: '500',
      lineHeight: 20,
      fontSize: 14,
    },
    labelMedium: {
      fontFamily: font.regular,
      letterSpacing: 0.5,
      fontWeight: '500',
      lineHeight: 16,
      fontSize: 12,
    },
    labelSmall: {
      fontFamily: font.regular,
      letterSpacing: 0.5,
      fontWeight: '500',
      lineHeight: 16,
      fontSize: 11,
    },
    bodyLarge: {
      fontFamily: font.regular,
      letterSpacing: 0.15,
      fontWeight: '400',
      lineHeight: 24,
      fontSize: 16,
    },
    bodyMedium: {
      fontFamily: font.regular,
      letterSpacing: 0.25,
      fontWeight: '400',
      lineHeight: 20,
      fontSize: 14,
    },
    bodySmall: {
      fontFamily: font.regular,
      letterSpacing: 0.4,
      fontWeight: '400',
      lineHeight: 16,
      fontSize: 12,
    },
    default: {
      fontFamily: font.regular,
      letterSpacing: 0,
      fontWeight: '400',
    },
    ios: {
      regular: {
        fontFamily: font.regular,
        fontWeight: 'normal',
      },
      medium: {
        fontFamily: font.medium,
        fontWeight: 'normal',
      },
      light: {
        fontFamily: font.thin,
        fontWeight: '400',
      },
      thin: {
        fontFamily: font.thin,
        fontWeight: '300',
      },
      bold: 'Roboto-Bold',
    },
    android: {
      regular: {
        fontFamily: font.regular,
        fontWeight: 'normal',
      },
      medium: {
        fontFamily: font.medium,
        fontWeight: 'normal',
      },
      light: {
        fontFamily: font.thin,
        fontWeight: '400',
      },
      thin: {
        fontFamily: font.thin,
        fontWeight: '300',
      },
    },
  },
};
export const CustomDarkTheme = {
  ...MD3DarkTheme,
  ...colorsDarkTheme,
  fonts: configureFonts({config: fontConfig, isV3: true}),
};
export default CustomLightTheme;
