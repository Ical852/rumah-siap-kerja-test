import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { IcBack, IcShare } from '../../../assets'

const DetailHeader = ({ onBack, onShare }) => {
  return (
    <View className='h-14 bg-white flex-row items-center justify-between px-5' style={styles.container}>
        <TouchableOpacity onPress={onBack}>
            <IcBack />
        </TouchableOpacity>
        <TouchableOpacity onPress={onShare}>
            <IcShare />
        </TouchableOpacity>
    </View>
  )
}

export default DetailHeader

const styles = StyleSheet.create({
    container: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    }
})