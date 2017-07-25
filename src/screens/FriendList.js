import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView
} from 'react-native';
import { List, ListItem, SearchBar } from 'react-native-elements';
import { users } from '../config/data';

class FriendList extends Component {
  // onLearnMore = (user) => {
  //   this.props.navigation.navigate('Details', { ...user });
  // };

  toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View>
          <SearchBar
            lightTheme
            placeholder="Search Friends"
          />
        </View>
        <ScrollView>
          <List containerStyle={{marginTop: 0}}>
            {users.map((user) => (
              <ListItem
                key={user.login.username}
                roundAvatar
                avatar={{ uri: user.picture.thumbnail }}
                title={`${this.toTitleCase(user.name.first)} ${this.toTitleCase(user.name.last)}`}
                // subtitle={user.email}
                // onPress={() => this.onLearnMore(user)}
              />
            ))}
          </List>
        </ScrollView>
      </View>
    );
  }
}

export default FriendList;
