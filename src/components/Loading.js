import React from 'react';
import Lottie from 'lottie-react-native';
import {StyleSheet} from 'react-native';

export default function Loading(props) {
  const {style = {}, ...rest} = props;
  return (
    <Lottie
      style={[styles.flex1, style]}
      source={require('../assets/lottie/loading.json')}
      autoPlay
      loop
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
});
