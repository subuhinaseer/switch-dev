import React, {useRef, useState, useEffect} from 'react';
import {
  useColorScheme,
  View,
  StyleSheet,
  Pressable,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import {HelperText, TextInput} from 'react-native-paper';
import CountryModal, {DARK_THEME} from 'react-native-country-picker-modal';
import MaskedInput from 'react-native-text-input-mask';
import {useTranslation} from '../localization';
import {colors} from '../theme';
import AntDesign from 'react-native-vector-icons/AntDesign';
import phoneMasks from '../assets/data/phoneMasks.json';
import {utils} from '../helpers';
import {selectContactPhone} from 'react-native-select-contact';

export default function PhoneInput({
  onChangeText,
  containerStyle = {},
  initialCountry = 'TZ',
  hasCountryPicker = true,
  errorMessage,
  value,
  label,
  setValue,
  ...props
}) {
  const phoneRef = useRef();
  const {t} = useTranslation();
  const [cca2, setCca2] = useState(initialCountry);
  const isDark = useColorScheme() === 'dark';
  const themes = isDark ? {theme: DARK_THEME} : {};
  const [extracted, setExtracted] = useState(value || '');
  const [mask, setMask] = useState(phoneMasks[initialCountry]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const selectPhoneNumber = async () => {
    // on android we need to explicitly request for contacts permission and make sure it's granted
    // before calling API methods
    if (Platform.OS === 'android') {
      const request = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
      );

      // denied permission
      if (
        [
          PermissionsAndroid.RESULTS.DENIED,
          PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN,
        ].includes(request)
      ) {
        return utils.toast('Permission Denied', {type: 'error'});
      }
    }
    // Here we are sure permission is granted for android or that platform is not android
    const selection = await selectContactPhone();
    if (!selection) {
      return null;
    }
    const {
      contact: {name},
      selectedPhone,
    } = selection;
    onChangeText(`+${utils.extractDigits(selectedPhone.number)}`);
    setExtracted(selectedPhone.number);
    if (setValue) {
      setValue('third_party.name', name);
    }
  };
  useEffect(() => {
    if (initialCountry) {
      setCca2(initialCountry);
    }
  }, [initialCountry]);

  useEffect(() => {
    const selectedMask = phoneMasks[cca2];
    setMask(selectedMask);
  }, [cca2]);
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.horizontal}>
        {hasCountryPicker && (
          <CountryModal
            onSelect={({cca2: cca}) => {
              setCca2(cca);
              phoneRef.current?.focus();
            }}
            countryCode={cca2}
            translation="eng"
            cancelText="Cancel"
            {...themes}
            visible={isModalVisible}
            withCountryNameButton={true}
            containerButtonStyle={[
              styles.textOutline,
              styles.countryContainerButton,
            ]}
            placeholder={t('Select a country')}
            withEmoji
            withFlag
            withAlphaFilter
            withCallingCode
          />
        )}
        <Pressable
          onPress={() => setIsModalVisible(!isModalVisible)}
          style={styles.flagArrowDown}>
          <AntDesign size={16} name="down" color={colors.white} />
        </Pressable>
        <TextInput
          mode="outlined"
          {...colors.TextInput}
          textColor='#fff'
          theme={textInputTheme}
          right={
            <TextInput.Icon
              icon="book-open-outline"
              onPress={selectPhoneNumber}
            />
          }
          render={_props => (
            <MaskedInput
              {..._props}
              refInput={phoneRef}
              value={extracted}
              // onBlur={() => setIsFocused(false)}
              // onFocus={() => setIsFocused(true)}
              mask={`${mask.code} ${
                Array.isArray(mask.mask) ? mask.mask[0] : mask.mask
              }`}
              onChangeText={(_formatted, _extracted) => {
                setExtracted(_extracted);
                onChangeText(`+${utils.extractDigits(_formatted)}`);
              }}
            />
          )}
          {...props}
          error={!!errorMessage}
          keyboardType="phone-pad"
          activeOutlineColor='#01232D'
          // outlineStyle={styles.textOutline}
          style={[styles.textInput, props.style ? props.style : {}]}
        />
      </View>
      {!!errorMessage && (
        <HelperText type="error" visible={!!errorMessage}>
          {errorMessage}
        </HelperText>
      )}
    </View>
  );
}

const textInputTheme = {
  colors: {
    placeholder: 'blue',
    text: 'white',
    primary: colors.primary,
    background: colors.white,
    //
    primaryContainer: colors.white,
    secondary: colors.black,
    secondaryContainer: colors.white,

    surface: 'white', //text
    onSurface: colors.black, //background
    onSurfaceVariant: 'rgba(0,0,0,0.8)',
    onSurfaceDisabled: colors.disabledText,
  },
};

const styles = StyleSheet.create({
  flex1: {flex: 1},
  textInput: {
    flex: 1,
    backgroundColor: '#01232D',
  
  },
  textOutline: {
    borderRadius: 10,
  },
  flagArrowDown: {
    marginLeft: -25,
    marginTop: 22,
    paddingRight: 10,
  },
  countryContainerButton: {
    width: 60,
    // borderColor: '#D5EAF1',
    // borderBottomWidth: 0.5,
    alignItems: 'flex-start',
    alignSelf: 'center',
    marginRight: 4,
    paddingTop: 8,
    paddingLeft: 6,
    marginTop: 6,
    paddingBottom: Platform.select({ios: 6, default: 15}),
    borderRadius: 6,
  },
  container: {
    marginHorizontal: 6,
  },
  horizontal: {
    flexDirection: 'row',
    borderWidth:1,
    borderColor:"#D5EAF1",
    borderRadius:10,
    paddingHorizontal:5
  },
});
