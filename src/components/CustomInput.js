import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  Alert,
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {colors} from '../theme';
//
import PhoneInput from './PhoneInput';
import {
  Text,
  HelperText,
  TextInput,
  RadioButton,
  Button,
  Modal,
  Portal,
  IconButton,
  List,
  Chip,
} from 'react-native-paper';
import FastImage from 'react-native-fast-image';
import {requests, utils, width} from '../helpers';
import DatePicker from 'react-native-date-picker';
import dayjs from 'dayjs';
import {useNavigation} from '@react-navigation/native';
import {useCurrentLocation, useDeviceEvent} from '../effects';
import ImageView from 'react-native-image-viewing';
import {t} from '../localization';
import {useChoicesByUrl} from './SurveyForm/libraries/useChoicesByUrl';
import {PaperSelect} from 'react-native-paper-select';
import _ from 'lodash';
import {Switch} from 'react-native-paper';

export const SwitchInput = props => {
  const {label, placeholder, value, onChangeText} = props;
  const [isSwitchOn, setIsSwitchOn] = useState(value);

  const onToggleSwitch = () => {
    const newValue = !isSwitchOn;
    onChangeText && onChangeText(newValue);
    setIsSwitchOn(newValue);
  };

  const renderSwitch = useCallback(
    () => <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isSwitchOn],
  );

  return (
    <List.Item title={label} description={placeholder} right={renderSwitch} />
  );
};

