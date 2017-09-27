import React, { Component } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import { List, ListItem, SearchBar } from '../components/common';
import firebase from 'firebase';

class Messages extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ScrollView>
        <View style={{flex: 1}}>
          <List>
          </List>
        </View>
      </ScrollView>
    );
  }
}

const styles = {
  textStyle: {
    alignSelf: 'center',
    color:'#333',
    fontSize: 16,
    marginLeft: 10
  }
};

export default Messages;
