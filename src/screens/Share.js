import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput
} from 'react-native';
import {
  Avatar,
  Card,
  Button
 } from 'react-native-elements';

import { me } from '../config/data';

// Convert a string to TitleCase
import { toTitleCase } from '../helpers';

class Share extends Component {

  render() {
    return (
      <ScrollView style={{backgroundColor: '#FFF'}}>
        <View style={{padding: 20}}>
          <View style={{flexDirection: 'row'}}>
            <Avatar
              medium
              source={{uri: me.picture.large}}
            />
            <Text style={{fontSize: 18, paddingLeft: 10}}>
              {toTitleCase(me.name.first)} {toTitleCase(me.name.last)}
            </Text>
          </View>
          <TextInput
            multiline={true}
            style={{paddingTop: 15, fontSize: 18}}
            placeholder="Share Something"
            numberOfLines={10}
          />
        </View>
      </ScrollView>
    );
  }

}

export default Share;
