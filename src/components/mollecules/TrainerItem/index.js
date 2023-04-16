import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'

const TrainerItem = ({ trainer }) => {
  return (
    <View className='flex-row items-center mt-3'>
        <Image source={{ uri: trainer.profileImage }} className='w-10 h-10 rounded-full' />
        <Text className='text-xs font-bold text-black ml-3'>{trainer.fullName}</Text>
    </View>
  )
}

export default TrainerItem

const styles = StyleSheet.create({})