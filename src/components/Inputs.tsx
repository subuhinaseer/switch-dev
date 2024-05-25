import React from 'react';
import {StyleSheet} from 'react-native';
import {TextInput, Text} from 'react-native-paper';
import {useState} from 'react';

type TextBoxProps = {
  placeholder: string;
};
const UnsecuredTextBox = (props: TextBoxProps) => {
  const [value, setValue] = React.useState(props.value);
  // const {onTextChange, placeholder, disabled} = props;

  const handleTextChange = (text: string) => {
    setValue(text);
    if (props.onTextChange) {
      props.onTextChange(text);
    }
  };

  const onChangeEt = (text: string) => {
    setValue(text);
    if (props.onTextChange) {
      props.onTextChange(text);
    }
  };

  return (
    <TextInput
      style={styles.textContainer}
      mode="outlined"
      label={<Text style={{color: '#D5EAF1'}}>{props.placeholder}</Text>}
      secureTextEntry={false}
      outlineColor="#D5EAF1"
      textColor="#D5EAF1"
      activeOutlineColor="#D5EAF1"
      placeholderTextColor="#D5EAF1"
      outlineStyle={styles.outline}
      value={value}
      // editable={!disabled}
      onChangeText={handleTextChange}
      onChange={onChangeEt}
      theme={{
        colors: {
          primary: '#D5EAF1',
          placeholder: '#D5EAF1',
          text: '#D5EAF1',
          secondary: '#D5EAF1',
        },
      }}
      contentStyle={{color: '#D5EAF1'}}
    />
  );
};
export {UnsecuredTextBox};

type SecuredTextBoxProps = {
  placeholder: string;
};
const SecuredTextBox = (props: SecuredTextBoxProps) => {
  return (
    <TextInput
      style={styles.passwordContainer}
      mode="outlined"
      label={props.placeholder}
      secureTextEntry={true}
      outlineColor="#D5EAF1"
      textColor="#D5EAF1"
      activeOutlineColor="#D5EAF1"
      placeholderTextColor={'#D5EAF1'}
      outlineStyle={styles.outline}
    />
  );
};
export {SecuredTextBox};

const styles = StyleSheet.create({
  textContainer: {
    backgroundColor: '#012E3C',
    marginHorizontal: 20,
    marginVertical: 10,
    color: '#D5EAF1',
  },
  passwordContainer: {
    backgroundColor: '#01232D',
    margin: 20,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 30,
  },
  outline: {
    borderRadius: 10,
  },
});
