import React, { Component } from 'react';
import Gallery from 'react-native-image-gallery';

class UserPhotos extends Component {

  render() {
    return (
      <Gallery
        style={{flex: 1, backgroundColor: '#FFF'}}
        images={[
          { source: require('../assets/images/antalya.jpg'), dimensions: { width: 150, height: 150 } },
          { source: require('../assets/images/boat.jpg'), dimensions: { width: 150, height: 150 } },
          { source: require('../assets/images/sandy-boots.jpg'), dimensions: { width: 150, height: 150 } },
          { source: require('../assets/images/fruit-stall.jpg'), dimensions: { width: 150, height: 150 } },
          // { source: { uri: 'http://www.bz55.com/uploads/allimg/150122/139-150122145421.jpg' } }
        ]}
      />
    );
  }

}

export default UserPhotos;
