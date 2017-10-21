import React, { Component } from 'react';
import { Dimensions, Image, ScrollView, Text, View } from 'react-native';
import { Button, TextButton } from '../components/common';
import firebase from 'firebase';
const window = Dimensions.get("window");

class Login extends Component {

  render() {
    const { containerStyle, headerStyle, textStyle, textContainer, buttonContainer } = styles;
    return (
      <ScrollView style={containerStyle}>
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
        {/* <View style={buttonContainer}>
          <Button buttonColor="#C71610" onPress={() => { this.props.navigation.navigate('Tabs') }}>
            Continue with Google
          </Button>
        </View>
        <View style={buttonContainer}>
          <Button buttonColor="#3B5998" onPress={() => { this.props.navigation.navigate('Tabs') }}>
            Continue with Facebook
          </Button>
        </View> */}
        <View style={buttonContainer}>
          <Button onPress={() => { this.props.navigation.navigate('SignIn') }}>
            Login with Email
          </Button>
        </View>
        <View style={buttonContainer}>
          <TextButton fontSize={16} onPress={() => { this.props.navigation.navigate('SignUp') }}>
            New to ServiceSurfing? Sign up.
          </TextButton>
        </View>
      </ScrollView>
    );
  }
}

const styles = {
  containerStyle: {
    flex: 1
  },
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
  },
  buttonContainer: {
    paddingLeft: 20,
    paddingRight: 20
  }
};

export default Login;
