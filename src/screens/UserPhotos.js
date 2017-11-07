import React, { Component } from 'react';
import { Dimensions, ScrollView, View } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Gallery from 'react-native-image-gallery';
import { ThumbnailImage, TextButton } from '../components/common';
import firebase from 'firebase';

class UserPhotos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      thumbnail: true,
      thumbnails: [],
      gallery: [],
      profileID: null
    };
    this.currentUser = firebase.auth().currentUser;
    this.UserPhotosRef = firebase.database().ref('/UserPhotos');
    this.thumbnails = [];
    this.gallery = [];
  }

  componentWillMount() {
    const { profileID } = this.props.navigation.state.params;
    this.setState({
      profileID: profileID
    });

    this.UserPhotosRef.child(profileID).on('child_added', snapshot => {
      this.thumbnails = [ ...this.thumbnails, snapshot.val() ];
      this.setState({
        thumbnails: this.thumbnails
      });
    });

    this.gallery = [];
    for(var i=0;i<this.thumbnails.length;i++) {
      this.gallery.push({source: this.thumbnails[i]});
      this.setState({
        gallery: this.gallery
      });
    }
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
        this.props.navigation.navigate('Share', {imagePath: response.uri});
      }
    });
  }

  renderAddButton() {
    if(this.currentUser.uid == this.state.profileID) {
      return (
        <View style={{backgroundColor:'transparent', height: 80, padding: 5, width: Dimensions.get('window').width/3}}>
          <View style={{borderWidth: 1, borderStyle: 'dashed', flex: 1, justifyContent: 'center'}}>
            <TextButton onPress={() => this.addPicture()}>+ Add Photo</TextButton>
          </View>
        </View>
      );
    } else {
      return null;
    }
  }

  render() {
    if(this.state.thumbnail) {
      return (
        <ScrollView>
          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            {this.state.thumbnails.map((thumbnail, i) => (
              <ThumbnailImage key={i} source={thumbnail.uri} onPress={() => this.setState({thumbnail: false})}/>
            ))}
            {this.renderAddButton()}
          </View>
        </ScrollView>
      );
    } else {
      return (
        <Gallery
          style={{flex: 1, backgroundColor: '#FFF'}}
          images={this.state.gallery}
          onSingleTapConfirmed={() => this.setState({thumbnail: true})}
          pageMargin={20}
        />
      );
    }
  }

}
export default UserPhotos;
