import React, { Component } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import { List, ListItem, SearchBar } from '../components/common';
import { DEFAULT_DISPLAY_PIC } from '../defaults';
import firebase from 'firebase';

class Friends extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: [],
      friendKeys: [],
      pendingRequests: [],
      pendingKeys: []
    };
    this.currentUser = firebase.auth().currentUser;
    this.UserProfilesRef = firebase.database().ref('/UserProfiles');
    this.FriendsRef = firebase.database().ref('/Friends');
    this.pendingRequests = [];
    this.pendingKeys = [];
    this.friends = [];
    this.friendKeys = [];
    this.searchResults = [];
    this.resultKeys = [];
  }

  componentWillMount() {
    const { profileID } = this.props.navigation.state.params;

    this.FriendsRef.child(profileID).on("child_added", snapshot => {
      var key = snapshot.val().userID;
      var dataKey = snapshot.key;
      if(snapshot.val().status != 'pending') {
        this.UserProfilesRef.child(key).on('value', snapshot => {
          this.friends = [ ...this.friends, { ...snapshot.val(), key: dataKey } ];
          this.friendKeys = [ ...this.friendKeys, key ];
          this.setState({friends: this.friends, friendKeys: this.friendKeys});
        });
      } else {
        if(this.currentUser.uid == profileID && snapshot.val().to == this.currentUser.uid) {
          this.UserProfilesRef.child(key).on('value', snapshot => {
            this.pendingRequests = [ ...this.pendingRequests, { ...snapshot.val(), key: dataKey } ];
            this.pendingKeys = [ ...this.pendingKeys, key ];
            this.setState({pendingRequests: this.pendingRequests, pendingKeys: this.pendingKeys});
          });
        }
      }
    });
  }

  btnPress(action, data, user2) {
    if(action == 'Accept') {
      var updates = {};
      updates[this.currentUser.uid + '/' + data.key + '/status'] = 'accepted';
      updates[user2 + '/' + data.key + '/status'] = 'accepted';
      this.FriendsRef.update(updates)
        .then(() => {
          this.props.navigation.navigate('Home');
        });
    } else if (action == 'Decline') {
        var updates = {};
        updates[this.currentUser.uid + '/' + data.key] = null;
        updates[user2 + '/' + data.key] = null;
        this.FriendsRef.update(updates)
        .then(() => {
          this.props.navigation.navigate('Home');
        });
    }
  }

  render() {
      const { acceptBtn, declineBtn, textStyle } = styles;

      return (
        <ScrollView>
          <View style={{flex: 1}}>
            <List>
              {this.state.pendingRequests.map((user, i) => (
                <ListItem key={i} onPress={() => this.props.navigation.navigate('UserProfile', {profileID: this.state.pendingKeys[i], title: user.firstName + ' ' + user.lastName})}>
                  <Avatar small rounded source={{uri:user.displayPic || DEFAULT_DISPLAY_PIC}} />
                  <View style={{flexDirection: 'column'}}>
                    <Text style={textStyle}>{user.firstName} {user.lastName}</Text>
                    <View style={{flexDirection: 'row'}}>
                      <TouchableOpacity onPress={() => this.btnPress('Accept', user, this.state.pendingKeys[i] )} activeOpacity={0.5}>
                        <Text style={acceptBtn}>Accept</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => this.btnPress('Decline', user, this.state.pendingKeys[i] )} activeOpacity={0.5}>
                        <Text style={declineBtn}>Decline</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </ListItem>
              ))}
            </List>
            <List>
              {this.state.friends.map((user, i) => (
                <ListItem key={i} onPress={() => this.props.navigation.navigate('UserProfile', {profileID: this.state.friendKeys[i], title: user.firstName + ' ' + user.lastName})}>
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
    color:'#333',
    fontSize: 16,
    marginLeft: 10
  },
  acceptBtn: {
    color: '#BB2A2F',
    fontSize: 16,
    fontStyle: 'normal',
    marginTop: 5,
    marginLeft: 10
  },
  declineBtn: {
    color: '#21A85E',
    fontSize: 16,
    fontStyle: 'normal',
    marginTop: 5,
    marginLeft: 10
  }
};

export default Friends;
