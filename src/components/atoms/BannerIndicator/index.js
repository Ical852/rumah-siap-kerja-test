import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { customColors } from '../../../utils'

const BannerIndicator = ({ isIndex }) => {
  return (
    <View className='mr-1.5 rounded-full' style={styles.indicator(isIndex)} />
  )
}

export default BannerIndicator

const styles = StyleSheet.create({
  indicator: (isIndex) => ({
    width: isIndex ? 16 : 8,
    height: 8,
    backgroundColor: isIndex ? customColors.blue1 : customColors.unactive
  })
})