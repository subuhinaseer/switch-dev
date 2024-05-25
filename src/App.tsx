/**
 * SmartDuka Mobile App
 * Developed by Paschal Giki
 * Copyright (c) SwitchAfrica Inc
 * @format
 */
import React, {useCallback, useEffect, useMemo} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StyleSheet, useColorScheme, Linking} from 'react-native';
import {PaperProvider, adaptNavigationTheme} from 'react-native-paper';
import Toast from 'react-native-toast-message';
import {CustomLightTheme, CustomDarkTheme} from './theme/rn-paper';
import {AppNavigator} from './navigators';
// import {useProvider} from 'mobx-store-provider';
// import RootStore, {rootStore} from './stores/rootStore';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import merge from 'deepmerge';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import RNBootSplash from 'react-native-bootsplash';
import {storage} from './helpers/storage';
import {localStorageKey} from './stores';
import {utils} from './helpers';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './redux/store/store'; // Assuming your store setup is in ./store

const onNavigationStateChange = data => {
  storage.set(localStorageKey.navigationState, data);
};

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  // const StoreProvider = useProvider(RootStore);
  const {LightTheme, DarkTheme} = adaptNavigationTheme({
    reactNavigationLight: NavigationDefaultTheme,
    reactNavigationDark: NavigationDarkTheme,
  });
  const CombinedDefaultTheme = useMemo(
    () => merge(LightTheme, CustomLightTheme),
    [LightTheme],
  );
  const CombinedDarkTheme = useMemo(
    () => merge(DarkTheme, CustomDarkTheme),
    [DarkTheme],
  );

  const linking = {
    prefixes: ['smartduka://'],
  };
  const onReady = useCallback(() => {
    RNBootSplash.hide({fade: true}); // fade with 220ms default duration
  }, []);

  const initialNavigationState = useMemo(() => {
    const state = storage.get(localStorageKey.navigationState);
    if (state) {
      return state;
    }
    return undefined;
  }, []);

  const onInitialURL = initialURL => {
    const queryParams = utils.parseURL(initialURL);
    __DEV__ &&
      console.log(`Linked to app with data: ${JSON.stringify(queryParams)}`);
  };

  useEffect(() => {
    Linking.getInitialURL().then(initialURL => {
      if (initialURL) {
        onInitialURL(initialURL);
      }
    });
    Linking.addEventListener('url', ({url}) => {
      onInitialURL(url);
    });
  }, []);
  return (
    <GestureHandlerRootView style={styles.flex1}>
      {/* <StoreProvider value={rootStore}> */}
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <PaperProvider
            theme={isDarkMode ? CombinedDarkTheme : CombinedDefaultTheme}>
            <BottomSheetModalProvider>
              <NavigationContainer
                linking={linking}
                // fallback={<Loading />}
                onReady={onReady}
                initialState={initialNavigationState}
                onStateChange={onNavigationStateChange}>
                <SafeAreaProvider>
                  <AppNavigator />
                  <Toast />
                </SafeAreaProvider>
              </NavigationContainer>
            </BottomSheetModalProvider>
          </PaperProvider>
        </PersistGate>
      </Provider>
      {/* </StoreProvider> */}
    </GestureHandlerRootView>
  );
  // return(<TransactionDetail/>)
}

const styles = StyleSheet.create({
  flex1: {flex: 1},
});

export default App;
