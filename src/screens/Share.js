import React, { Component } from 'react';
import { ScrollView, Text, TextInput, View } from 'react-native';
import { Button, Spinner } from '../components/common';
import { DEFAULT_DISPLAY_PIC, NO_IMAGE_PIC } from '../defaults';
import { Avatar, Icon } from 'react-native-elements';
import firebase from 'firebase';

class Share extends Component {

  constructor(props) {
    super(props);
    this.state = {
      post: '',
      imagePath: ''
    };
    this.currentUser = firebase.auth().currentUser;
    this.PostsRef = firebase.database().ref('/Posts');
  }

  componentWillMount() {
    const { imagePath } = this.props.navigation.state.params;
    this.setState({imagePath: imagePath});
  }

  onButtonPress() {
    var options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    var timestamp = new Date().toLocaleString('en-US', options);
    var timeMS = new Date().getTime();
    this.PostsRef.push({
      postText: this.state.post,
      imageURL: '',
      userID: this.currentUser.uid,
      userName: this.currentUser.displayName,
      userPic: this.currentUser.photoURL || '',
      timestamp: timestamp,
      timeMS: -1 * timeMS
    }).then(() => this.props.navigation.navigate('UserProfile', {profileID: this.currentUser.uid, title: this.currentUser.displayName}));
  }

  renderButton() {
    if (this.state.loading) {
      return <Spinner size="large" />;
    }

    return (
      <View>
        <Button onPress={() => this.onButtonPress()}>Post</Button>
        <Button>Add Photo</Button>
      </View>
    );
  }


  render() {
    const { containerStyle, textStyle, inputContainerStyle, imageContainer } = styles;
    return (
      <View style={{flex: 1}}>
        <View style={containerStyle}>
          <View style={{flexDirection: 'row'}}>
            <Avatar
              small
              source={{uri: this.currentUser.photoURL || DEFAULT_DISPLAY_PIC}}
            />
            <Text style={textStyle}>{this.currentUser.displayName}</Text>
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
        {this.renderButton()}
        <View style={imageContainer}>
          <Avatar
            large
            source={{uri: this.state.imagePath || NO_IMAGE_PIC}}
          />
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
  },
  imageContainer: {
    padding: 20,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 10
  }
}

export default Share;
