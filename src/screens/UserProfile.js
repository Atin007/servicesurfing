import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Image,
  Text,
  Dimensions,
  StyleSheet,
  TouchableHighlight
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

  render() {
    const buttons = ['ABOUT', 'FRIENDS', 'PHOTOS'];
    const user = this.props.navigation.state.params;
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
            <Text style={{padding:20, color: '#000', fontSize: 18}}>
              {toTitleCase(user.name.first)} {toTitleCase(user.name.last)}
            </Text>
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
                color='#397af8'
                onPress={() => console.log('hello')}
                size={35}
                containerStyle={{
                  paddingLeft: 25,
                  paddingRight: 25
                }} />
              <Icon
                name='ios-person-add'
                type='ionicon'
                color='#397af8'
                onPress={() => console.log('hello')}
                size={40}
                containerStyle={{
                  paddingLeft: 25,
                  paddingRight: 25
                }} />
              <Icon
                name='ios-mail'
                type='ionicon'
                color='#397af8'
                onPress={() => console.log('hello')}
                size={44}
                containerStyle={{
                  paddingLeft: 25,
                  paddingRight: 25
                }} />
              <Icon
                name='md-more'
                type='ionicon'
                color='#397af8'
                onPress={() => console.log('hello')}
                size={36}
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
            // borderBottomWidth: 1,
            // borderColor: '#8B9DC3'
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
          // marginBottom: 10,
          flexDirection: 'row',
          backgroundColor: '#FFF',
          justifyContent: 'center'
        }}>
          <TouchableHighlight underlayColor='#FFF' onPress={null}>
            <View style={{paddingLeft: 25, paddingRight: 25, paddingTop: 10, paddingBottom: 10}}>
              <Text>ABOUT</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight underlayColor='#FFF' onPress={null}>
            <View style={{paddingLeft: 25, paddingRight: 25, paddingTop: 10, paddingBottom: 10}}>
              <Text>FRIENDS</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight underlayColor='#FFF' onPress={null}>
            <View style={{paddingLeft: 25, paddingRight: 25, paddingTop: 10, paddingBottom: 10}}>
              <Text>PHOTOS</Text>
            </View>
          </TouchableHighlight>
        </View>
        <Posts />
      </ScrollView>
    );
  }

}
export default UserProfile;
