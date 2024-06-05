import { View, Text } from 'react-native'
import React from 'react'
import { Button, IconButton } from 'react-native-paper';
import { colors } from '../theme';
import { useNavigation } from '@react-navigation/native';

const AddProductHeader=({title})=> {
  const navigation = useNavigation()
  return (
    <View
    style={{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: colors.background,
      paddingVertical:10,
      paddingTop:30
      // marginTop: 40
    }}>
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <IconButton
        icon={require('../assets/backArrowButton.png')}
        iconColor="#F6B100"
        size={19}
        onPress={() => {
          navigation.goBack();
        }}
      />
      <Text style={{ color: '#F6B100' }}>{title}</Text>
    </View>
    <Button labelStyle={{ color: '#F6B100', fontSize: 14 }}>Cancel</Button>
  </View>
  )
}
export default AddProductHeader