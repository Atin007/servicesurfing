import React, { Component } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Button, Card, CardSection, Input, Spinner, TextButton } from '../components/common';
import firebase from 'firebase';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = { firstName: '', lastName: '', email: '', displayPic: '', coverPic: '', password: '', error: '', loading: false };
  }

  onButtonPress() {
    const { firstName, lastName, email, password, displayPic, coverPic } = this.state;
    this.setState({ error: '', loading: true });

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => {
        const uid = firebase.auth().currentUser.uid;
        firebase.database().ref('/UserProfiles').child(uid).set({firstName, lastName, email, displayPic, coverPic});
        this.setState({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          loading: false,
          error: ''
        });
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
        <Button onPress={this.onButtonPress.bind(this)}>Sign up</Button>
        <TextButton fontSize={16} onPress={() => { this.props.navigation.navigate('SignIn') }}>
        Already a member? Sign in
        </TextButton>
      </View>
    );
  }

  render() {
    const { containerStyle, textStyle } = styles;
    return (
      <ScrollView style={styles.topLevelContainer}>
        <View style={{paddingTop: 10, paddingBottom: 35}}>
        <Button buttonColor="#C71610" onPress={() => { this.props.navigation.navigate('Tabs') }}>
          Continue with Google
        </Button>
        <Button buttonColor="#3B5998" onPress={() => { this.props.navigation.navigate('Tabs') }}>
          Continue with Facebook
        </Button>
        </View>
        <Text style={textStyle}>
          Sign up using email
        </Text>
        <Card>
          <CardSection>
            <Input
              autoCapitalize="words"
              placeholder="John"
              label="First Name"
              value={this.state.firstName}
              onChangeText={firstName => this.setState({ firstName })}
            />
          </CardSection>
          <CardSection>
            <Input
              autoCapitalize="words"
              placeholder="Doe"
              label="Last Name"
              value={this.state.lastName}
              onChangeText={lastName => this.setState({ lastName })}
            />
          </CardSection>
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
        {this.renderButton()}
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
  }
};

export default SignUp;
