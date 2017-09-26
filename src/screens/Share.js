import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Button
} from 'react-native';
import {
  Avatar,
  Card
 } from 'react-native-elements';

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
          <View style={{flex: 1, height: 200}}>
            <TextInput
              multiline={true}
              style={{paddingTop: 15, fontSize: 18}}
              placeholder="Share Something"
              numberOfLines={10}
            />
          </View>
        </View>
        <View style={{alignItems: 'flex-start', paddingLeft: 15}}>
          <Button title="Add Image" onPress={() => {console.log('hello')}} />
        </View>
      </ScrollView>
    );
  }

}

export default Share;
