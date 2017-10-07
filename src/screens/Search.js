import React, { Component } from 'react';
import { ScrollView, Text, TextInput, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import { List, ListItem, SearchBar } from '../components/common';
import { DEFAULT_DISPLAY_PIC } from '../defaults';
import firebase from 'firebase';

class Search extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchText: ''
    };
    this.UsersRef = firebase.database().ref("/UserProfiles");
    this.searchResults = [];
    this.resultKeys = [];
  }

  handleChange(UsersRef) {
    this.searchResults = [];
    this.resultKeys = [];
    UsersRef.orderByKey().on("child_added", snapshot => {
      name = snapshot.val().firstName + ' ' + snapshot.val().lastName;
      if (this.state.searchText != '' && name.indexOf(this.state.searchText) >= 0) {
        this.searchResults = [ ...this.searchResults, snapshot.val() ];
        this.resultKeys = [ ...this.resultKeys, snapshot.key];
      }
    });
  }

  render() {
    const { textStyle } = styles;
    return (
      <ScrollView>
        <View style={{flex: 1}}>
          <SearchBar
            placeholder="Start typing..."
            searchText={this.state.searchText}
            onChangeText={searchText => this.setState({'searchText': searchText})}
            onChange={this.handleChange(this.UsersRef)}
            // filter={true}
            // onFilterPress={() => {console.log('filter press')}}
          />
          <List>
            {this.searchResults.map((user, i) => (
              <ListItem key={i} onPress={() => this.props.navigation.navigate('UserProfile', {profileID: this.resultKeys[i], title: user.firstName + ' ' + user.lastName})}>
                <Avatar small rounded source={{uri:user.displayPic || DEFAULT_DISPLAY_PIC}} />
                <Text style={textStyle}>{user.firstName} {user.lastName}</Text>
              </ListItem>
            ))}
          </List>
        </View>
      </ScrollView>
    );
  }
}

const styles = {
  textStyle: {
    alignSelf: 'center',
    color:'#333',
    fontSize: 16,
    marginLeft: 10
  }
};

export default Search;
