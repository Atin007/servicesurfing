import React, { Component } from 'react';
import { Platform, ScrollView, Text, TextInput, View } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob';
import { Button, Spinner } from '../components/common';
import { DEFAULT_DISPLAY_PIC, NO_IMAGE_PIC } from '../defaults';
import { Avatar, Icon } from 'react-native-elements';
import firebase from 'firebase';

class Share extends Component {

  constructor(props) {
    super(props);
    this.state = {
      post: '',
      imagePath: '',
      loading: null
    };
    this.currentUser = firebase.auth().currentUser;
    this.PostsRef = firebase.database().ref('/Posts');
    this.UserStorageRef = firebase.storage().ref(`/user_photos/${this.currentUser.uid}`);
    this.UserPhotosRef = firebase.database().ref(`/UserPhotos/${this.currentUser.uid}`);
  }

  componentWillMount() {
    const { imagePath } = this.props.navigation.state.params;
    this.setState({imagePath: imagePath});
  }

  onButtonPress() {
    this.setState({loading: true});
    var options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    var timestamp = new Date().toLocaleString('en-US', options);
    var timeMS = new Date().getTime();
    if (this.state.imagePath == '') {
      this.PostsRef.push({
        postText: this.state.post,
        imageURL: this.state.imagePath,
        userID: this.currentUser.uid,
        timestamp: timestamp,
        timeMS: -1 * timeMS
      }).then(() => this.props.navigation.navigate('UserProfile', {profileID: this.currentUser.uid, title: this.currentUser.displayName}));
    } else {
      this.uploadPicture(this.state.imagePath, `photo_${new Date().getTime()}.jpg`);
    }
  }

  uploadPicture(uri, imageName) {
    const mime = 'image/jpg';
    const Blob = RNFetchBlob.polyfill.Blob;
    const fs = RNFetchBlob.fs;
    window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
    window.Blob = Blob;

    const uploadURI = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    let uploadBlob = null;
    const imageRef = this.UserStorageRef.child(imageName);

    fs.readFile(uploadURI, 'base64')
    .then((data) => {
      return Blob.build(data, { type: `${mime};BASE64` });
    })
    .then((blob) => {
      uploadBlob = blob;
      return imageRef.put(blob, { contentType: mime });
    })
    .then((uploadTask) => {
      uploadBlob.close();
      var options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
      var timestamp = new Date().toLocaleString('en-US', options);
      var timeMS = new Date().getTime();
      this.UserPhotosRef.push({
        uri: uploadTask.downloadURL
      });
      this.PostsRef.push({
        postText: this.state.post,
        imageURL: uploadTask.downloadURL,
        userID: this.currentUser.uid,
        timestamp: timestamp,
        timeMS: -1 * timeMS
      }).then(() => this.props.navigation.navigate('UserProfile', {profileID: this.currentUser.uid, title: this.currentUser.displayName}));
      return uploadTask.downloadURL;
    });
  }

  addPicture() {
    const cam_options = {
      mediaType: 'photo',
      quality: 0.1,
      noData: true,
    };
    ImagePicker.showImagePicker(cam_options, (response) => {
      if (response.didCancel) {
      }
      else if (response.error) {
      }
      else {
        this.setState({imagePath: response.uri});
      }
    });
  }

  renderButton() {
    if (this.state.loading) {
      return <Spinner size="large" />;
    }

    return (
      <View>
        <Button onPress={() => this.onButtonPress()}>Post</Button>
        <Button onPress={() => this.addPicture()}>Add Photo</Button>
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
    paddingTop: 20,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 10
  }
}

export default Share;
