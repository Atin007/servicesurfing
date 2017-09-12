import React, { Component } from 'react';
import { StatusBar, View } from 'react-native';
import { Root, UserAuth } from './config/router';
import { Spinner } from './components/common';
import firebase from 'firebase';

class App extends Component {
  state = { loggedIn: null, user: null, userID: null };

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
        this.setState({userID: user.uid})
        firebase.database().ref(`/UserProfile/${user.uid}`)
          .on('value', snapshot => this.setState({user: snapshot.val()}));
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return <Root screenProps={{user: this.state.user, userID: this.state.userID}} />;
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
