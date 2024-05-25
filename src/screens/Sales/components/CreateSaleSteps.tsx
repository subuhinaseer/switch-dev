import {observer} from 'mobx-react-lite';
import React, {useEffect, useState} from 'react';
import {Image, Text, View, StyleSheet} from 'react-native';
import {useTranslation} from '~/localization';

const CreateSaleSteps = props => {
  const [currentStep, setCurrentStep] = useState(props.currentStep);
  const {t} = useTranslation();

  useEffect(() => {
    setCurrentStep(props.currentStep);
  }, [props.currentStep]);
  const steps = [
    {
      name: t('Customer Detail'),
    },
    {
      name: t('Add Product'),
    },
    {
      name: t('Add Payment'),
    },
  ];
  return (
    <View style={styles.container}>
      {steps.map(({name}, index) => (
        <View key={`${index}-${currentStep}`} style={styles.center}>
          <Image
            source={
              currentStep >= index
                ? require('~/assets/tickIcon.png')
                : require('~/assets/ellipse.png')
            }
            resizeMode="contain"
          />
          <Text
            style={
              currentStep >= index ? styles.selectedText : styles.unselectedText
            }>
            {name}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default observer(CreateSaleSteps);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
  },
  center: {
    alignItems: 'center',
  },
  selectedText: {
    color: '#F6B100',
    fontSize: 12,
    paddingTop: 5,
  },
  unselectedText: {
    fontSize: 12,
    paddingTop: 15,
  },
});
