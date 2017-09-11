import React from 'react';
import { Text, View} from 'react-native';

const CardTitle = ({ label }) => {
  const { labelStyle, containerStyle } = styles;

  return (
    <View style={containerStyle}>
      <Text style={labelStyle}>{label}</Text>
    </View>
  );
};

const styles = {
  labelStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingLeft: 20,
    paddingRight: 20,
    flex: 1
  },
  containerStyle: {
    height: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  }
};

export { CardTitle };
