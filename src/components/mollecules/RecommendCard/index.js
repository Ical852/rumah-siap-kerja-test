import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { NumberFormatter } from '../../atoms';

const RecommendCard = ({ data, onPress }) => {
    const { thumbnailUrl, title, host, plans } = data;

    const getDiscount = (price, originPrice) => {
        return Math.floor((price / originPrice) * 100);
    }
    const RenderPrice = () => {
        const priceData = plans[0];
        if (priceData.price === 0) {
            return (
                <Text 
                    style={styles.coachtext}
                    className='text-green-500 font-medium'>
                    Gratis
                </Text>
            )
        }

        if (priceData.originalPrice > priceData.price) {
            return (
                <View>
                    <View className='flex-row items-center mb-0.5'>
                        <View style={styles.contDiscount} className='mr-1 justify-center items-center'>
                            <Text style={styles.discount} className='text-red-500 font-bold'>
                                {getDiscount(priceData.price, priceData.originalPrice)}%
                            </Text>
                        </View>
                        <Text 
                            style={styles.originPrice} 
                            className='font-semibold text-gray-500'>
                            <NumberFormatter number={priceData.originalPrice} />
                        </Text>
                    </View>
                    <Text 
                        style={styles.coachtext} 
                        className='font-semibold text-black'>
                        <NumberFormatter number={priceData.price} />
                    </Text>
                </View>
            )
        }

        return (
            <Text 
                style={styles.coachtext} 
                className='font-semibold text-black'>
                <NumberFormatter number={priceData.price} />
            </Text>
        )
    }

    return (
        <TouchableOpacity
            activeOpacity={0.5}
            onPress={onPress}
            className='h-52 w-36 border border-gray-300 rounded-md bg-white mr-3'>
            <Image source={{ uri: thumbnailUrl }} className='w-full h-2/5 rounded-t-md' />
            <View className='p-2 flex-1'>
                <Text
                    numberOfLines={2}
                    className='text-black font-medium'
                    style={styles.title}>
                    {title}
                </Text>
                <Text
                    style={styles.by}
                    className='text-gray-500 mt-1'
                    numberOfLines={1}
                >by {host?.fullName ?? ''}
                </Text>
                <Text
                    style={styles.by}
                    className='text-gray-500'
                    numberOfLines={1}
                >{host?.description ?? ''}
                </Text>
                <View className='flex-1' />
                <RenderPrice />
            </View>
        </TouchableOpacity>
    )
}

export default RecommendCard

const styles = StyleSheet.create({
    title: {
        fontSize: 10,
    },
    by: {
        fontSize: 8
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