export const CurrentLocationInput = props => {
  const {
    placeholder = t('Press to sync get location'),
    onChangeText = () => null,
    style,
    errorMessage,
  } = props;
  const {isLoading, currentLocation, getCurrentPosition} = useCurrentLocation();
  const [isSyncingLocation, setIsSyncingLocation] = useState(false);
  const [value, setValue] = useState(props.value);

  useEffect(() => {
    if (currentLocation && isSyncingLocation) {
      onChangeText(currentLocation);
      setValue(currentLocation);
      setIsSyncingLocation(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLocation, isSyncingLocation]);

  const onSyncLocation = () => {
    setIsSyncingLocation(true);
    getCurrentPosition(location => {
      // console.log('synced loca11', location);
    }, true);
  };

  return (
    <View style={styles.inputContainer}>
      <Chip
        icon="map-marker-outline"
        onPress={onSyncLocation}
        style={[styles.currentLocationInput, style]}
        mode="outlined">
        {value
          ? `lat:${utils.round(value.latitude, 4)},lng:${utils.round(
              value.longitude,
              4,
            )}, ${utils.formatNumber(value.speed * 3.6)} kph`
          : isLoading
          ? t('Syncing location')
          : placeholder}
      </Chip>
      {!!errorMessage && (
        <HelperText type="error" visible={!!errorMessage}>
          {errorMessage}
        </HelperText>
      )}
    </View>
  );
};

export function DropDownInput(props) {
  const {
    label,
    placeholder,
    onChangeText,
    errorMessage,
    choicesByUrl = {},
    multiEnable = false,
  } = props;
  const [selectedList, setSelectedList] = useState([]);
  const {choices} = useChoicesByUrl({
    ...choicesByUrl,
    defaultValue: props.choices,
    extraKeys: [
      ['_id', (item, choice) => choice.value],
      ['value', (item, choice) => choice.text],
    ],
  });

  useEffect(() => {
    if (!multiEnable && props.value) {
      setSelectedList(choices.filter(c => props.value === c.value));
    } else if (multiEnable) {
      setSelectedList(choices.filter(c => props.value.includes(c.value)));
    }
  }, [props.value, choices, multiEnable]);

  // console.log(choices);

  return (
    <View style={styles.inputContainer}>
      <PaperSelect
        label={label || ''}
        value={selectedList.map(s => s.text).join(',')}
        onSelection={selected => {
          setSelectedList(selected.selectedList);
          if (onChangeText) {
            if (multiEnable) {
              onChangeText(selected.selectedList.map(s => s._id));
            } else {
              onChangeText(selected.selectedList.map(s => s._id)[0]);
            }
          }
        }}
        hideSearchBox={_.isEmpty(choicesByUrl)}
        dialogTitle={placeholder || label}
        arrayList={choices}
        selectedArrayList={selectedList}
        errorText={errorMessage}
        multiEnable={multiEnable}
        textInputMode="outlined"
        checkboxProps={{
          checkboxColor: colors.primary,
          checkboxUncheckedColor: colors.grey,
        }}
        textInputProps={{
          mode: 'outlined',
          underlineColor: 'transparent',
          theme: textInputTheme,
          //
          outlineColor: '#D5EAF1',
          textColor: '#D5EAF1',
          selectionColor: '#FFF',
          placeholderTextColor: 'grey',
          outlineStyle: styles.textOutline,
          style: styles.textInput,
        }}
      />
    </View>
  );
}

export const RadioInput = props => {
  const {label, onChangeText, errorMessage, choicesByUrl = {}} = props;
  const [value, setValue] = useState(props.value);
  const {choices} = useChoicesByUrl({
    ...choicesByUrl,
    defaultValue: props.choices,
  });

  useEffect(() => {
    if (value !== props.value) {
      setValue(props.value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.value]);

  useEffect(() => {
    onChangeText && onChangeText(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <View style={styles.inputContainer}>
      <RadioButton.Group onValueChange={setValue} value={value}>
        {label && <Text style={styles.label}>{label}</Text>}
        <ScrollView
          horizontal
          contentContainerStyle={styles.radioButtonsContainer}>
          {choices.map((choice, idx) => (
            <RadioButton.Item
              position="leading"
              label={typeof choice === 'object' ? choice.text || '' : choice}
              value={typeof choice === 'object' ? choice.value || '' : choice}
              mode={'android'}
              key={idx}
            />
          ))}
        </ScrollView>
        {errorMessage && <HelperText type="error">{errorMessage}</HelperText>}
      </RadioButton.Group>
    </View>
  );
};

export const ImagePickerInput = props => {
  const {
    value = false,
    label,
    choices,
    placeholder,
    description,
    containerStyle = {},
    onChangeText = () => null,
  } = props;
  const [selectedItem, setSelectedItem] = useState(value);

  useEffect(() => {
    if (value !== selectedItem) {
      onChangeText(selectedItem);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedItem]);

  const onPressItem = item => {
    setSelectedItem(item.value);
  };

  return (
    <View style={[styles.inputContainer, containerStyle]}>
      <Text style={styles.label}>{label}</Text>
      <Text>{description || placeholder}</Text>
      <FlatList
        data={choices}
        horizontal
        renderItem={({item, index}) => (
          <Pressable onPress={() => onPressItem(item)}>
            <FastImage
              source={{uri: item.imageLink}}
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                width: width / 2.5,
                height: width / 2.5,
                margin: 1,
                borderColor: colors.primary,
                borderWidth: selectedItem === item.value ? 4 : 0,
              }}
              resizeMode={FastImage.resizeMode.center}
            />
          </Pressable>
        )}
      />
    </View>
  );
};

const AddFileFormButton = _props => (
  <Button {..._props} mode="contained">
    {t('Continue')}
  </Button>
);

export const FileInput = props => {
  const navigation = useNavigation();
  const {
    label,
    placeholder,
    onChangeText,
    uploadURL,
    errorMessage,
    extraUploadSchema,
    allowMultiple = false,
    uploadMethod = 'post',
    fileFieldName = 'file',
    isAvatar = false,
  } = props;
  // import here to prevent circular dependencies
  const SurveyForm = useMemo(() => require('./SurveyForm').default, []);
  const [value, setValue] = useState(props.value);
  const eventName = useMemo(() => utils.uuidv4(), []);
  const [visible, setIsVisible] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [file] = useDeviceEvent(eventName);
  // for modal
  const [isModalVisible, setIsModalVisible] = useState(false);
  const hideModal = () => setIsModalVisible(false);
  const showModal = () => setIsModalVisible(true);

  const addFile = (data = {}) => {
    hideModal();
    return navigation.navigate('Camera', {
      eventName,
      scanBarcode: false,
      canEnterCaption: false,
      uploadURL: uploadURL,
      requestMethod: uploadMethod,
      fieldName: fileFieldName,
      extraUploadValues: data,
    });
  };

  const updateValue = v => {
    setValue(v);
    onChangeText && onChangeText(v);
  };
  useEffect(() => {
    if (file) {
      if (allowMultiple) {
        const newValue = value ? [...value, file] : [file];
        updateValue(newValue);
      } else {
        updateValue(file);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  const deleteItem = item => {
    Alert.alert(t('Delete Item'), t('Confirm deleting the selected item'), [
      {
        style: 'destructive',
        text: t('Delete'),
        onPress: async () => {
          const {id, uri} = item;
          if (uploadURL && id) {
            const {data, ok, originalError} = await requests.delete(
              uploadURL + `${id}/`,
            );
            if (ok) {
              utils.toast(t('Deleted successfully'));
            } else {
              Alert.alert(
                t('Error deleting file'),
                JSON.stringify(data || originalError.message),
              );
            }
          } else if (id) {
            __DEV__ && console.error('Deleting URI not configured');
          }
          // finally remove locally uploaded file;
          if (allowMultiple) {
            setValue(value.filter(v => v.uri !== uri));
          } else {
            setValue();
          }
        },
      },
      {text: t('Dismiss')},
    ]);
  };

  const viewItem = (item, index) => {
    setSelectedImageIndex(index);
    setIsVisible(true);
  };

  const uploadFile = () => {
    if (extraUploadSchema) {
      showModal();
    } else {
      addFile();
    }
  };

  return (
    <View style={[styles.inputContainer, isAvatar && styles.centerFile]}>
      {label && !isAvatar && <Text style={styles.label}>{label}</Text>}
      <FlatList
        horizontal
        data={allowMultiple ? value : value ? [value] : []}
        renderItem={({item, index}) => (
          <Pressable
            onLongPress={() => deleteItem(item)}
            onPress={() => viewItem(item, index)}>
            <FastImage
              source={{
                uri: item.content || item.uri || item[fileFieldName] || item,
              }}
              resizeMode={FastImage.resizeMode.stretch}
              style={
                isAvatar
                  ? styles.avatarImageContainer
                  : styles.uploadImageContainer
              }
            />
            {!!(item.caption || item.name) && (
              <Text style={styles.caption}>
                {utils.truncate(item.caption || item.name, 15)}
              </Text>
            )}
          </Pressable>
        )}
        ListFooterComponent={
          allowMultiple || !value ? (
            <Pressable onPress={uploadFile}>
              <FastImage
                source={require('../assets/camera/openCamera.png')}
                resizeMode={FastImage.resizeMode.center}
                style={
                  isAvatar
                    ? styles.avatarImageContainer
                    : styles.uploadImageContainer
                }
              />
            </Pressable>
          ) : undefined
        }
      />
      {label && isAvatar && <Text>{label}</Text>}
      {placeholder && (
        <Text style={isAvatar ? styles.label : styles.placeholder}>
          {placeholder}
        </Text>
      )}
      {!!errorMessage && (
        <HelperText type="error" visible={!!errorMessage}>
          {errorMessage}
        </HelperText>
      )}
      <ImageView
        images={
          Array.isArray(value)
            ? value.map(i => ({
                ...i,
                uri: i.uri || i.content || i.file || i.avatar,
              }))
            : [
                {
                  ...(value || {}),
                  uri:
                    value?.uri ||
                    value?.content ||
                    value?.file ||
                    value?.avatar,
                },
              ]
        }
        imageIndex={selectedImageIndex}
        visible={visible}
        onRequestClose={() => setIsVisible(false)}
      />
      {extraUploadSchema && (
        <Portal>
          <Modal
            contentContainerStyle={styles.fileOptionsModal}
            visible={isModalVisible}
            onDismiss={hideModal}>
            <IconButton
              style={styles.dismissModalIconContainer}
              iconColor={colors.black}
              icon={'close'}
              onPress={hideModal}
            />
            <SurveyForm
              onSubmit={addFile}
              FormButton={AddFileFormButton}
              schema={extraUploadSchema}
            />
          </Modal>
        </Portal>
      )}
    </View>
  );
};

export const LocationPointInput = props => {
  const {label, onChangeText, placeholder, errorMessage, style, compact} =
    props;
  const navigation = useNavigation();
  const eventName = useMemo(() => utils.uuidv4(), []);
  const [location] = useDeviceEvent(eventName);
  const [value, setValue] = useState(props.value);

  useEffect(() => {
    if (props.value) {
      setValue(props.value);
      onChangeText && onChangeText(props.value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.value]);

  useEffect(() => {
    if (location) {
      setValue(location);
      onChangeText && onChangeText(location);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  const editLocation = () => {
    navigation.navigate('LocationInput', {
      eventName,
    });
  };

  return (
    <View onPress={editLocation} style={styles.inputContainer}>
      {!compact ? (
        <Input
          label={label}
          placeholder={placeholder}
          editable={false}
          value={value ? `${value.name}` : ''}
          errorMessage={errorMessage}
          onPress={editLocation}
          numberOfLines={1}
          right={<TextInput.Icon icon="map" onPress={editLocation} />}
        />
      ) : (
        <Chip onPress={editLocation} style={style} mode="outlined">
          {value ? `${value.name}` : placeholder}
        </Chip>
      )}
      {!!errorMessage && (
        <HelperText type="error" visible={!!errorMessage}>
          2. {errorMessage}
        </HelperText>
      )}
    </View>
  );
};

export const DateInput = props => {
  const {
    label,
    onChangeText,
    placeholder,
    errorMessage,
    compact = false,
    value,
    mode = 'datetime',
  } = props;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (props.value !== value) {
      onChangeText && onChangeText(value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <Pressable onPress={() => setOpen(true)}>
      {compact ? (
        <>
          {label && <Text style={styles.label}>{label}</Text>}
          <Chip mode="outlined" onPress={() => setOpen(true)} icon="calendar">
            {value ? utils.formatDate(value) : placeholder}
          </Chip>
        </>
      ) : (
        <Input
          pointerEvents="none"
          label={label}
          placeholder={placeholder}
          editable={false}
          value={
            value
              ? mode === 'time'
                ? dayjs(value).format('HH:mm A')
                : utils.formatDate(value)
              : placeholder
          }
          errorMessage={errorMessage}
          right={
            <TextInput.Icon icon="calendar" onPress={() => setOpen(true)} />
          }
        />
      )}
      <DatePicker
        mode={mode}
        modal
        open={open}
        date={new Date(dayjs(value).format())}
        onConfirm={date => {
          setOpen(false);
          onChangeText && onChangeText(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </Pressable>
  );
};

export default function Input(props) {
  const {
    keyboardType = 'default',
    inputType = 'text',
    errorMessage,
    containerStyle = {},
    mode = 'outlined',
    inputStyle,
    textColor=colors.text,
    placeholderColor='rgba(0,0,0,0.8)',
    ...otherProps
  } = props;
  const [secureTextEntry, setSecureTextEntry] = useState(props.secureTextEntry);

  const toggleSecureTextEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };
  const textInputTheme = {
    colors: {
      placeholder: placeholderColor,
      text: 'white',
      primary: colors.primary,
      background: colors.backgroundColor,
      //
      primaryContainer: colors.white,
      secondary: colors.black,
      secondaryContainer: colors.white,
      surface: colors.black, //text
      onSurface: colors.black, //background
      onSurfaceVariant: placeholderColor,
      onSurfaceDisabled: colors.disabledText,
    },
  };
  switch (keyboardType) {
    case 'boolean':
      return <SwitchInput {...props} />;
    case 'dropdown':
      return <DropDownInput {...props} />;
    case 'checkbox':
      return <DropDownInput {...props} multiEnable />;
    case 'file':
      return <FileInput {...props} />;
    case 'radiogroup':
      return <RadioInput {...props} />;
    case 'phone-pad':
      return <PhoneInput {...props} />;
    case 'rating':
      return <RatingInput {...props} />;
    case 'datetime':
      return <DateInput {...props} mode="datetime" />;
    case 'time':
      return <DateInput {...props} mode="time" />;
    case 'imagepicker':
      return <ImagePickerInput {...props} />;
    case 'currentLocation':
      return <CurrentLocationInput {...props} />;
    case 'geoPoint':
      return <LocationPointInput {...props} />;

    default:
      return (
        <View style={[styles.inputContainer, containerStyle]}>
          <TextInput
            {...colors.TextInput}
            outlineStyle={styles.textOutline}
            error={!!errorMessage}
            mode={mode}
            theme={textInputTheme}
            right={
              inputType === 'password' ? (
                <TextInput.Icon
                  icon={secureTextEntry ? 'eye' : 'eye-off'}
                  onPress={toggleSecureTextEntry}
                />
              ) : undefined
            }
            keyboardType={
              {
                tel: 'phone-pad',
                number: 'decimal-pad',
              }[inputType] || 'default'
            }
            secureTextEntry={secureTextEntry}
            {...otherProps}
            textColor={textColor}
            activeOutlineColor="#01232D"
            placeholderTextColor={'#fff'}
            style={[
              {
                backgroundColor: colors.white,
                color: colors.text,
                borderWidth: 1,
                borderRadius: 10,
                borderColor: '#D5EAF1',
              },
              inputStyle,
            ]}
          />
          {!!errorMessage && (
            <HelperText type="error" visible={!!errorMessage}>
              {errorMessage}
            </HelperText>
          )}
        </View>
      );
  }
}



const styles = StyleSheet.create({
  textOutline: {
    borderRadius: 10,
  },
  avatarImageContainer: {
    width: width / 3.1,
    height: width / 3.1,
    // margin: 1,
    borderColor: colors.grey,
    borderWidth: 1,
    borderRadius: width / 3.1 / 2,
  },
  uploadImageContainer: {
    width: width / 5,
    height: width / 5,
    margin: 1,
    borderColor: colors.grey,
    borderWidth: 1,
    borderRadius: 10,
  },
  fileOptionsModal: {
    flex: 1,
    marginTop: '30%',
    backgroundColor: 'white',
    padding: 20,
    paddingTop: 35,
    height: '100%',
    justifyContent: 'flex-end',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  dismissModalIconContainer: {
    position: 'absolute',
    right: 10,
    justifyContent: 'flex-end',
    top: 10,
  },
  currentLocationInput: {
    backgroundColor: colors.white,
    marginTop: 10,
    paddingVertical: 4,
  },
  inputContainer: {
    paddingVertical: 5,
    marginHorizontal: 5,
    // backgroundColor: colors.white,
  },
  phoneInputWrapper: {
    paddingVertical: 10,
    paddingHorizontal: 2,
  },
  phoneInput: {
    borderWidth: 0.5,
    flex: 1,
    borderColor: colors.black,
    color: colors.black,
    marginLeft: 2,
    // fontSize: 16,
    fontFamily: 'Montserrat-Regular',
    // height: '100%',
    height: 50,
    borderRadius: 4,
  },
  phoneInputContainer: {
    borderColor: 'transparent',
  },
  flagContainer: {
    borderWidth: 0.5,
    borderColor: colors.black,
    borderRadius: 4,
    paddingVertical: 3,
    height: 50,
  },
  locationText: {fontSize: 14},
  radioButtonsContainer: {
    backgroundColor: colors.backgroundColor,
    marginLeft: -10,
  },
  label: {
    // paddingHorizontal: 10,
    paddingVertical: 10,
    fontSize: 16,
  },
  centerFile: {alignItems: 'center'},
  placeholder: {
    // paddingHorizontal: 10,
    paddingBottom: 6,
    fontSize: 14,
    color: colors.grey,
  },
  caption: {
    // paddingHorizontal: 10,
    paddingBottom: 6,
    fontSize: 14,
    color: 'grey',
  },
  center: {
    alignItems: 'center',
    alignSelf: 'center',
  },
});
