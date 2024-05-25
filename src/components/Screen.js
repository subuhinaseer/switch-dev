import React from 'react';
import {View, StyleSheet} from 'react-native';
import {colors} from '../theme';
import {SafeAreaView} from 'react-native-safe-area-context';

export default function Screen(props) {
  const {style, children} = props;
  return <SafeAreaView style={[styles.root, style]}>{children}</SafeAreaView>;
}
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.white,
  },
});
