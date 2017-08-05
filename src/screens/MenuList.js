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
    this.props.navigation.navigate('UserProfile', { ...user });
  };

  componentWillMount() {
    this.list = [
      {
        title: 'My Profile',
        icon: 'ios-person-outline',
        type: 'ionicon',
        onPress: () => this.toMyProfile(me)
      },
      {
        title: 'My Appointments',
        icon: 'ios-calendar-outline',
        type: 'ionicon',
        onPress: null
      },
      {
        title: 'Help Center',
        icon: 'ios-help-circle-outline',
        type: 'ionicon',
        onPress: null
      },
      {
        title: 'Terms & Policies',
        icon: 'ios-paper-outline',
        type: 'ionicon',
        onPress: null
      },
      {
        title: 'Report a Problem',
        icon: 'ios-bug-outline',
        type: 'ionicon',
        onPress: null
      },
      {
        title: 'About',
        icon: 'ios-information-circle-outline',
        type: 'ionicon',
        onPress: null
      },
      {
        title: 'Logout',
        icon: 'ios-log-out-outline',
        type: 'ionicon',
        onPress: null
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
              leftIcon={{name: item.icon, type: item.type}}
              onPress={item.onPress}
            />
          ))}
        </List>
      </ScrollView>
    );
  }
}

export default MenuList;
