import React, { Component } from 'react';
import { View, ScrollView, Image, Text, Dimensions, StyleSheet } from 'react-native';
import { Icon, Divider } from 'react-native-elements';

import { toTitleCase } from '../helpers';
const window = Dimensions.get("window");

class UserProfile extends Component {

  render() {
    const user = this.props.navigation.state.params;
    return (
      <ScrollView>
        <View
          style={
            {
              flex: 1,
              backgroundColor: '#FFF',
              alignItems: 'center'
            }
          }>
          <Image
            source={require('../assets/images/antalya.jpg')}
            resizeMode='cover'
            style={{height: 0.5*window.width, width: window.width}}
          />
          <View
            style={{
              transform: [
                {
                  translateY: -window.width/16
                }
              ],
              alignItems: 'center'
            }}>
            <Image
              source={{uri: user.picture.large}}
              resizeMode='cover'
              style={{
                height: window.width/4,
                width: window.width/4,
                paddingBottom: 0,
                borderColor: '#FFF',
                borderWidth: 2
              }}
            />
            <Text style={{padding:5, color: '#000', fontSize: 15}}>
              {toTitleCase(user.name.first)} {toTitleCase(user.name.last)}
            </Text>
            <View
              style={{
                  margin: 10,
                  paddingLeft: 10,
                  paddingRight: 10,
                  flexDirection: 'row',
              }}>
              <Icon
                name='ios-calendar'
                type='ionicon'
                color='#7F7F7F'
                onPress={() => console.log('hello')}
                size={35}
                containerStyle={{
                  paddingTop: 10,
                  paddingBottom: 10,
                  paddingLeft: 30,
                  paddingRight: 30
                }} />
              <Icon
                name='ios-person-add'
                type='ionicon'
                color='#7F7F7F'
                onPress={() => console.log('hello')}
                size={40}
                containerStyle={{
                  paddingTop: 10,
                  paddingBottom: 10,
                  paddingLeft: 30,
                  paddingRight: 30
                }} />
              <Icon
                name='ios-mail'
                type='ionicon'
                color='#7F7F7F'
                onPress={() => console.log('hello')}
                size={44}
                containerStyle={{
                  paddingTop: 10,
                  paddingBottom: 10,
                  paddingLeft: 30,
                  paddingRight: 30
                }} />
              <Icon
                name='md-more'
                type='ionicon'
                color='#7F7F7F'
                onPress={() => console.log('hello')}
                size={38}
                containerStyle={{
                  paddingTop: 10,
                  paddingBottom: 10,
                  paddingLeft: 30,
                  paddingRight: 30
                }} />
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }

}
export default UserProfile;
