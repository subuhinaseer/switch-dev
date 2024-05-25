import {Platform} from 'react-native';
export const font = {
  light: Platform.select({
    default: 'Montserrat-Light',
  }),
  medium: Platform.select({
    default: 'Montserrat-Medium',
  }),
  regular: Platform.select({
    default: 'Montserrat-Regular',
  }),
  bold: Platform.select({
    default: 'Montserrat-Bold',
  }),
};
