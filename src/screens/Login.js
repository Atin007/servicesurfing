import React, { Component } from 'react';
import { Dimensions, Image, ScrollView, Text, View } from 'react-native';
import { Button, TextButton } from '../components/common';
import firebase from 'firebase';
const window = Dimensions.get("window");

class Login extends Component {

  render() {
    const { headerStyle, textStyle, textContainer } = styles;
    return (
      <View>
        <View style={headerStyle}>
          <Image
            source={require('../assets/images/servicesurfing.png')}
            resizeMode='cover'
            style={{
              height: window.width/4,
              width: window.width/4,
              marginTop: 30,
              borderRadius: 15
            }}
          />
          <View style={textContainer}>
            <Text style={textStyle}>Hire Professionals around the world</Text>
            <Text style={textStyle}>Share articles, videos and images</Text>
            <Text style={textStyle}>Invite your Friends</Text>
          </View>
        </View>
        <Button onPress={() => { this.props.navigation.navigate('SignIn') }}>
          Login with Email
        </Button>
        <TextButton fontSize={16} onPress={() => { this.props.navigation.navigate('SignUp') }}>
          New to ServiceSurfing? Sign up.
        </TextButton>
      </View>
    );
  }
}

const styles = {
  headerStyle: {
    alignItems: 'center'
  },
  textStyle: {
    fontSize: 18,
    padding: 10
  },
  textContainer: {
    paddingTop: 30,
    paddingBottom: 30
  }
};

export default Login;
