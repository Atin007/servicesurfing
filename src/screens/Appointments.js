import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Swiper from 'react-native-swiper';

class Appointments extends Component {

  render() {
    return (
      <Swiper showButtons={true}>
        <View style={{flex: 1}}>
          <Text>From</Text>
        </View>
        <View style={{flex: 1}}>
          <Text>To</Text>
        </View>
      </Swiper>
    );
  }

}

export default Appointments;
