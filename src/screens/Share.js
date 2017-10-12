import React, { Component } from 'react';
import { ScrollView, Text, TextInput, View } from 'react-native';
import { Button, Spinner } from '../components/common';
import { DEFAULT_DISPLAY_PIC } from '../defaults';
import { Avatar, Icon } from 'react-native-elements';
import firebase from 'firebase';

class Share extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: null,
      post: ''
    };
    this.currentUser = firebase.auth().currentUser;
    this.UserProfilesRef = firebase.database().ref('/UserProfiles');
    this.PostsRef = firebase.database().ref('/Posts');
  }

  componentWillMount() {
    this.UserProfilesRef.child(this.currentUser.uid).on('value', snapshot => {
      this.setState({user: snapshot.val()});
    });
  }

  onButtonPress() {
    var options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    var timestamp = new Date().toLocaleString('en-US', options);

    this.PostsRef.child(this.currentUser.uid).push({
      postText: this.state.post,
      imageURL: '',
      userID: this.currentUser.uid,
      userName: this.currentUser.displayName,
      userPic: this.currentUser.photoURL || '',
      timestamp: timestamp
    }).then(() => this.props.navigation.navigate('UserProfile', {profileID: this.currentUser.uid, title: this.currentUser.displayName}));
  }

  renderButton() {
    if (this.state.loading) {
      return <Spinner size="large" />;
    }

    return (
      <Button onPress={() => this.onButtonPress()}>Post</Button>
    );
  }


  render() {
    const { containerStyle, textStyle, inputContainerStyle } = styles;
    return (
      <View style={{flex: 1}}>
      <View style={containerStyle}>
        <View style={{flexDirection: 'row'}}>
          <Avatar
            small
            source={{uri: this.state.user.displayPic || DEFAULT_DISPLAY_PIC}}
          />
          <Text style={textStyle}>
            {this.state.user.firstName + ' ' + this.state.user.lastName}
          </Text>
        </View>
        <View style={inputContainerStyle}>
          <TextInput
            multiline={true}
            style={{paddingTop: 15, fontSize: 16}}
            placeholder="Share Something"
            value={this.state.post}
            onChangeText={post => this.setState({ post })}
          />
        </View>
      </View>
      <View style={{flexDirection: 'row'}}>
        {this.renderButton()}
      </View>
      </View>
    );
  }

}

const styles ={
  containerStyle: {
    backgroundColor: '#FFF',
    padding: 20,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 10
  },
  textStyle: {
    color: '#333',
    fontSize: 16,
    paddingLeft: 10
  },
  inputContainerStyle: {
    minHeight: 120,
    maxHeight: 240
  }
}

export default Share;
