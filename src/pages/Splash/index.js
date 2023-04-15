import React, { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'

import { IcLogo } from '../../assets'

const SplashPage = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('MainPage')
    }, 2000);
  }, [])

  return (
    <View className='w-full h-full justify-center items-center bg-white'>
      <IcLogo />
    </View>
  )
}

export default SplashPage

const styles = StyleSheet.create({})