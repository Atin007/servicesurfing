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
    this.thumbnails = [
      {
        uri: 'https://firebasestorage.googleapis.com/v0/b/servicesurfing-d6831.appspot.com/o/sample_pics%2Fimage1.jpeg?alt=media&token=55792169-72b9-4e62-b8ad-fd6296c82142'
      },
      {
        uri: 'https://firebasestorage.googleapis.com/v0/b/servicesurfing-d6831.appspot.com/o/sample_pics%2Fimage2.jpeg?alt=media&token=9448948c-6689-4f5b-940b-0f81670ccbcc'
      },
      {
        uri: 'https://firebasestorage.googleapis.com/v0/b/servicesurfing-d6831.appspot.com/o/sample_pics%2Fimage3.jpg?alt=media&token=a341608f-d2fd-4454-9887-4cedafc4b711'
      },
      {
        uri: 'https://firebasestorage.googleapis.com/v0/b/servicesurfing-d6831.appspot.com/o/sample_pics%2Fimage4.jpeg?alt=media&token=02f775e1-0724-4fd5-9724-ce3000c44653'
      },
      {
        uri: 'https://firebasestorage.googleapis.com/v0/b/servicesurfing-d6831.appspot.com/o/sample_pics%2Fimage5.jpeg?alt=media&token=9377e571-a3d6-4750-a731-0a657c093a8c'
      },
      {
        uri: 'https://firebasestorage.googleapis.com/v0/b/servicesurfing-d6831.appspot.com/o/sample_pics%2Fimage6.jpeg?alt=media&token=16b7eea9-35a5-401a-a2d7-adc03b3537dd'
      },
      {
        uri: 'https://firebasestorage.googleapis.com/v0/b/servicesurfing-d6831.appspot.com/o/sample_pics%2Fimage7.jpeg?alt=media&token=0d63dae3-32a0-4bd5-b27a-8f9ecebca0da'
      },
      {
        uri: 'https://firebasestorage.googleapis.com/v0/b/servicesurfing-d6831.appspot.com/o/sample_pics%2Fimage8.jpeg?alt=media&token=26c5d3eb-be8a-4959-b078-004c4520288a'
      }
    ];
    this.gallery = [];
    for(var i=0;i<this.thumbnails.length;i++) {
      this.gallery.push({source: this.thumbnails[i]});
    }

    console.log(this.thumbnails, this.gallery);
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
