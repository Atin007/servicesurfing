import React, { Component } from 'react';
import { Root } from './config/router';
import firebase from 'firebase';

class App extends Component {
  state = { loggedIn: null };

  componentWillMount() {
    firebase.initializeApp({
      apiKey: "AIzaSyD4dw4Ydfn3OxAlwby9537udBK1c6_kMYU",
      authDomain: "servicesurfing-e6cbc.firebaseapp.com",
      databaseURL: "https://servicesurfing-e6cbc.firebaseio.com",
      projectId: "servicesurfing-e6cbc",
      storageBucket: "servicesurfing-e6cbc.appspot.com",
      messagingSenderId: "389029720680"
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  render() {
    return (
        <Root />
    );
  }
};

export default App;
