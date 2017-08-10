import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView
} from 'react-native';
import { List, ListItem, SearchBar } from 'react-native-elements';

import { users } from '../config/data';
import { toTitleCase} from '../helpers';

class Friends extends Component {
  onLearnMore = (user) => {
    this.props.navigation.navigate('UserProfile', { ...user });
  };

  render() {
    return (
      <View>
        <View>
          <SearchBar
            lightTheme
            placeholder="Search"
          />
        </View>
        <ScrollView>
          <List containerStyle={{marginTop: 0}}>
            {users.map((user) => (
              <ListItem
                key={user.login.username}
                roundAvatar
                avatar={{ uri: user.picture.thumbnail }}
                title={`${toTitleCase(user.name.first)} ${toTitleCase(user.name.last)}`}
                onPress={() => this.onLearnMore(user)}
              />
            ))}
          </List>
        </ScrollView>
      </View>
    );
  }
}

export default Friends;