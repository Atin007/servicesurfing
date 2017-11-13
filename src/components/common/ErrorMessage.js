import React from 'react';
import { View, Text } from 'react-native';

const ErrorMessage = (props) => {
  return (
    <View style={styles.containerStyle}>
      <Text style={{color: '#06A0A2'}}>{props.children}</Text>
    </View>
  );
};

const styles = {
  containerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15
  }
};

export { ErrorMessage };
