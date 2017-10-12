import React, { Component } from 'react';
import { StatusBar, View } from 'react-native';
import { Root, UserAuth, VerifyUserAuth } from './router';
import { Spinner } from './components/common';
import firebase from 'firebase';

class App extends Component {
  state = { loggedIn: null, emailVerified: null };

  componentWillMount() {
    firebase.initializeApp({
      apiKey: "AIzaSyApKljlSBIQG3dtJzzA4aKQs51cyyGAJV8",
      authDomain: "servicesurfing-d6831.firebaseapp.com",
      databaseURL: "https://servicesurfing-d6831.firebaseio.com",
      projectId: "servicesurfing-d6831",
      storageBucket: "servicesurfing-d6831.appspot.com",
      messagingSenderId: "891571143291"
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true, emailVerified: user.emailVerified });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return this.state.emailVerified ? <Root /> : <VerifyUserAuth />;
      case false:
        return <UserAuth />;
      default:
        return <Spinner size="large" />;
    }
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar barStyle="light-content" />
        {this.renderContent()}
      </View>
    );
  }
}

export default App;
