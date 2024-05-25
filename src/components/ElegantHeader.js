import React from 'react';
import {View, StyleSheet, Pressable} from 'react-native';
import {Text} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors} from '../theme';

export default function ElegantHeader(props) {
  const {menu = [], subtitle} = props;
  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.container}>
        {menu.map(({title, selected, ...otherProps}, index) => (
          <Pressable key={index} style={styles.columnContainer} {...otherProps}>
            <Text
              variant={selected ? 'headlineLarge' : 'headlineSmall'}
              style={selected ? styles.selectedText : styles.unSelectedText}>
              {title}
            </Text>
            {selected && <View style={styles.whiteBar} />}
          </Pressable>
        ))}
      </View>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    paddingBottom: '20%',
    backgroundColor: colors.primary,
  },
  container: {
    flexDirection: 'row',
    backgroundColor: colors.primary,
  },
  columnContainer: {
    paddingHorizontal: 20,
  },
  bold: {fontWeight: 'bold'},
  unSelectedText: {marginTop: 8, color: colors.white},
  selectedText: {fontWeight: 'bold'},
  subtitle: {
    paddingLeft: 10,
    paddingVertical: 10,
    color: colors.black,
    fontFamily: 'Montserrat-Regular',
    textAlign: 'center',
  },
  whiteBar: {
    height: 8,
    width: '50%',
    marginTop: 4,
    backgroundColor: colors.white,
    borderRadius: 10,
  },
});
