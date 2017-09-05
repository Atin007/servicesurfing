import React, { Component } from 'react';
import {
  ScrollView,
  View
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
    modalVisibility: 0
  };

  render() {

    return (
      <ScrollView>
      <View style={{flex: 1, marginBottom: 10}}>
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
              modalVisibility={this.state.modalVisibility==1}
              showModal={()=>{this.setState({modalVisibility: 1})}}
              hideModal={()=>{this.setState({modalVisibility: 0})}}
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
          <CardSection>
            <Select
              label="Country"
              options={["Turkey", "United States", "India"]}
              pickerValue={this.state.country}
              modalVisibility={this.state.modalVisibility==2}
              showModal={()=>{this.setState({modalVisibility: 2})}}
              hideModal={()=>{this.setState({modalVisibility: 0})}}
              onValueChange={(country) => {this.setState({country: country})}}
            />
          </CardSection>
          <CardSection>
            <Select
              label="City"
              options={["Ankara", "Istanbul", "Newyork", "Chicago", "Boston", "Delhi", "Bangalore", "Pune"]}
              pickerValue={this.state.city}
              modalVisibility={this.state.modalVisibility==3}
              showModal={()=>{this.setState({modalVisibility: 3})}}
              hideModal={()=>{this.setState({modalVisibility: 0})}}
              onValueChange={(city) => {this.setState({city: city})}}
            />
          </CardSection>
        </Card>
        <Card>
          <CardSection>
            <Select
              label="Industry"
              options={["Agriculture", "Accounting", "Engineering", "Teaching", "Medical", "Law", "Sales and Marketing"]}
              pickerValue={this.state.industry}
              modalVisibility={this.state.modalVisibility==4}
              showModal={()=>{this.setState({modalVisibility: 4})}}
              hideModal={()=>{this.setState({modalVisibility: 0})}}
              onValueChange={(industry) => {this.setState({industry: industry})}}
            />
          </CardSection>
          <CardSection>
            <Select
              label="Position"
              options={["Farmer", "Accountant", "Engineer", "Teacher", "Doctor", "Lawyer", "Marketing Director"]}
              pickerValue={this.state.position}
              modalVisibility={this.state.modalVisibility==5}
              showModal={()=>{this.setState({modalVisibility: 5})}}
              hideModal={()=>{this.setState({modalVisibility: 0})}}
              onValueChange={(position) => {this.setState({position: position})}}
            />
          </CardSection>
          <CardSection>
            <Input
              placeholder="10"
              label="H-Index"
              value={this.state.hIndex}
              onChangeText={hIndex => this.setState({ hIndex })}
            />
          </CardSection>
        </Card>
        <Button>Save</Button>
      </View>
      </ScrollView>
    );
  }

}

export default EditProfile;
