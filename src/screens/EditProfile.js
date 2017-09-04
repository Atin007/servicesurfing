import React, { Component } from 'react';
import {
  ScrollView
 } from 'react-native';
import {
  Button,
  Card,
  CardSection,
  Input,
  InputDate,
  Spinner
} from '../components/common';

class EditProfile extends Component {
  state = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    description: '',
    gender: '',
    birthday: '',
    country: '',
    city: '',
    industry: '',
    position: '',
    phd: '',
    hIndex: '' ,
    hourlyRate: '',
    education: '',
    work: ''
  };

  render() {

    return (
      <ScrollView>
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
        <Card>
          <CardSection>
            <Input
              placeholder="John"
              label="First Name"
              value={this.state.firstName}
              onChangeText={firstName => this.setState({ firstName })}
            />
          </CardSection>
          <CardSection>
            <Input
              placeholder="Doe"
              label="Last Name"
              value={this.state.lastName}
              onChangeText={lastName => this.setState({ lastName })}
            />
          </CardSection>
          <CardSection>
            <Input
              placeholder="Male"
              label="Gender"
              value={this.state.gender}
              onChangeText={gender => this.setState({ gender })}
            />
          </CardSection>
          <CardSection>
            <InputDate
              placeholder="DD-MM-YYYY"
              label="Birthday"
              date={this.state.birthday}
              onDateChange={(birthday) => {this.setState({birthday: birthday});}}
            />
          </CardSection>
        </Card>
      </ScrollView>
    );
  }

}

export default EditProfile;
