import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Gap, SectionSpacer } from '../../atoms'
import { ProgramCard } from '../../mollecules';

const HeadersSection = ({ data, isLast }) => {
    const { name, description, headerDetails } = data;

    return (
        <View className={isLast ? '' : 'mb-5'}>
            <View className='mb-5'>
                <Text className='mx-5 text-xs text-black font-bold'>{name}</Text>
                {description && (
                    <Text className='mx-5 text-xs text-gray-500 font-light mt-2'>{description}</Text>
                )}

                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <Gap width={20} />
                    {headerDetails.map((prog, index) => {
                        return <ProgramCard key={index} data={prog} />
                    })}
                </ScrollView>
            </View>
        <SectionSpacer />
        </View>
    )
}

export default HeadersSection

const styles = StyleSheet.create({})