import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Gap, SectionSpacer } from '../../atoms'
import { ProgramCard } from '../../mollecules';
import { IcArrow } from '../../../assets';
import { customColors } from '../../../utils';

const HeadersSection = ({ data, isLast }) => {
    const { name, description, headerDetails } = data;

    return (
        <View className={isLast ? '' : 'mb-5'}>
            <View className='mb-5'>
                <Text className='mx-5 text-xs text-black font-bold'>{name}</Text>
                {description && (
                    <Text className='mx-5 text-gray-500 font-light mt-1' style={styles.desc}>{description}</Text>
                )}

                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <Gap width={20} />
                    {headerDetails.map((prog, index) => {
                        return <ProgramCard key={index} data={prog} onPress={() => {}} />
                    })}
                </ScrollView>

                <TouchableOpacity
                    style={styles.btn}
                    className='mx-5 flex-row justify-center items-center border py-2 rounded-md'>
                    <Text className='text-xs font-bold mr-2' style={styles.btntext}>Lihat Semua</Text>
                    <IcArrow />
                </TouchableOpacity>
            </View>
        <SectionSpacer />
        </View>
    )
}

export default HeadersSection

const styles = StyleSheet.create({
    btntext: {
        color: customColors.blue3,
    },
    btn: {
        borderColor: customColors.blue3
    },
    desc: {
        fontSize: 10
    }
})