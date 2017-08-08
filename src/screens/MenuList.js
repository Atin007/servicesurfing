import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView
} from 'react-native';
import { List, ListItem } from 'react-native-elements';

import { users, me } from '../config/data';

class MenuList extends Component {
  toMyProfile = (user) => {
    this.props.navigation.navigate('MyProfile', { ...user });
  };

  toPolicy = () => {
    this.props.navigation.navigate('Policy');
  }

  toSignUp = () => {
    this.props.navigation.navigate('SignUp');
  }

  componentWillMount() {
    this.list = [
      {
        title: 'My Profile',
        icon: 'ios-person',
        type: 'ionicon',
        onPress: () => this.toMyProfile(me)
      },
      {
        title: 'My Appointments',
        icon: 'ios-calendar',
        type: 'ionicon',
        onPress: null
      },
      {
        title: 'Help Center',
        icon: 'ios-help-circle',
        type: 'ionicon',
        onPress: null
      },
      {
        title: 'Privacy Policy',
        icon: 'ios-paper',
        type: 'ionicon',
        onPress: () => this.toPolicy()
      },
      {
        title: 'Report a Problem',
        icon: 'ios-bug',
        type: 'ionicon',
        onPress: null
      },
      {
        title: 'About',
        icon: 'ios-information-circle',
        type: 'ionicon',
        onPress: null
      },
      {
        title: 'Logout',
        icon: 'ios-log-out',
        type: 'ionicon',
        onPress: () => this.toSignUp()
      }
    ];
  }

  render() {
    return (
      <ScrollView>
        <List containerStyle={{marginTop: 0}}>
          {this.list.map((item) => (
            <ListItem
              key={item.title}
              title={item.title}
              leftIcon={{name: item.icon, type: item.type, color: '#000'}}
              onPress={item.onPress}
            />
          ))}
        </List>
      </ScrollView>
    );
  }
}

export default MenuList;
