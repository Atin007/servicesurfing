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
import firebase from 'firebase';

class EditProfile extends Component {
  state = {
    email: '',
    firstName: '',
    lastName: '',
    gender: '',
    birthday: '',
    country: '',
    city: '',
    industry: '',
    position: '',
    hIndex: '' ,
    hourlyRate: '',
    education: '',
    work: '',
    modalVisibility: 0
  };

  componentWillMount() {
    const { currentUser } = firebase.auth();

    firebase.database().ref(`/UserProfile/${currentUser.uid}`)
      .on('value', (snapshot) => {
        this.setState(snapshot.val());
      });
  }

  onButtonPress() {
    const { currentUser } = firebase.auth();

    const { email, firstName, lastName, gender, birthday, country, city, industry, position, hIndex } = this.state;
    const updatedUserData = { email, firstName, lastName, gender, birthday, country, city, industry, position, hIndex };

    this.setState({ error: '', loading: true });


    var userData = firebase.database().ref(`/UserProfile/${currentUser.uid}`);
    userData.update(updatedUserData).then(() => {
      this.setState({ error: '', loading: false });
    });
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

    return (
      <ScrollView>
      <View style={{flex: 1, marginBottom: 10}}>
        <Card>
          <CardSection>
            <Input
              editable={false}
              placeholder="john.doe@gmail.com"
              label="Email"
              value={this.state.email}
              onChangeText={email => this.setState({ email })}
            />
          </CardSection>
          <CardSection>
            <Input
              editable={false}
              placeholder="John"
              label="First Name"
              value={this.state.firstName}
              onChangeText={firstName => this.setState({ firstName })}
            />
          </CardSection>
          <CardSection>
            <Input
              editable={false}
              placeholder="Doe"
              label="Last Name"
              value={this.state.lastName}
              onChangeText={lastName => this.setState({ lastName })}
            />
          </CardSection>
        </Card>
        <Card>
          <CardSection>
            <Select
              label="Gender"
              options={["Select", "Male", "Female"]}
              pickerValue={this.state.gender}
              modalVisibility={this.state.modalVisibility==1}
              showModal={()=>{this.setState({modalVisibility: 1})}}
              hideModal={()=>{this.setState({modalVisibility: 0})}}
              onValueChange={(gender) => {if (gender != "Select") {this.setState({gender: gender})} else {this.setState({gender: ''})}}}
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
              options={["Select", "Turkey", "United States", "India"]}
              pickerValue={this.state.country}
              modalVisibility={this.state.modalVisibility==2}
              showModal={()=>{this.setState({modalVisibility: 2})}}
              hideModal={()=>{this.setState({modalVisibility: 0})}}
              onValueChange={(country) => {if (country != "Select") {this.setState({country: country})} else {this.setState({country: ''})}}}
            />
          </CardSection>
          <CardSection>
            <Select
              label="City"
              options={["Select", "Ankara", "Istanbul", "Newyork", "Chicago", "Boston", "Delhi", "Bangalore", "Pune"]}
              pickerValue={this.state.city}
              modalVisibility={this.state.modalVisibility==3}
              showModal={()=>{this.setState({modalVisibility: 3})}}
              hideModal={()=>{this.setState({modalVisibility: 0})}}
              onValueChange={(city) => {if (city != "Select") {this.setState({city: city})} else {this.setState({city: ''})}}}
            />
          </CardSection>
        </Card>
        <Card>
          <CardSection>
            <Select
              label="Industry"
              options={["Select", "Agriculture", "Accounting", "Engineering", "Teaching", "Medical", "Law", "Sales and Marketing"]}
              pickerValue={this.state.industry}
              modalVisibility={this.state.modalVisibility==4}
              showModal={()=>{this.setState({modalVisibility: 4})}}
              hideModal={()=>{this.setState({modalVisibility: 0})}}
              onValueChange={(industry) => {if (industry != "Select") {this.setState({industry: industry})} else {this.setState({industry: ''})}}}
            />
          </CardSection>
          <CardSection>
            <Select
              label="Position"
              options={["Select", "Farmer", "Accountant", "Engineer", "Teacher", "Doctor", "Lawyer", "Marketing Director"]}
              pickerValue={this.state.position}
              modalVisibility={this.state.modalVisibility==5}
              showModal={()=>{this.setState({modalVisibility: 5})}}
              hideModal={()=>{this.setState({modalVisibility: 0})}}
              onValueChange={(position) => {if (position != "Select") {this.setState({position: position})} else {this.setState({position: ''})}}}
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
        {this.renderButton()}
      </View>
      </ScrollView>
    );
  }

}

export default EditProfile;
