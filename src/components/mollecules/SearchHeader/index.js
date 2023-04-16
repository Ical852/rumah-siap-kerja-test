import React from 'react'
import { Platform, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'

import { IcBar, IcSearch } from '../../../assets'

const SearchHeader = ({ value, onChangeText, onPress }) => {
  return (
    <View className='h-16 flex-row items-center px-4 bg-white' style={styles.container}>
        <View 
            className={`flex-1 flex-row border border-gray-300 ${Platform.OS === 'android' ? '' : 'py-2.5'} px-3 rounded-md items-center mr-4`}>
            <IcSearch />
            <TextInput
                className='flex-1 ml-3 text-xs'
                placeholder='Cari program sekarang'
                value={value}
                onChangeText={onChangeText}
            />
        </View>
        <TouchableOpacity onPress={onPress}>
            <IcBar />
        </TouchableOpacity>
    </View>
  )
}

export default SearchHeader

const styles = StyleSheet.create({
    container: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    }
})