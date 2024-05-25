import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';
import {colors} from '../theme';

export default function WebScreen(props) {
  const {
    navigation,
    route: {params},
  } = props;
  const {uri} = params || {};
  useEffect(() => {
    navigation.setOptions({
      title: params.title,
      headerShown: true,
      navigationBarColor: colors.primary,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  return (
    <View style={style.flex1}>
      <WebView
        // setDisplayZoomControls
        source={{uri}}
        onMessage={event => {
          const {data} = event.nativeEvent;
          if (data === 'submitted') {
            navigation.goBack();
          }
        }}
        injectedJavaScriptBeforeContentLoaded={`
                window.isNativeApp = true;
                true; // note: this is required, or you'll sometimes get silent failures
            `}
        startInLoadingState={true}
        // renderLoading={() => <Loading items={[1, 2, 3, 4, 5, 6, 7]} />}
      />
    </View>
  );
}

const style = StyleSheet.create({
  flex1: {
    flex: 1,
    // backgroundColor: 'rgba(253,253,253,0.5)',
  },
});
