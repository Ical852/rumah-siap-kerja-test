import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Gap, SectionSpacer } from '../../atoms';
import { customColors } from '../../../utils';
import { IcArrow } from '../../../assets';
import { HighlightBanner } from '../../mollecules';

const HighlightSection = ({ data, isLast }) => {
    const { name, description, callToAction, coreProgram } = data;
    const { thumbnailUrl, tags } = coreProgram;

    return (
        <View className={isLast ? '' : 'mb-5'}>
            <View className='mb-5 px-5'>
                <Text className='text-xs text-gray-500 font-medium' style={styles.smalltext}>Pilihan Terbaik Untuk Kamu</Text>
                <Text className='text-black font-bold mt-2'>{name}</Text>
                <Text className='text-black font-light mt-3 text-gray-700' style={styles.smalltext}>{description}</Text>

                <TouchableOpacity className='flex-row items-center mt-5'>
                    <Text className='text-xs font-bold mr-3' style={styles.actiontext}>{callToAction}</Text>
                    <IcArrow />
                </TouchableOpacity>

                <Gap height={16} />

                <HighlightBanner img={thumbnailUrl} tags={tags} />
            </View>
            <SectionSpacer />
        </View>
    )
}

export default HighlightSection

const styles = StyleSheet.create({
    actiontext: {
        color: customColors.blue3
    },
    smalltext: {
        fontSize: 10
    }
})