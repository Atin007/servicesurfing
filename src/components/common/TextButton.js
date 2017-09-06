import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const TextButton = ({ onPress, children, buttonColor="#333", fontSize=16}) => {
  const { textStyle } = styles;

  const newTextStyle = {
    color: buttonColor,
    fontSize: fontSize
  };

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.5}>
      <Text style={[textStyle, newTextStyle]}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = {
  textStyle: {
    alignSelf: 'center',
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10
  }
};

export { TextButton };
