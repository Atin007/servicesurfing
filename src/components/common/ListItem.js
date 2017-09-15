import React from 'react';
import { TouchableOpacity, View } from 'react-native';

const ListItem = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress} activeOpacity={0.7}>
      <View style={styles.containerStyle}>
        {props.children}
      </View>
    </TouchableOpacity>
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
