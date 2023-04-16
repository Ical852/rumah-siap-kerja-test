import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const SubSylabusItem = ({ sub }) => {
  return (
    <View 
        key={sub.id} 
        className='ml-4 p-4 border border-gray-500 rounded-md mt-3 flex-row justify-between items-center'>
        <Text 
            numberOfLines={1}
            className='mr-3 flex-1'
            style={{ fontSize: 10 }}>
            {sub.title}
        </Text>
        <Text style={{ fontSize: 10 }} numberOfLines={1}>{sub.duration} Menit</Text>
    </View>
  )
}

export default SubSylabusItem

const styles = StyleSheet.create({})