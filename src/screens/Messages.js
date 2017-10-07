import React, { Component } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import { List, ListItem, SearchBar } from '../components/common';
import { DEFAULT_DISPLAY_PIC } from '../defaults';
import firebase from 'firebase';

class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friendList: [],
      friendListData: []
    }
    this.currentUser = firebase.auth().currentUser;
    this.UserProfilesRef = firebase.database().ref('/UserProfiles');
    this.MessagesRef = firebase.database().ref('/Messages');
    this.FriendList = new Set();
    this.FriendListData = [];
  }

  componentWillMount() {
    this.MessagesRef.on('child_added', (snapshot) => {
      var fromVal = snapshot.val().from;
      var toVal = snapshot.val().to;
      if(this.currentUser.uid == fromVal) {
        if(this.FriendList.has(toVal)) {
          this.FriendList.delete(toVal);
          this.FriendList.add(toVal);
        } else {
          this.FriendList.add(toVal);
        }
        this.setState({friendList: Array.from(this.FriendList)});
      }

      if(this.currentUser.uid == toVal) {
        if(this.FriendList.has(fromVal)) {
          this.FriendList.delete(fromVal);
          this.FriendList.add(fromVal);
        } else {
          this.FriendList.add(fromVal);
        }
        this.setState({friendList: Array.from(this.FriendList)});
      }
      
      this.FriendListData = [];
      for (var id in this.state.friendList) {
        this.UserProfilesRef.child(this.state.friendList[id]).on('value', (snapshot) => {
          var fullName = snapshot.val().firstName + ' ' + snapshot.val().lastName;
          var displayPic = snapshot.val().displayPic || DEFAULT_DISPLAY_PIC;
          this.FriendListData = [...this.FriendListData, {id: snapshot.key, fullName: fullName, displayPic: displayPic}];
          this.setState({friendListData: this.FriendListData});
        });
      }
    });
  }

  render() {
    const { textStyle } = styles;
    return (
      <ScrollView>
        <View style={{flex: 1}}>
          <List>
            {this.state.friendListData.map((user, i) => (
              <ListItem key={i} onPress={() => {this.props.navigation.navigate('ChatView', {title: user.fullName, profileID: user.id})}}>
                <Avatar small rounded source={{uri: user.displayPic}} />
                <Text style={textStyle}>{user.fullName}</Text>
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

export default Messages;
