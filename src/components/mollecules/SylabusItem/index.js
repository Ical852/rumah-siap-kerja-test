import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'

import { IcArrowDown, IcArrowUp } from '../../../assets'
import { SubSylabusItem } from '../../atoms'

const SylabusItem = ({ syl, onPress }) => {
  return (
    <>
        <TouchableOpacity
            key={syl.id} 
            className='p-4 border border-gray-500 rounded-md mt-3 flex-row justify-between items-center'
            onPress={onPress}>
            <Text
                numberOfLines={1}
                className='mr-3 flex-1'
                style={{ fontSize: 10 }}>
                {syl.title}
            </Text>
            {syl.open ? <IcArrowUp /> : <IcArrowDown/>}
        </TouchableOpacity>
        {syl.open && (
            syl.subTopic.map((sub) => {
                return (
                    <SubSylabusItem
                        key={sub.id}
                        sub={sub}
                    />
                )
            })
        )}
    </>
  )
}

export default SylabusItem

const styles = StyleSheet.create({})