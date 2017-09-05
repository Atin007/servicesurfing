import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const Button = ({ onPress, children, buttonColor}) => {
  const { buttonStyle, textStyle } = styles;
  const newStyle = {
    backgroundColor: buttonColor==undefined ? '#007AFF' : buttonColor,
    borderColor: buttonColor==undefined || buttonColor =='#FFF' ? '#999999' : buttonColor
  };
  const newTextStyle = {
    color: buttonColor=='#FFF' ? '#000' : '#FFF'
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
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10
  },
  buttonStyle: {
    flex: 1,
    backgroundColor: '#007AFF',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#007AFF',
    marginLeft: 15,
    marginRight: 15,
    marginTop: 15
  }
};

export { Button };
