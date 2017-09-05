import React, { Component } from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  View
   } from 'react-native';
import firebase from 'firebase';
const window = Dimensions.get("window");

import {
  Button
} from '../components/common';

class Login extends Component {

  componentWillMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
        this.props.navigation.navigate('Tabs');
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  render() {
    const { containerStyle, headerStyle, textStyle, textContainer, buttonContainer } = styles;
    return (
      <ScrollView style={containerStyle}>
        <View style={headerStyle}>
          <Image
            source={require('../assets/images/servicesurfing.png')}
            resizeMode='cover'
            style={{
              height: 2*window.width/10,
              width: 2*window.width/10,
              marginTop: 30,
              borderColor: '#FFF',
              borderWidth: 2
            }}
          />
          <Text style={textStyle}>
            ServiceSurfing
          </Text>
          <View style={textContainer}>
            <Text style={textStyle}>Hire Professionals around the world</Text>
            <Text style={textStyle}>Share articles, videos and images</Text>
            <Text style={textStyle}>Invite your facebook friends</Text>
          </View>
        </View>
        <View style={buttonContainer}>
          <Button buttonColor="#FFF" onPress={() => { this.props.navigation.navigate('Tabs') }}>
            Continue with Google
          </Button>
        </View>
        <View style={buttonContainer}>
          <Button buttonColor="#3B5998" onPress={() => { this.props.navigation.navigate('Tabs') }}>
            Continue with Facebook
          </Button>
        </View>
        <View style={buttonContainer}>
          <Button buttonColor="#AA2200" onPress={() => { this.props.navigation.navigate('Tabs') }}>
            Continue with Email
          </Button>
        </View>
      </ScrollView>
    );
  }
}

const styles = {
  containerStyle: {
    flex: 1,
    backgroundColor: '#FFF'
  },
  headerStyle: {
    alignItems: 'center'
  },
  textStyle: {
    fontSize: 18,
    padding: 10
  },
  textContainer: {
    paddingTop: 20,
    paddingBottom: 20
  },
  buttonContainer: {
    paddingLeft: 20,
    paddingRight: 20
  }
};

export default Login;

color="#DB4437"
