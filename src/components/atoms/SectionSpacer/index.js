import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const SectionSpacer = () => {
  return (
    <View className='w-full bg-gray-100' style={styles.container}/>
  )
}

export default SectionSpacer

const styles = StyleSheet.create({
    container: {
        height: 10,
    }
})