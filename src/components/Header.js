import React, {ReactNode, useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import {colors} from '../theme';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import FastImage from 'react-native-fast-image';

type IProps = {
  title: string,
  isMainMenu: boolean,
  onGoBack: Function,
  RightComponent: ReactNode,
};
export default function Header(props: IProps) {
  const {
    title,
    subtitle,
    hideBranding = false,
    RightComponent,
    centerTitle = false,
  } = props;
  const navigation = useNavigation();
  const onGoBack = useCallback(() => {
    if (props.onGoBack) {
      props.onGoBack();
    } else if (navigation.canGoBack()) {
      navigation.goBack();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <SafeAreaView edges={['bottom', 'top']} style={styles.root}>
      {props.onGoBack && (
        <Icon
          onPress={onGoBack}
          color={colors.secondary}
          name="arrow-back"
          size={30}
        />
      )}
      {!hideBranding && (
        <View style={[styles.horizontal, styles.m6]}>
          <FastImage
            resizeMode={FastImage.resizeMode.contain}
            style={styles.logo}
            source={require('../assets/images/logo.png')}
          />
          <Text style={styles.title}>SmartDuka</Text>
        </View>
      )}
      {(title || subtitle) && (
        <View style={[styles.titleSubtitle, centerTitle && styles.center]}>
          {title && <Text style={styles.title}>{title}</Text>}
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
      )}

      {!!RightComponent && (
        <View style={styles.rightComponent}>{RightComponent}</View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    paddingVertical: 10,
    backgroundColor: colors.primaryBG,
    paddingLeft: 10,
    flexDirection: 'row',
  },
  m6: {margin: 6},
  titleSubtitle: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    color: colors.secondary,
    fontSize: 16,
    paddingLeft: 4,
  },
  subtitle: {
    color: colors.white,
    fontSize: 12,
    paddingVertical: 20,
  },
  logo: {
    width: 20,
    height: 20,
  },
  rightComponent: {
    padding: 6,
  },
  horizontal: {
    flexDirection: 'row',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
