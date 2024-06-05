import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import Screen from '../components/Screen';
import {useTranslation} from '../localization';
import {Button, Divider, HelperText} from 'react-native-paper';
import BorderedContainer from '../components/BorderedContainer';
import {observer} from 'mobx-react-lite';
import {useRootStore} from '../effects';
import SurveyForm from '../components/SurveyForm';
import {colors} from '../theme';
import {requests, url, utils} from '../helpers';
import {useNavigation} from '@react-navigation/native';
import HeaderNotification from '~/components/HeaderNotification';
import {useSelector} from 'react-redux';
import {GlobalMethod} from '../utils/GlobalMethod';
import AppButton from '../components/AppButton'
const AddCustomerScreen = props => {
  // console.log("GLOBAL DATA", GlobalMethod)
  const navigation = useNavigation();
  const [errorMessage] = useState();
  const {t} = useTranslation();
  // const {user} = useRootStore();
  const userResult = useSelector((e: { user: any }) => e.user);

  // console.log(userResult)
  const user = userResult.user;
  const [isLoading, setIsLoading] = useState(true);
  const onSubmit = async formData => {
    // Check if any field in the form data is empty
  const emptyFields = Object.entries(formData).filter(([key, value]) => !value);
  
  // If any field is empty, show error message and return
  if (emptyFields.length > 0) {
    const errorMessage = "Please fill in all fields.";
    console.error(errorMessage);
    utils.toast(errorMessage);
    return;
  }
    setIsLoading(true);
    try {
      console.log('Form Data:', formData);
      const result = await GlobalMethod.externalCommunication(
        '/crm/api/v1/Contact/',
        user.access,
        'POST',
        {
          ...formData,
          business_sector: {name: formData.business_sector},
        },
      );
      console.log('API response:', result);
      // Handle success
      // utils.toast(t('Profile was added successfully'));
    } catch (error) {
      // console.error('Error submitting form data:', error);
      // Handle error
      utils.toast(
        t('Error adding profile'),
        // JSON.stringify(error.message),
      );
    }
    setIsLoading(false);
  };

  return (
    <Screen>
      <HeaderNotification
        title={t('Add Customer')}
        right={
          <Button labelStyle={{color: '#F6B100', fontSize: 14}}>Cancel</Button>
        }
      />
      <BorderedContainer>
        <SurveyForm
          // defaultValues={user}
          onSubmit={onSubmit}
          schema={{
            title: 'Add Customer',
            logoPosition: 'right',
            pages: [
              {
                name: 'page1',
                elements: [
                  {
                    type: 'text',
                    name: 'first_name',
                    title: 'First Name',
                  },
                  {
                    type: 'text',
                    name: 'last_name',
                    title: 'Last Name',
                  },
                  {
                    type: 'text',
                    name: 'email',
                    title: 'Email Address',
                  },
                  {
                    type: 'text',
                    name: 'mobile',
                    title: 'Phone Number',
                  },
                  {
                    type: 'text',
                    name: 'business_name',
                    title: 'Business Name',
                  },
                  {
                    type: 'text',
                    name: 'tin',
                    title: 'TIN',
                  },
                  {
                    type: 'dropdown',
                    name: 'business_sector',
                    title: 'Business Sector',
                    choices: [
                      'Agriculture and Agribusiness',
                      'Automotive and Transportation',
                      'Beauty and Personal Care',
                      'Construction and Real Estate',
                      'Consulting and Professional Services',
                      'Education and E-Learning',
                      'Energy and Utilities',
                      'Entertainment and Media',
                      'Environmental Services',
                      'Fashion and Apparel',
                      'Financial Services',
                      'Food and Beverage',
                      'Healthcare and Pharmaceuticals',
                      'Information Technology and Software',
                      'Manufacturing and Production',
                      'Marketing and Advertising',
                      'Nonprofit and Social Enterprises',
                      'Retail and E-commerce',
                      'Sports and Fitness',
                      'Telecommunications',
                      'Textiles and Garments',
                      'Trade and Export',
                      'Transportation and Logistics',
                      'Other',
                    ],
                  },
                ],
              },
            ],
          }}>
          <ExtraFormData errorMessage={errorMessage} />
        </SurveyForm>
      </BorderedContainer>
    </Screen>
  );
};

const ExtraFormData = props => {
  const {t} = useTranslation();
  const {disabled, onPress, errorMessage, pagesCount, pageIndex} = props;
  return (
    <>
      {errorMessage && <HelperText type="error">{errorMessage}</HelperText>}
      {/* <Divider /> */}
      <AppButton
        disabled={disabled}
        onPress={onPress}
      label= {pagesCount === pageIndex + 1 ? t('Save') : t('Continue')} />
      {/* <Button
        disabled={disabled}
        onPress={onPress}
        style={styles.actionButton}
        mode="contained">
        {pagesCount === pageIndex + 1 ? t('Save') : t('Continue')}
      </Button> */}
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
  },
  flex1: {
    flex: 1,
  },
  logoutButton: {marginTop: 10},
  description: {
    fontWeight: 'bold',
  },
  actionButton: {
    marginTop: 20,
  },
  center: {
    alignSelf: 'center',
  },
  textCannotChangePhone: {
    fontSize: 12,
    paddingTop: 10,
    paddingBottom: 5,
    paddingHorizontal: 6,
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: colors.primary,
    borderWidth: 2,
    alignSelf: 'center',
  },
  avatarContainer: {
    width: 120,
    height: 100,
    alignSelf: 'center',
  },
});

export default observer(AddCustomerScreen);
