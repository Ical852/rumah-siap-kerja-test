import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { HighlightTag } from '../../atoms';

const ProgramCard = ({ data }) => {
    const { thumbnailUrl, tags } = data;
    return (
        <TouchableOpacity
            className='bg-white h-56 w-48 my-5 rounded-md mr-3'
            style={styles.container}
            activeOpacity={0.5}>
            <View className='h-1/2 w-full'>
                <Image source={{ uri: thumbnailUrl }} className='w-full h-full rounded-t-md' />
                <View className='absolute flex-row bottom-1 left-1 flex-wrap'>
                    {tags.map((tag, index) => {
                        return <HighlightTag key={index} title={tag} />
                    })}
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default ProgramCard

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