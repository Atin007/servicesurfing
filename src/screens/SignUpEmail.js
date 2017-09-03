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

class SignUpEmail extends Component {
  state = {
    firstName: '',
    lastName: '',
    mail: '',
    password: '',
    error: '',
    loading: false
  };

  onButtonPress() {
    const { firstName, lastName, email, password } = this.state;

    this.setState({ error: '', loading: true });

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({
          email: '',
          password: '',
          loading: false,
          error: ''
        });
        this.props.navigation.navigate('SignInEmail');
      })
      .catch((error) => {
        this.setState({ error: error.code, loading: false });
      });
  }

  render() {
    return (
      <ScrollView style={styles.topLevelContainer}>
        <FormLabel>First Name</FormLabel>
        <FormInput
          placeholder="John"
          autoCorrect={false}
          value={this.state.firstName}
          onChangeText={firstName => this.setState({ firstName })}
          style={styles.formInputStyle}
        />
        <FormLabel>Last Name</FormLabel>
        <FormInput
          placeholder="Doe"
          autoCorrect={false}
          value={this.state.lastName}
          onChangeText={lastName => this.setState({ lastName })}
          style={styles.formInputStyle}
        />
        <FormLabel>Email</FormLabel>
        <FormInput
          placeholder="john.doe@wxyz.com"
          autoCorrect={false}
          value={this.state.email}
          onChangeText={email => this.setState({ email })}
          style={styles.formInputStyle}
        />
        <FormLabel>Password</FormLabel>
        <FormInput
          secureTextEntry={true}
          placeholder="Password"
          autoCorrect={false}
          value={this.state.password}
          onChangeText={password => this.setState({ password })}
          style={styles.formInputStyle}
        />
        <FormValidationMessage containerStyle={{alignItems: 'center'}}>
          {this.state.error}
        </FormValidationMessage>
        <Button title="Sign up" onPress={this.onButtonPress.bind(this)} />
      </ScrollView>
    );
  }

}

const styles = {
  topLevelContainer: {
    flex: 1,
    backgroundColor: '#FFF'
  },
  formInputStyle: {
    margin: 4,
    fontSize: 14,
    color: '#000',
  }
};

export default SignUpEmail;
