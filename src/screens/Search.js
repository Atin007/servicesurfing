import React, { Component } from 'react';
import { ScrollView, Text, TextInput, View } from 'react-native';
import { List, ListItem, SearchBar } from '../components/common';
import firebase from 'firebase';

class Search extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchText: ''
    };
    this.UsersRef = firebase.database().ref("/UserProfile");
    this.searchResults = [];
  }

  handleChange(UsersRef) {
    this.searchResults = [];
    UsersRef.orderByKey().on("child_added", (data) => {
      name = data.val().firstName;
      if (this.state.searchText != '' && name.indexOf(this.state.searchText) >= 0) {
        this.searchResults = [ ...this.searchResults, data.val() ];
      }
    });
  }

  render() {

    return (
      <ScrollView>
        <View style={{flex: 1}}>
          <SearchBar
            placeholder="Start typing..."
            searchText={this.state.searchText}
            onChangeText={searchText => this.setState({'searchText': searchText})}
            onChange={this.handleChange(this.UsersRef)}
          />
          <List>
            {this.searchResults.map((user, i) => (
              <ListItem key={i}>
                <Text>{user.firstName} {user.lastName}</Text>
              </ListItem>
            ))}
          </List>
        </View>
      </ScrollView>
    );
  }
}

export default Search;
