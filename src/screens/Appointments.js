import React, { Component } from 'react';
import { Text, ScrollView, View } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import Swiper from 'react-native-swiper';
import { users } from '../config/data';

class Appointments extends Component {

  render() {
    return (
      <Swiper showButtons={true}>
        <ScrollView style={{flex: 1, backgroundColor: '#FFF'}}>
          <Text style={{alignSelf: 'center', padding: 10, fontWeight: 'bold'}}>Appointment Requests Received</Text>
          {users.map((user, i) => (
            <ListItem
              key={user.login.username}
              roundAvatar
              avatar={{ uri: user.picture.thumbnail }}
              title={`${toTitleCase(user.name.first)} ${toTitleCase(user.name.last)}`}
              subtitle={user.registered}
              onPress={() => console.log('hello')}
            />
          ))}
        </ScrollView>
        <ScrollView style={{flex: 1, backgroundColor: '#FFF'}}>
          <Text style={{alignSelf: 'center', padding: 10, fontWeight: 'bold'}}>Appointment Requests Sent</Text>
          {users.map((user, i) => (
            <ListItem
              key={user.login.username}
              roundAvatar
              avatar={{ uri: user.picture.thumbnail }}
              title={`${toTitleCase(user.name.first)} ${toTitleCase(user.name.last)}`}
              subtitle={user.registered}
              onPress={() => console.log('hello')}
            />
          ))}
        </ScrollView>
      </Swiper>
    );
  }

}

export default Appointments;
