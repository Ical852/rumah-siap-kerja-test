import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { HighlightTag, NumberFormatter } from '../../atoms';
import { IcStar } from '../../../assets';

const ProgramCard = ({ data, onPress }) => {
    const { thumbnailUrl, tags, coaches, plans } = data;

    const getDiscount = (price, originPrice) => {
        return Math.floor((price / originPrice) * 100);
    }

    const RenderPrice = () => {
        const priceData = plans[0];
        if (priceData.price === 0) {
            return (
                <Text 
                    style={styles.coachtext}
                    className='mx-2 mb-2 text-green-500 font-medium'>
                    Gratis
                </Text>
            )
        }

        if (priceData.originalPrice > priceData.price) {
            return (
                <View>
                    <View className='flex-row items-center mb-0.5'>
                        <View style={styles.contDiscount} className='ml-2 mr-1 justify-center items-center'>
                            <Text style={styles.discount} className='text-red-500 font-bold'>
                                {getDiscount(priceData.price, priceData.originalPrice)}%
                            </Text>
                        </View>
                        <Text 
                            style={styles.originPrice} 
                            className='font-semibold text-gray-500 mx-2 mb-2'>
                            <NumberFormatter number={priceData.originalPrice} />
                        </Text>
                    </View>
                    <Text 
                        style={styles.coachtext} 
                        className='font-semibold text-black mx-2 mb-2'>
                        <NumberFormatter number={priceData.price} />
                    </Text>
                </View>
            )
        }

        return (
            <Text 
                style={styles.coachtext} 
                className='font-semibold text-black mx-2 mb-2'>
                <NumberFormatter number={priceData.price} />
            </Text>
        )
    }

    return (
        <TouchableOpacity
            onPress={onPress}
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

            <Text
                className='text-black font-medium mx-2 mt-2'
                style={styles.coachtext}
                numberOfLines={1}>
                {coaches[0].name}
            </Text>

            <View className='mx-2 mt-2 flex-row items-center'>
                <Image source={{ uri: coaches[0].profileImage }} className='w-6 h-6 rounded-full' />
                <View className='ml-2 flex-1'>
                    <Text style={styles.coachby} className='text-gray-500'>
                        by
                        <Text className='font-bold'> Rumah Siap Kerja</Text>
                    </Text>
                    <Text style={styles.coachby} className='text-gray-500' numberOfLines={1}>
                        {coaches.map((data) => {
                            return data.name
                        })}
                    </Text>
                </View>
            </View>

            <View className='mx-2 flex-row items-center mt-1'>
                <IcStar />
                <Text style={styles.coachby} className='text-gray-500 ml-0.5'>Terbaru</Text>
            </View>
            
            <View className='flex-1' />

            <RenderPrice />
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
    },
    coachtext: {
        fontSize: 8,
    },
    coachby: {
        fontSize: 7
    },
    originPrice: {
        fontSize: 7,
        textDecorationLine: 'line-through',
        marginBottom: 0,
        marginLeft: 0
    },
    discount: {
        fontSize: 7,
        marginRight: 2,
    },
    contDiscount: {
        padding: 2,
        backgroundColor: '#F6ECEF',
        borderRadius: 3
    }
})