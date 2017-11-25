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
      searchText: '',
      filterCountry: '',
      filterCity: '',
      filterIndustry: '',
      filterUniversity: ''
    };
    this.UserProfilesRef = firebase.database().ref("/UserProfiles");
    this.searchResults = [];
    this.resultKeys = [];
  }

  componentWillMount() {
    if (this.props.navigation.state.params != undefined) {
      const { filterCountry, filterCity, filterIndustry, filterUniversity } = this.props.navigation.state.params;
      this.setState({
        filterCountry: filterCountry,
        filterCity: filterCity,
        filterIndustry: filterIndustry,
        filterUniversity: filterUniversity
      });
    }
  }

  handleChange(UsersRef) {
    this.searchResults = [];
    this.resultKeys = [];
    this.UserProfilesRef.orderByKey().on("child_added", snapshot => {
      name = snapshot.val().firstName.toLowerCase() + ' ' + snapshot.val().lastName.toLowerCase();
      if (this.state.searchText != '' && name.indexOf(this.state.searchText.toLowerCase()) >= 0) {
        if((this.state.filterCountry == '' || snapshot.val().country == this.state.filterCountry) && (this.state.filterCity == '' || snapshot.val().city == this.state.filterCity) && (this.state.filterIndustry == '' || snapshot.val().industry == this.state.filterIndustry) && (this.state.filterUniversity == '' || snapshot.val().university == this.state.filterUniversity)) {
          this.searchResults = [ ...this.searchResults, snapshot.val() ];
          this.resultKeys = [ ...this.resultKeys, snapshot.key];
        }
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
            filter={true}
            onFilterPress={() => {this.props.navigation.navigate('Filters', {
              filterCountry: this.state.filterCountry,
              filterCity: this.state.filterCity,
              filterIndustry: this.state.filterIndustry,
              filterUniversity: this.state.filterUniversity
            })}}
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
