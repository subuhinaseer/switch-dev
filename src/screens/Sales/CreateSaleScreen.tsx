import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import HeaderNotification from '~/components/HeaderNotification';
import {useTranslation} from '~/localization';
import CreateSaleSteps from './components/CreateSaleSteps';
import {colors} from '~/theme';
import {observer} from 'mobx-react-lite';
import SurveyForm from '~/components/SurveyForm';
import {Button, HelperText} from 'react-native-paper';
import {requests, setAuthorization, url} from '~/helpers';
import {useRootStore} from '~/effects';
import {getSnapshot} from 'mobx-state-tree';
import createSaleSchema from './createSaleSchema';

const CreateSaleScreen = (props: any) => {
  const {navigation} = props;
  const [errorMessage, setErrorMessage] = useState();
  const [pageIndex, setPageIndex] = useState(0);
  const {t} = useTranslation();
  const {user, login} = useRootStore();

  const onSubmit = async formData => {
    const params = {
      ...formData,
      total_amount: formData._total_amount,
      shipping: 0,
    };

    const {data, originalError} = await requests.post(
      url.inventory.Order,
      params,
      {
        withCredentials: false,
      },
    );
    if (data?.id) {
      setErrorMessage(null);
      login(data);
      navigation.goBack();
    } else {
      if (data?.non_field_errors) {
        setErrorMessage(data.non_field_errors.join('; '));
      } else {
        setErrorMessage(JSON.stringify(data || originalError.message));
      }
    }
    return {success: true};
  };
  return (
    <View style={styles.container}>
      <HeaderNotification title={t('Create Sale')} showCancelButton />
      <CreateSaleSteps currentStep={pageIndex} />
      <View style={styles.formContainer}>
        <SurveyForm
          onSubmit={onSubmit}
          showPageTitle
          defaultValues={getSnapshot(user)}
          onPageChange={async (data, _pageIndex) => {
            const nextPageIndex = _pageIndex + 1;
            setPageIndex(nextPageIndex);
            if (errorMessage) {
              setErrorMessage(null);
            }
            return [nextPageIndex];
          }}
          schema={createSaleSchema}>
          <ExtraFormData
            navigation={navigation}
            errorMessage={errorMessage}
            updatePageIndex={setPageIndex}
          />
        </SurveyForm>
      </View>
    </View>
  );
};

const ExtraFormData = props => {
  const {t} = useTranslation();
  const {
    setPageIndex,
    updatePageIndex,
    disabled,
    onPress,
    errorMessage,
    pagesCount,
    pageIndex,
  } = props;

  useEffect(() => {
    updatePageIndex(pageIndex);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageIndex]);

  const goPrevPage = () => setPageIndex(pageIndex - 1);

  return (
    <>
      {errorMessage && <HelperText type="error">{errorMessage}</HelperText>}
      <View style={[styles.bottomButtons, styles.horizontal]}>
        {pageIndex > 0 && (
          <Button
            disabled={disabled}
            onPress={goPrevPage}
            icon="arrow-left"
            style={styles.backButton}
            mode="text">
            {t('Back')}
          </Button>
        )}
        <Button
          disabled={disabled}
          onPress={onPress}
          style={styles.actionButton}
          mode="contained">
          {pagesCount === pageIndex + 1 ? t('Create Sale') : t('Continue')}
        </Button>
      </View>
    </>
  );
};

export default observer(CreateSaleScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    // paddingHorizontal: 20,
    backgroundColor: colors.backgroundColor,
  },
  bottomButtons: {
    marginTop: 30,
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: colors.white,
  },
  helpText: {
    color: colors.grey,
    paddingTop: 20,
    // textAlign: 'center',
    paddingBottom: 10,
    fontFamily: 'Montserrat-Regular',
  },
  tncText: {
    // color: colors.grey,
    paddingVertical: 20,
    paddingHorizontal: 10,
    // textAlign: 'center',
  },
  horizontal: {
    flexDirection: 'row',
  },
  linkText: {
    color: colors.primary,
  },
  actionButton: {
    // paddingVertical: 6,
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 10,
  },
  backButton: {
    // paddingVertical: 6,
    flex: 0.4,
    marginHorizontal: 5,
  },
});
