import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const ImageBanner = ({ img, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.5}>
      <Image
          className='w-full h-32 rounded-md'
          source={{ uri: img }}
      />
    </TouchableOpacity>
  )
}

export default ImageBanner

const styles = StyleSheet.create({})