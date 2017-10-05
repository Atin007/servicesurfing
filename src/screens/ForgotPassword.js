import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { Button, Card, CardSection, Input, Spinner } from '../components/common';
import firebase from 'firebase';

class ForgotPassword extends Component {
  constructor(props){
    super(props);
    this.state = { email: '', error: '', loading: false };
  }

  onButtonPress() {
    if(this.state.email != '') {
      this.setState({ error: '', loading: true });
      var auth = firebase.auth();
      auth.sendPasswordResetEmail(this.state.email).then(() => {
        this.setState({error: '', loading: false});
      }).catch((error) => {
        this.setState({error: error.code, loading: false});
        this.props.navigation.navigate('SignIn');
      });
    }
  }

  renderButton() {
    if (this.state.loading) {
      return <Spinner size="large" />;
    }
    return (
      <Button onPress={this.onButtonPress.bind(this)}>Submit</Button>
    );
  }

  render() {
    const { containerStyle } = styles;
    return (
      <ScrollView style={containerStyle}>
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
        </Card>
        {this.renderButton()}
      </ScrollView>
    );
  }

}

const styles = {
  containerStyle: {
    flex: 1
  }
};

export default ForgotPassword;
