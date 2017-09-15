import React from 'react';
import { View, TextInput } from 'react-native';

const SearchBar = ({ placeholder, searchText, onChangeText, onChange }) => {
  const { containerStyle, inputStyle } = styles;
  return (
    <View style={containerStyle}>
      <TextInput
        placeholder={placeholder}
        autoCorrect={false}
        style={inputStyle}
        value={searchText}
        onChangeText={onChangeText}
        onChange={onChange}
      />
    </View>
  );
};

const styles = {
  containerStyle: {
    margin: 15,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: '#ddd',
    borderBottomWidth: 1,
    position: 'relative'
  },
  inputStyle: {
    flex: 1,
    color: '#333',
    padding: 15,
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 16,
    lineHeight: 21
  }
};

export { SearchBar };
