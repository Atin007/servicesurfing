import React from 'react';
import { Image } from 'react-native';

const CoverPic = ({ source, window }) => {
  const coverPicStyle =  {
    height: 0.5*window.width,
    width: window.width
  };

  return (
    <Image
      source={require("/Users/mathuratin/Desktop/projects/code-repo/servicesurfing/src/assets/images/antalya.jpg")}
      resizeMode='cover'
      style={coverPicStyle}
    />
  );
};

export { CoverPic };
