import React, { Component } from 'react';
import { Dimensions, ScrollView, View } from 'react-native';
import Gallery from 'react-native-image-gallery';
import { ThumbnailImage, TextButton } from '../components/common';
import firebase from 'firebase';

class UserPhotos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      thumbnail: true
    }
    this.thumbnails = [];
    this.gallery = [];
  }

  componentWillMount() {
    this.photo = "https://firebasestorage.googleapis.com/v0/b/servicesurfing-e6cbc.appspot.com/o/antalya.jpg?alt=media&token=6069a6b6-d4e6-4f00-a474-e95a4ab438d5";
    this.thumbnails = [];
    this.gallery = [];
    for(var i=0;i<50;i++) {
      this.thumbnails.push({uri: this.photo});
      this.gallery.push({source: {uri: this.photo}});
    }
  }

  render() {
    if(this.state.thumbnail) {
      return (
        <ScrollView>
          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            {this.thumbnails.map((thumbnail, i) => (
              <ThumbnailImage key={i} source={thumbnail.uri} onPress={() => this.setState({thumbnail: false})}/>
            ))}
            <View style={{backgroundColor:'transparent', height: 80, padding: 5, width: Dimensions.get('window').width/3}}>
              <View style={{borderWidth: 1, borderStyle: 'dashed', flex: 1, justifyContent: 'center'}}>
                <TextButton>+ Add Photo</TextButton>
              </View>
            </View>
          </View>
        </ScrollView>
      );
    } else {
      return (
        <Gallery
          style={{flex: 1, backgroundColor: '#FFF'}}
          images={this.gallery}
          onSingleTapConfirmed={() => this.setState({thumbnail: true})}
          pageMargin={20}
        />
      );
    }
  }

}
export default UserPhotos;
