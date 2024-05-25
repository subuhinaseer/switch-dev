import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import Screen from '../../components/Screen';
import Header from '../../components/Header';
import {useTranslation} from '../../localization';
import {Button, Divider, HelperText, Text} from 'react-native-paper';
import BorderedContainer from '../../components/BorderedContainer';
import {observer} from 'mobx-react-lite';
import {useRootStore} from '../../effects';
import SurveyForm from '../../components/SurveyForm';
import {colors} from '../../theme';
import {requests, url, utils} from '../../helpers';
import Loading from '../../components/Loading';
import {useNavigation} from '@react-navigation/native';

const ProfileScreen = props => {
  const navigation = useNavigation();
  const [errorMessage] = useState();
  const {t} = useTranslation();
  const {user} = useRootStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchProfile = async () => {
    const {data} = await requests.get(url.user);
    if (data?.id) {
      user.update(data);
    }
    setIsLoading(false);
  };

  const onSubmit = async formData => {
    setIsLoading(true);
    await requests.patch(
      url.getItemURL('common.Profile', {id: user.profile_id}),
      formData,
    );
    const {full_name} = formData;
    const [first_name, last_name] = full_name.split(' ');
    const {data, ok, originalError} = await requests.patch(
      url.getItemURL('common.User', user),
      {...formData, first_name, last_name},
    );

    if (ok) {
      utils.toast(t('Profile was updated successfully'));
      user.update(data);
      setIsLoading(false);
      return {success: true};
    } else {
      utils.toast(
        t('Error updating profile'),
        JSON.stringify(data || originalError.message),
      );
      return {success: false};
    }
  };

  return (
    <Screen>
      <Header onGoBack={navigation.goBack} title={t('Profile')} hideBranding />
      <BorderedContainer>
        {isLoading ? (
          <Loading />
        ) : (
          <SurveyForm
            defaultValues={user}
            onSubmit={onSubmit}
            schema={{
              title: 'User profile',
              description: 'Profile change form',
              logoPosition: 'right',
              pages: [
                {
                  name: 'page2',
                  elements: [
                    {
                      type: 'file',
                      isAvatar: true,
                      name: 'avatar',
                      placeholder: 'Add Profile Photo',
                      isRequired: true,
                      uploadURL:
                        url.BASE_URL +
                        url.getItemURL('common.Profile', {
                          id: user.profile_id,
                        }),
                      uploadMethod: 'patch',
                      fileFieldName: 'avatar',
                    },
                    {
                      type: 'text',
                      name: 'full_name',
                      title: 'Full Name',
                      placeholder: 'First and last name',
                      isRequired: true,
                    },
                    {
                      type: 'text',
                      name: 'business_name',
                      title: 'Business Name',
                      placeholder: 'The name of the business',
                      isRequired: true,
                    },
                    {
                      type: 'text',
                      name: 'email',
                      title: 'Email',
                      inputType: 'email',
                      placeholder: 'Email (optional)',
                      isRequired: false,
                    },
                    {
                      type: 'text',
                      name: 'username',
                      title: '',
                      inputType: 'tel',
                      // mode: 'flat',
                      // placeholder: 'Phone number cannot be changed',
                      isRequired: true,
                      editable: false,
                    },
                  ],
                },
              ],
            }}>
            <ExtraFormData errorMessage={errorMessage} />
          </SurveyForm>
        )}
      </BorderedContainer>
    </Screen>
  );
};

const ExtraFormData = props => {
  const {t} = useTranslation();
  const logout = () => {
    utils.logout();
  };
  const {disabled, onPress, errorMessage, pagesCount, pageIndex} = props;
  return (
    <>
      {errorMessage && <HelperText type="error">{errorMessage}</HelperText>}
      <Divider />
      <Button
        disabled={disabled}
        onPress={onPress}
        style={styles.actionButton}
        mode="contained">
        {pagesCount === pageIndex + 1 ? t('Done') : t('Continue')}
      </Button>

      <Button
        onPress={logout}
        textColor={colors.danger}
        style={styles.logoutButton}
        icon={'logout'}>
        {t('Logout')}
      </Button>
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

export default observer(ProfileScreen);
