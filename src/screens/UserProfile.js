import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Image,
  Text,
  Dimensions,
  StyleSheet,
  TouchableHighlight,
  Button
 } from 'react-native';
import {
  Icon,
  Divider,
  ButtonGroup,
  Card,
  Avatar
} from 'react-native-elements';

import Posts from '../components/Posts';
import { posts, me } from '../config/data';
import { toTitleCase } from '../helpers';
const window = Dimensions.get("window");

class UserProfile extends Component {

  toFriends = (user) => {
    this.props.navigation.navigate('Friends', {...user});
  }

  editText(edit) {
    if (edit.edit) {
      return (
        <TouchableHighlight style={{paddingBottom: 15}}>
          <Text style={{padding: 5, fontSize: 12, color: '#1563A0'}}>Edit Profile</Text>
        </TouchableHighlight>
      );
    }

    return null;
  }

  render() {
    const buttons = ['ABOUT', 'FRIENDS', 'PHOTOS'];
    const user = this.props.navigation.state.params;
    const edit = this.props.navigation.state.params;

    return (
      <ScrollView>
        <View
          style={
            {
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
            <Text style={{padding: 20, paddingBottom: (edit.edit ? 0 : 20), color: '#000', fontSize: 18}}>
              {toTitleCase(user.name.first)} {toTitleCase(user.name.last)}
            </Text>
            {this.editText(edit)}
            <View
              style={{
                borderTopWidth: StyleSheet.hairlineWidth,
                borderBottomWidth: StyleSheet.hairlineWidth,
                borderColor: '#8B9DC3',
                flexDirection: 'row'
              }}>
              <Icon
                name='ios-calendar'
                type='ionicon'
                color='#86939e'
                onPress={() => console.log('hello')}
                size={30}
                containerStyle={{
                  paddingLeft: 25,
                  paddingRight: 25
                }} />
              <Icon
                name='ios-person-add'
                type='ionicon'
                color='#86939e'
                onPress={() => console.log('hello')}
                size={35}
                containerStyle={{
                  paddingLeft: 25,
                  paddingRight: 25
                }} />
              <Icon
                name='ios-mail'
                type='ionicon'
                color='#86939e'
                onPress={() => console.log('hello')}
                size={39}
                containerStyle={{
                  paddingLeft: 25,
                  paddingRight: 25
                }} />
              <Icon
                name='md-more'
                type='ionicon'
                color='#86939e'
                onPress={() => console.log('hello')}
                size={31}
                containerStyle={{
                  paddingLeft: 25,
                  paddingRight: 25
                }} />
            </View>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            paddingLeft: 30,
            paddingRight: 30,
            backgroundColor: '#FFF'
          }}>
          <View style={{flexDirection: 'row'}}>
            <Icon name='md-briefcase' type='ionicon' size={18} />
            <Text style={{padding: 10, margin: 5}}>
              Works at New York Dental Clinic
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Icon name='md-school' type='ionicon' size={18} />
            <Text style={{padding: 10, margin: 5}}>
              Studied at Princeton University
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Icon name='md-pin' type='ionicon' size={18} />
            <Text style={{padding: 10, margin: 5}}>
              Lives in New York
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Icon name='md-thumbs-up' type='ionicon' size={18} />
            <Text style={{padding: 10, margin: 5}}>
              Satisfaction score of 95
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Icon name='md-stats' type='ionicon' size={18} />
            <Text style={{padding: 10, margin: 5}}>
              Phd (h-index: 10)
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Icon name='md-cash' type='ionicon' size={18} />
            <Text style={{padding: 10, margin: 5}}>
              25 USD/hr
            </Text>
          </View>
        </View>
        <View style={{
          flex: 1,
          marginTop: 10,
          flexDirection: 'row',
          backgroundColor: '#FFF',
          justifyContent: 'center'
        }}>
          <View style={{paddingLeft: 30, paddingRight: 30, paddingTop: 10, paddingBottom: 10}}>
            <TouchableHighlight underlayColor='#FFF' onPress={null}>
              <Text>ABOUT</Text>
            </TouchableHighlight>
          </View>
          <View style={{paddingLeft: 30, paddingRight: 30, paddingTop: 10, paddingBottom: 10}}>
            <TouchableHighlight underlayColor='#FFF' onPress={null}>
              <Text>PHOTOS</Text>
            </TouchableHighlight>
          </View>
          <View style={{paddingLeft: 30, paddingRight: 30, paddingTop: 10, paddingBottom: 10}}>
            <TouchableHighlight underlayColor='#FFF' onPress={() => this.toFriends(user)}>
              <Text>FRIENDS</Text>
            </TouchableHighlight>
          </View>
        </View>
        <View style={{padding: 15, paddingBottom: 0}}>
          <Text style={{color: '#86939e', fontSize: 16}}>POSTS</Text>
        </View>
        <Posts />
      </ScrollView>
    );
  }

}
export default UserProfile;
