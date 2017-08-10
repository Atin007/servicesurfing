import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView
} from 'react-native';
import { List, ListItem, SearchBar } from 'react-native-elements';

class Search extends Component {

  render() {
    return (
      <View>
        <View>
          <SearchBar
            lightTheme
            placeholder="Search"
          />
        </View>
        <ScrollView>
        </ScrollView>
      </View>
    );
  }
}

export default Search;
