import React, { Component } from 'react';
import {
  Dimensions,
  ScrollView,
  View,
  Text,
  TouchableHighlight
} from 'react-native';
import {
  Card,
  Avatar,
  Button
 } from 'react-native-elements';

import Posts from '../components/Posts';
import { me } from '../config/data';

class Home extends Component {
  toUpdate = () => {
    this.props.navigation.navigate('Share');
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View>
          <Card>
            <View style={{flexDirection: 'row'}}>
              <Avatar
                small
                source={{uri: me.picture.large}}
              />
              <View style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <TouchableHighlight
                  underlayColor='#FFF'
                  onPress={() => this.toUpdate()}
                  >
                  <Text style={{fontSize: 16}}>Share something with your friends!</Text>
                </TouchableHighlight>
              </View>
            </View>
          </Card>
          <View style={{padding: 15}}>
            <Text style={{color: '#86939e', fontSize: 16}}>POSTS</Text>
          </View>
        </View>
        <ScrollView>
          <Posts />
        </ScrollView>
      </View>
    );
  }
}

export default Home;
