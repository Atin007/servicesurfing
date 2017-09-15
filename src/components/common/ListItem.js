import React from 'react';
import { View } from 'react-native';

const ListItem = (props) => {
  return (
    <View style={styles.containerStyle}>
      {props.children}
    </View>
  );
};

const styles = {
  containerStyle: {
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 15
  }
};

export { ListItem };
