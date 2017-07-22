import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView
} from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { notifications } from '../config/data';

class NotificationList extends Component {
  // onLearnMore = (user) => {
  //   this.props.navigation.navigate('Details', { ...user });
  // };

  toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

  render() {
    return (
      <ScrollView>
        <List containerStyle={{marginTop: 0}}>
          {notifications.map((notification) => (
            <ListItem
              key={notification.id}
              roundAvatar
              avatar={{ uri: notification.picture.thumbnail }}
              title={`${this.toTitleCase(notification.name.first)} ${this.toTitleCase(notification.name.last)} has sent you ${notification.type}`}
              // subtitle={user.email}
              // onPress={() => this.onLearnMore(user)}
              hideChevron
              titleNumberOfLines={2}
            />
          ))}
        </List>
      </ScrollView>
    );
  }
}

export default NotificationList;
