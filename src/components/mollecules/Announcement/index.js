import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { customColors } from '../../../utils'

const Announcement = ({ desc, onPress }) => {
  return (
    <View 
      className='h-14 flex-row items-center px-4'
      style={styles.container}>
      <Text
        className="flex-1 text-xs font-normal text-black mr-5"
        numberOfLines={2}>
        {desc}
      </Text>
      <TouchableOpacity className='p-2.5 rounded-md' style={styles.btn} onPress={onPress}>
        <Text className="text-xs text-white font-bold">Daftar Sekarang</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Announcement

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EAF5FD',

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.00,

    elevation: 1,
  },
  btn: {
    backgroundColor: customColors.blue1
  }
})