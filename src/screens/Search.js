import React, { Component } from 'react';
import { ScrollView, Text, TextInput, View } from 'react-native';
import { SearchBar } from '../components/common';
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
          <View style={{backgroundColor: '#FFF'}}>
            {this.searchResults.map((user, i) => (
              <View key={i} style={{flexDirection: 'row', padding: 5, borderBottomWidth: 1, justifyContent: 'flex-start', borderColor: '#ddd'}}>
                <Text>{user.firstName} {user.lastName}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = {

};

export default Search;
