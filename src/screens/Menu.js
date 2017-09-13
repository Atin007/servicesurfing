import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView
} from 'react-native';
import firebase from 'firebase';
import { List, ListItem } from 'react-native-elements';

import { users, me } from '../config/data';

class Menu extends Component {

  componentWillMount() {

    const { currentUser } = firebase.auth();
    this.list = [
      {
        title: 'View Profile',
        icon: 'ios-contact',
        type: 'ionicon',
        onPress: () => this.props.navigation.navigate('UserProfile', {profileID: currentUser.uid})
      },
      {
        title: 'Friends',
        icon: 'ios-contacts',
        type: 'ionicon',
        onPress: () => this.props.navigation.navigate('Friends', {...me})
      },
      {
        title: 'Appointments',
        icon: 'ios-calendar',
        type: 'ionicon',
        onPress: () => this.props.navigation.navigate('Appointments', {...me})
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
        onPress: () => this.props.navigation.navigate('PrivacyPolicy')
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
        onPress: () => firebase.auth().signOut()
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

export default Menu;
