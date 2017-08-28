import React, { Component } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image
} from 'react-native';
import {
  Button,
  FormLabel,
  FormInput,
  FormValidationMessage
} from 'react-native-elements';
import firebase from 'firebase';
import { toTitleCase } from '../helpers';

class SignInEmail extends Component {
  state = { email: '', password: '', error: '', loading: false };

  onButtonPress() {
    const { email, password } = this.state;

    this.setState({ error: '', loading: true });

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(this.onLoginSuccess.bind(this))
      .catch(this.onLoginFail.bind(this));
  }

  onLoginFail() {
    this.setState({ error: 'Incorrect username or password', loading: false });
  }

  onLoginSuccess() {
    this.setState({
      email: '',
      password: '',
      loading: false,
      error: ''
    });
    this.props.navigation.navigate('Tabs');
  }

  render() {
    return (
      <ScrollView style={{
        flex: 1,
        backgroundColor: '#FFF'
      }}>
        <View style={{}}>
          <FormLabel>Email</FormLabel>
          <FormInput
            placeholder="john.doe@wxyz.com"
            autoCorrect={false}
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
          />
          <FormLabel>Password</FormLabel>
          <FormInput
            secureTextEntry={true}
            placeholder="Password"
            autoCorrect={false}
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
          />
          <FormValidationMessage containerStyle={{alignItems: 'center'}}>
              {this.state.error}
          </FormValidationMessage>
          <Button title="Login" onPress={this.onButtonPress.bind(this)}/>
        </View>
      </ScrollView>
    );
  }

}

const styles = {
  containerStyle: {

  },
  textStyle: {
    fontSize: 16,
    padding: 10
  }
};

export default SignInEmail;
