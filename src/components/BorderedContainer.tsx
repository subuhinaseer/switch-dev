import React, {ReactNode} from 'react';
import {StyleSheet, ViewStyle} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
type IProps = {
  style?: ViewStyle;
  children: ReactNode;
};

export default function BorderedContainer(props: IProps) {
  const {style, children} = props;
  return (
    <SafeAreaView edges={['bottom']} style={[styles.root, style]}>
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 20,
    // backgroundColor: colors.white,
  },
});
