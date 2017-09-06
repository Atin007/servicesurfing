import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const Button = ({ onPress, children, buttonColor='#06A0A2', borderColor='#333', textColor='#333', fontSize=16}) => {
  const { buttonStyle, textStyle } = styles;
  const newStyle = {
    backgroundColor: buttonColor,
    borderWidth: buttonColor=='#FFF' ? 1 : 0,
    borderColor: borderColor
  };
  const newTextStyle = {
    color: buttonColor!='#FFF' ? '#FFF' : textColor,
    fontSize: fontSize
  };

  return (
    <View style={[ buttonStyle, newStyle ]}>
      <TouchableOpacity onPress={onPress} activeOpacity={0.5}>
        <Text style={[textStyle, newTextStyle]}>
          {children}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  textStyle: {
    alignSelf: 'center',
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10
  },
  buttonStyle: {
    flex: 1,
    borderRadius: 5,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 15
  }
};

export { Button };
