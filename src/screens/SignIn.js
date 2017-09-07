import React, { Component } from 'react';
import {
  ScrollView,
  Text,
  View
} from 'react-native';
import {
  Button,
  Card,
  CardSection,
  Input,
  Spinner,
  TextButton
} from '../components/common';
import firebase from 'firebase';
import { toTitleCase } from '../helpers';

class SignIn extends Component {
  state = { email: '', password: '', error: '', loading: false };

  onButtonPress() {
    const { email, password } = this.state;

    this.setState({ error: '', loading: true });

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({
          email: '',
          password: '',
          loading: false,
          error: ''
        });
        this.props.navigation.navigate('Tabs');
      })
      .catch((error) => {
        this.setState({ error: error.code, loading: false });
      });
  }

  renderButton() {
    if (this.state.loading) {
      return <Spinner size="large" />;
    }

    return (
      <View>
        <Button onPress={this.onButtonPress.bind(this)}>Login</Button>
        <TextButton fontSize={16} onPress={() => { this.props.navigation.navigate('ForgotPassword') }}>
        Forgot Password?
        </TextButton>
      </View>
    );
  }

  render() {
    const { containerStyle, textStyle, footerStyle } = styles;
    return (
      <ScrollView style={containerStyle}>
        <View style={{paddingTop: 10, paddingBottom: 35}}>
        <Button buttonColor="#C71610" onPress={() => { this.props.navigation.navigate('Tabs') }}>
          Continue with Google
        </Button>
        <Button buttonColor="#3B5998" onPress={() => { this.props.navigation.navigate('Tabs') }}>
          Continue with Facebook
        </Button>
        </View>
        <Text style={textStyle}>
          Sign in using your existing ServiceSurfing account
        </Text>
        <Card>
          <CardSection>
            <Input
              placeholder="john.doe@gmail.com"
              label="Email"
              value={this.state.email}
              onChangeText={email => this.setState({ email })}
            />
          </CardSection>
          <CardSection>
            <Input
              secureTextEntry
              placeholder="password"
              label="Password"
              value={this.state.password}
              onChangeText={password => this.setState({ password })}
            />
          </CardSection>
        </Card>
        {this.renderButton()}
        <Text style={footerStyle}>
          By logging in you agree to ServiceSurfing's Terms of Service, Privacy Policy, Cookie policy and Content Policies
        </Text>
      </ScrollView>
    );
  }

}

const styles = {
  containerStyle: {
    flex: 1
  },
  textStyle: {
    color: '#333',
    fontSize: 16,
    textAlign: 'center',
    marginLeft: 15,
    marginRight: 15,
    marginTop: 15
  },
  footerStyle: {
    color: '#333',
    fontSize: 12,
    textAlign: 'center',
    marginLeft: 15,
    marginRight: 15,
    marginTop: 15
  }
};

export default SignIn;