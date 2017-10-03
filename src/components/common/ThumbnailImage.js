import React, { Component } from 'react';
import { Dimensions, Image, TouchableOpacity, View } from 'react-native';
const WIDTH = Dimensions.get('window').width;

const ThumbnailImage = ({ source, onPress }) => {
  const { containerStyle, imageStyle } = styles;
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={containerStyle}>
        <Image source={{uri: source}} resizeMode='cover' style={imageStyle} />
      </View>
    </TouchableOpacity>
  );
}

const styles = {
  containerStyle: {
    backgroundColor: 'transparent',
    height: 80,
    width: WIDTH/3
  },
  imageStyle: {
    height: 80,
    left: 0,
    position: 'absolute',
    top: 0,
    width: WIDTH/3,
  }
}

export { ThumbnailImage };
