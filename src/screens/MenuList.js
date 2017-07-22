import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView
} from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { users } from '../config/data';

const list = [
  {
    title: 'My Profile',
    icon: 'ios-person-outline',
    type: 'ionicon'
  },
  {
    title: 'My Appointments',
    icon: 'ios-calendar-outline',
    type: 'ionicon'
  },
  {
    title: 'Help Center',
    icon: 'ios-help-circle-outline',
    type: 'ionicon'
  },
  {
    title: 'Terms & Policies',
    icon: 'ios-paper-outline',
    type: 'ionicon'
  },
  {
    title: 'Report a Problem',
    icon: 'ios-bug-outline',
    type: 'ionicon'
  },
  {
    title: 'About',
    icon: 'ios-information-circle-outline',
    type: 'ionicon'
  },
  {
    title: 'Logout',
    icon: 'ios-log-out-outline',
    type: 'ionicon'
  }
];

class MenuList extends Component {

  toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  }

  render() {
    return (
      <ScrollView>
        <List containerStyle={{marginTop: 0}}>
          {list.map((item) => (
            <ListItem
              key={item.title}
              // roundAvatar
              // avatar={{ uri: user.picture.thumbnail }}
              title={item.title}
              leftIcon={{name: item.icon, type: item.type}}
              // subtitle={user.email}
              // onPress={() => this.onLearnMore(user)}
            />
          ))}
        </List>
      </ScrollView>
    );
  }
}

export default MenuList;
