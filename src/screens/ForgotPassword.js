import React, { Component } from 'react';
import {
  ScrollView
} from 'react-native';
import {
  Button,
  Card,
  CardSection,
  Input,
  Spinner
} from '../components/common';
import firebase from 'firebase';

class ForgotPassword extends Component {
  state = { email: '', error: '', loading: false };

  onButtonPress() {
    const { email } = this.state;
    this.setState({ error: '', loading: true });

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
