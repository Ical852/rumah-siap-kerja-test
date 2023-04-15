import React from 'react'
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import {
  IcActivity,
  IcActivityActive,
  IcCertificate,
  IcCertificateActive,
  IcHome,
  IcHomeActive,
  IcTransaction,
  IcTransactionActive
} from '../../../assets'
import { customColors } from '../../../utils'

const Icon = ({title, isIndex}) => {
  if (title === 'Beranda') {
    return isIndex ? <IcHomeActive/> : <IcHome/>
  } else if(title === 'Transaksi') {
    return isIndex ? <IcTransactionActive/> : <IcTransaction/>
  } else if(title === 'Aktivitas') {
    return isIndex ? <IcActivityActive/> : <IcActivity/>
  } else if (title === 'Sertifikat') {
    return isIndex ? <IcCertificateActive/> : <IcCertificate/>
  } else {
      return <IcHome/>
  }
}

const textColor = (isFocused) => {
  return isFocused ? customColors.primary : customColors.unactive;
}

const textWeight = (isFocused) => {
  return isFocused ? 'font-bold' : 'font-light';
}

const BottomNavigator = ({state, descriptors, navigation}) => {
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({name: route.name, merge: true});
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity className='items-center' onPress={onPress} key={index}>
            <Icon title={label} isIndex={isFocused}/>
            <Text 
              className={`mt-1 ${textWeight(isFocused)} text-xs`}
              style={styles.title(textColor(isFocused))}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default BottomNavigator

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingTop : 10,
    paddingBottom : Platform.OS === 'ios' ? 30 : 10,
    backgroundColor : 'white',

    shadowColor: customColors.unactive,
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  title: (color) => ({
    color: color
  })
})