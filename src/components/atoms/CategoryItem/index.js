import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const CategoryItem = ({ data, onPress }) => {
    const { color, title, icon } = data;
    return (
        <View className='items-center'>
            <TouchableOpacity
                onPress={onPress}
                className='w-14 h-14 justify-center items-center rounded-full'
                style={styles.container(color)}>
                {icon}
            </TouchableOpacity>
            <Text className='mt-3 font-bold' style={styles.title}>
                {title}
            </Text>
        </View>
    )
}

export default CategoryItem

const styles = StyleSheet.create({
    container: (color) => ({
        backgroundColor: color
    }),
    title: {
        fontSize: 10,
        color: 'gray'
    }
})