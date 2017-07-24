import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { SearchBar, Card } from 'react-native-elements';

const users = [
 {
    name: 'brynn',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'
 }
];

class Home extends Component {

  render() {
    return (
      <View style={{flex: 1}}>
        <View>
          <SearchBar
            round
            lightTheme
            placeholder="Search"
          />
        </View>
      </View>
    );
  }

}

export default Home;
