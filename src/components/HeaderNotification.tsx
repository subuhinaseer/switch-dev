import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Text, View} from 'react-native';
import {Button, IconButton} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors} from '~/theme';

export default function HeaderNotification(props: any) {
  const navigation = useNavigation();
  const {title, right, showCancelButton = true} = props;
  return (
    <View style={{backgroundColor: colors.primary}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: 10,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <IconButton
            icon={require('../assets/backArrowButton.png')}
            iconColor="#F6B100"
            size={19}
            onPress={() => {
              navigation.goBack();
            }}
          />
          <Text style={{color: colors.secondary, fontSize: 14}}>{title}</Text>
        </View>
        <View>
          {right ? (
            right
          ) : showCancelButton ? (
            <Button textColor={colors.secondary}>Cancel</Button>
          ) : (
            <IconButton
              icon={require('../assets/bellIcon.png')}
              iconColor={colors.secondary}
              size={21}
            />
          )}
        </View>
      </View>
    </View>
  );
}
