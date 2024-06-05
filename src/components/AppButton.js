import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Button as PaperButton } from 'react-native-paper';
// import {
//   INPUT_BG_COLOR,
//   BLACK_VARIANT_COLOR3,
// } from '../../assets/colors';
// import { AppTheme } from '../../helpers/constants';
// import Text from '../typography/Text';
const BLACK_VARIANT_COLOR3='#000'
const INPUT_BG_COLOR='#eee'
const AppButton = (props) => {
  return (
    <PaperButton
      {...props}
      style={[
        styles.loginButton,
        styles.containedButton,
        props.disabled || props.loading ? styles.disabledStyle : {},
        props.style,
      ]}
      contentStyle={[
        styles.containedButtonContent,
        props.containedButtonContent,
      ]}
      disabled={props.loading || props.disabled}
      labelStyle={[styles.containedButtonLabel, props.containedButtonLabel]}
      uppercase={false}
      loading={props.loading}
      mode={props.mode}
      icon={props.renderIcon ? props.renderIcon : <></>}
      onPress={props.onPress}
    >
      {props.leftIcon ? (
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: 5,
          }}
        >
          {props.leftIcon}
          <Text
            // color={props.textColor}
            style={[
              styles.containedButtonLabel,
              props.disabled ? { color: BLACK_VARIANT_COLOR3 } : {},
              props.containedButtonLabel,
            ]}
          >
            {props.label}
          </Text>
          {props.rightIcon ? (
            <TouchableOpacity onPress={props.onIconPress}>
              {props.rightIcon}
            </TouchableOpacity>
          ) : (
            <></>
          )}
        </View>
      ) : props.rightIcon ? (
        <View
          style={{
            backgroundColor: 'green',
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: 5,
          }}
        >
          <Text
            color={props.textColor}
            style={[
              styles.containedButtonLabel,
              props.disabled ? { color: BLACK_VARIANT_COLOR3 } : {},
              props.containedButtonLabel,
            ]}
          >
            {props.label}
          </Text>
          <TouchableOpacity onPress={props.onIconPress}>
            {props.rightIcon}
          </TouchableOpacity>
        </View>
      ) : (
        <Text
          color={props.textColor}
          style={[
            styles.containedButtonLabel,
            props.disabled ? { color: BLACK_VARIANT_COLOR3 } : {},
            props.containedButtonLabel,
          ]}
        >
          {props.label}
        </Text>
      )}

      {props.children && props.children}
    </PaperButton>
  );
};

AppButton.defaultProps = {
  mode: 'contained',
  renderIcon: false,
};

const styles = StyleSheet.create({
  containedButton: {
    marginHorizontal: 21,
    elevation: 0,
    height: 50,
  },
  containedButtonContent: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 50,
  },
  containedButtonLabel: {
    marginVertical: 0,
    // fontFamily: AppTheme.Fonts.STERADIAN_MEDIUM,
    // fontSize: AppTheme.Sizing.TEXT_FONT_SIZE,
    ...Platform.select({
      ios: { fontWeight: '500' },
    }),
    letterSpacing: 0,
  },
  loginButton: {
    marginBottom: 10,
    height: 50,
    backgroundColor: '#F6B100',
  },
  disabledStyle: {
    backgroundColor: INPUT_BG_COLOR,
  },
});

export default AppButton;
