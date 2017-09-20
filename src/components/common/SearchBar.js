import React from 'react';
import { View, TextInput } from 'react-native';
import { Icon } from 'react-native-elements';

const SearchBar = ({ placeholder, searchText, onChangeText, onChange, filter=false, onFilterPress=null }) => {
  const { containerStyle, iconStyle, inputStyle } = styles;
  const filterIcon = (
    <View style={iconStyle}>
      <Icon name="filter" type='font-awesome' size={20} color="#06A0A2" onPress={onFilterPress} />
    </View>
  );
  return (
    <View style={containerStyle}>
      <View style={iconStyle}>
        <Icon name="search" type='font-awesome' size={20} color="#ddd" />
      </View>
      <TextInput
        autoCapitalize="words"
        placeholder={placeholder}
        autoCorrect={false}
        style={inputStyle}
        value={searchText}
        onChangeText={onChangeText}
        onChange={onChange}
      />
      {filter ? filterIcon : null}
    </View>
  );
};

const styles = {
  containerStyle: {
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    margin: 15,
    position: 'relative'
  },
  iconStyle: {
    alignSelf: 'center',
    marginLeft: 15,
    marginRight: 15
  },
  inputStyle: {
    color: '#06A0A2',
    flex: 1,
    fontSize: 16,
    lineHeight: 21,
    paddingTop: 15,
    paddingBottom: 15
  }
};

export { SearchBar };
