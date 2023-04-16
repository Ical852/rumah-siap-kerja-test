import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { customColors } from '../../../utils'

const HighlightTag = ({ title }) => {
  return (
    <View className='p-1 mr-1 mt-1' style={styles.container}>
      <Text className='text-white font-bold' style={styles.text}>{title}</Text>
    </View>
  )
}

export default HighlightTag

const styles = StyleSheet.create({
  container: {
    backgroundColor: customColors.gray1,
    borderRadius: 3
  },
  text: {
    fontSize: 4
  }
})