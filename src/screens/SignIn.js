import React, { Component } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Button, Card, CardSection, ErrorMessage, Input, Spinner, TextButton } from '../components/common';
import { ToS, PP } from '../defaults';
import firebase from 'firebase';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', error: '', loading: false };
  }

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
      })
      .catch((error) => {
        this.setState({ error: error.message, loading: false });
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
    const { containerStyle, textStyle, footerStyle, hyperlinkStyle } = styles;

    return (
      <ScrollView style={containerStyle}>
        {/* <View style={{paddingTop: 10, paddingBottom: 35}}>
        <Button buttonColor="#C71610" onPress={() => {}}>
          Continue with Google
        </Button>
        <Button buttonColor="#3B5998" onPress={() => {}}>
          Continue with Facebook
        </Button>
        </View> */}
        <Text style={textStyle}>
          Sign in using your existing ServiceSurfing account
        </Text>
        <Card>
          <CardSection>
            <Input
              keyboardType="email-address"
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
        <ErrorMessage>{this.state.error}</ErrorMessage>
        {this.renderButton()}
        <Text style={footerStyle}>
          By logging in you agree to ServiceSurfing's <Text style={hyperlinkStyle} onPress={() => this.props.navigation.navigate('PDFScreen', {fileURL: ToS, title: 'Terms of Service'})}>Terms of Service</Text> and <Text style={hyperlinkStyle} onPress={() => this.props.navigation.navigate('PDFScreen', {fileURL: PP, title: 'Privacy Policy'})}>Privacy Policy</Text>
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
  },
  hyperlinkStyle: {
    textDecorationLine: 'underline'
  }
};

export default SignIn;
