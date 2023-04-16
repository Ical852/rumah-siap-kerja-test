import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { customColors } from '../../../utils'

const CategoryFilterItem = ({ title, active, onPress }) => {
  return (
    <TouchableOpacity 
        onPress={onPress}
        className={`border p-2 rounded-md mr-3 ${active ? '' : 'opacity-70'}`}
        style={styles.container(active)}>
        <Text className={`${active ? 'font-bold' : ''}`} style={styles.text(active)}>{title}</Text>
    </TouchableOpacity>
  )
}

export default CategoryFilterItem

const styles = StyleSheet.create({
    text: (active) => ({
        fontSize: 10,
        color: active ? customColors.blue3 : customColors.gray1
    }),
    container: (active) => ({
        borderColor: active ? customColors.blue3 : customColors.gray1
    })
})