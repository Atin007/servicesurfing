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
  Select,
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
    work: '',
    modalVisibility: false
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
            <Select
              label="Gender"
              options={["Male", "Female"]}
              pickerValue={this.state.gender}
              modalVisibility={this.state.modalVisibility}
              showModal={()=>{this.setState({modalVisibility: true})}}
              hideModal={()=>{this.setState({modalVisibility: false})}}
              onValueChange={(gender) => {this.setState({gender: gender})}}
            />
          </CardSection>
          <CardSection>
            <InputDate
              placeholder="DD-MM-YYYY"
              label="Birthday"
              date={this.state.birthday}
              onDateChange={(birthday) => {this.setState({birthday: birthday})}}
            />
          </CardSection>
        </Card>
      </ScrollView>
    );
  }

}

export default EditProfile;
