import React from 'react'
import { StyleSheet, View } from 'react-native'

import { HighlightTag, ImageBanner } from '../../atoms'

const HighlightBanner = ({ img, tags }) => {
  return (
    <View>
        <ImageBanner img={img} />
        <View className='absolute bottom-2 left-2 flex-row items-center'>
            {tags.map((data, index) => {
                return <HighlightTag title={data.name} key={index} />;
            })}
            
        </View>
    </View>
  )
}

export default HighlightBanner

const styles = StyleSheet.create({})