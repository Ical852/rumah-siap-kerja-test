import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NumericFormat } from 'react-number-format'

const NumberFormatter = ({ number }) => {
  return (
    <NumericFormat
        value={number}
        thousandSeparator=','
        prefix={'Rp '}
        renderText={(value) => <Text>{value.replaceAll(',', '.')}</Text>}
        displayType="text"
    />
  )
}

export default NumberFormatter

const styles = StyleSheet.create({})