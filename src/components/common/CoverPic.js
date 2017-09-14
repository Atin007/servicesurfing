import React from 'react';
import { Image, View } from 'react-native';

const CoverPic = ({ source, window }) => {
  const coverPicStyle =  {
    height: 0.5*window.width,
    width: window.width
  };

  return (
    <View style={{backgroundColor: '#ddd'}}>
      <Image
        source={{uri: source}}
        resizeMode='cover'
        style={coverPicStyle}
      />
    </View>
  );
};

export { CoverPic };
