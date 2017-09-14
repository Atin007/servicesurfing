import React from 'react';
import { Image, View } from 'react-native';

const DisplayPic = ({ source, window }) => {
  const displayPicStyle =  {
    height: window.width/4,
    width: window.width/4,
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2
  };

  return (
    <View style={{backgroundColor: '#ddd'}}>
      <Image
        source={{uri: source}}
        resizeMode='cover'
        style={displayPicStyle}
      />
    </View>
  );
};

export { DisplayPic };
