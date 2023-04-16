import React from 'react'
import { Image, StyleSheet, TouchableOpacity } from 'react-native'

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