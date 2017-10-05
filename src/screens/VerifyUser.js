import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { TextButton } from '../components/common';
import firebase from 'firebase';

class VerifyUser extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { textStyle } = styles;
    return (
      <View style={{flex: 1}}>
        <Text style={textStyle}>Please verify your email address!</Text>
        <TextButton onPress={() => firebase.auth().signOut()}>If you have already verified, press here</TextButton>
      </View>
    );
  }
}

const styles = {
  textStyle: {
    alignSelf: 'center',
    color:'#000',
    fontSize: 20,
    margin: 15
  }
};

export default VerifyUser;
