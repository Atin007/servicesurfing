import React, { Component } from 'react';
import { ScrollView, Text, TextInput, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import { List, ListItem, SearchBar } from '../components/common';
import { DEFAULT_DISPLAY_PIC } from '../defaults';
import firebase from 'firebase';

class Likes extends Component {
  constructor(props) {
    super(props);
    this.state = {Likes: []};
    this.Likes = [];
  }

  componentWillMount() {
    const { postKey } = this.props.navigation.state.params;
    this.UserProfilesRef = firebase.database().ref('/UserProfiles');
    this.PostsRef = firebase.database().ref(`/Posts/${postKey}`);
    this.PostsRef.child('postLikes').on('value', snapshot => {
      var dict = snapshot.val();
      for(var key in dict) {
        if(parseInt(dict[key]['like']) == 1) {
          this.UserProfilesRef.child(key).on('value', snapshot => {
            var data = {
              userID: key,
              displayPic: snapshot.val().displayPic || DEFAULT_DISPLAY_PIC,
              userName: snapshot.val().firstName + ' ' + snapshot.val().lastName
            }
            this.Likes = [...this.Likes, data];
            this.setState({Likes: this.Likes});
          });
        }
      }
    });
  }

  render() {
    const { textStyle } = styles;
    return(
      <ScrollView>
        <View style={{flex: 1}}>
          <List>
            {this.state.Likes.map((user, i) => (
              <ListItem key={i} onPress={() => this.props.navigation.navigate('UserProfile', {profileID: user.userID, title: user.userName})}>
              <Avatar small rounded source={{uri:user.displayPic }} />
              <Text style={textStyle}>{user.userName}</Text>
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

export default Likes;
