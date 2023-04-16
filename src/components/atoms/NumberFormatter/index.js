import React from 'react'
import { StyleSheet, Text } from 'react-native'
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