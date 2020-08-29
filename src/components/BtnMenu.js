import React from 'react'
import { TouchableOpacity, Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

const BtnMenu = (props) => {
  const { icon, iconSize, iconColor, text, textStyle, ...restProps } = props

  return (
    <TouchableOpacity activeOpacity={0.8} {...restProps}>
      <Icon name={icon} size={iconSize} color={iconColor} />
      <View style={{ justifyContent: 'center', flex: 1 }}>
        <Text style={textStyle}>{text}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default BtnMenu