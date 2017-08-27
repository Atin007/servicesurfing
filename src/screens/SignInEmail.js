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
import { toTitleCase } from '../helpers';

class SignInEmail extends Component {

  render() {
    return (
      <ScrollView style={{
        flex: 1,
        backgroundColor: '#FFF'
      }}>
        <View style={{}}>
          <FormLabel>Email</FormLabel>
          <FormInput placeholder="john.doe@wxyz.com" />
          <FormLabel>Password</FormLabel>
          <FormInput placeholder="Password" />
          <FormValidationMessage></FormValidationMessage>
          <Button title="Login" onPress={() => console.log('hello')}/>
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
