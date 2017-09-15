import React from 'react';
import { View } from 'react-native';

const List = (props) => {
  return (
    <View style={styles.containerStyle}>
      {props.children}
    </View>
  );
};

const styles = {
  containerStyle: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderBottomWidth: 0
  }
};

export { List };
