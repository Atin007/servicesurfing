import React, { Component } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Button, Card, CardSection, CardTitle, Input, InputDate, Select, Spinner } from '../components/common';
import firebase from 'firebase';
import { Countries, CitiesByCountry, Currencies, Industries, Universities } from '../choices';

class EditProfile extends Component {

  constructor(props) {
    super(props);
    this.state = { email: '', firstName: '', lastName: '', gender: '', birthday: '', country: '', city: '', institution: '', startWork: '', endWork: '', industry: '', position: '', university: '', faculty: '', startUniv: '', endUniv: '', phd: '', hIndex: '', hourlyRate: '', currency: '', satisfactionScore: '', lastUpdated: '', modalVisibility: 0 };
  }

  componentWillMount() {
    const { currentUser } = firebase.auth();
    this.UserRef = firebase.database().ref(`/UserProfiles/${currentUser.uid}`);
    this.UserRef.on('value', (snapshot) => {
      this.setState(snapshot.val());
    });
  }

  onButtonPress() {
    const lastUpdated = new Date().toLocaleString();

    const { email, firstName, lastName, gender, birthday, country, city, institution, startWork, endWork, industry, position, university, faculty, startUniv, endUniv, phd, hIndex , hourlyRate, currency, satisfactionScore } = this.state;

    const updatedUserData = { email, firstName, lastName, gender, birthday, country, city, institution, startWork, endWork, industry, position, university, faculty, startUniv, endUniv, phd, hIndex , hourlyRate, currency, satisfactionScore, lastUpdated };

    this.setState({ error: '', loading: true });

    this.UserRef.update(updatedUserData).then(() => {
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

    const { footerStyle } = styles;

    return (
      <ScrollView>
      <View style={{flex: 1, marginBottom: 10}}>
        <Card>
          <CardSection>
            <CardTitle label="Profile Info" />
          </CardSection>
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
        </Card>
        <Card>
          <CardSection>
            <CardTitle label="Basic Info" />
          </CardSection>
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
              options={Countries}
              pickerValue={this.state.country}
              modalVisibility={this.state.modalVisibility==2}
              showModal={()=>{this.setState({modalVisibility: 2})}}
              hideModal={()=>{this.setState({modalVisibility: 0})}}
              onValueChange={(country) => {this.setState({city: ''}); if (country != "Select") {this.setState({country: country})} else {this.setState({country: ''})}}}
            />
          </CardSection>
          <CardSection>
            <Select
              label="City"
              options={CitiesByCountry[this.state.country]}
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
            <CardTitle label="Work" />
          </CardSection>
          <CardSection>
            <Input
              autoCapitalize="words"
              placeholder=""
              label="Institution"
              value={this.state.institution}
              onChangeText={institution => this.setState({ institution })}
            />
          </CardSection>
          <CardSection>
            <InputDate
              placeholder="DD-MM-YYYY"
              label="Start Date"
              date={this.state.startWork}
              onDateChange={(startWork) => {this.setState({startWork: startWork})}}
            />
          </CardSection>
          <CardSection>
            <InputDate
              placeholder="DD-MM-YYYY"
              label="End Date"
              date={this.state.endWork}
              onDateChange={(endWork) => {this.setState({endWork: endWork})}}
            />
          </CardSection>
          <CardSection>
            <Select
              label="Industry"
              options={Industries}
              pickerValue={this.state.industry}
              modalVisibility={this.state.modalVisibility==4}
              showModal={()=>{this.setState({modalVisibility: 4})}}
              hideModal={()=>{this.setState({modalVisibility: 0})}}
              onValueChange={(industry) => {if (industry != "Select") {this.setState({industry: industry})} else {this.setState({industry: ''})}}}
            />
          </CardSection>
          <CardSection>
            <Input
              autoCapitalize="words"
              placeholder=""
              label="Position"
              value={this.state.position}
              onChangeText={position => this.setState({ position })}
            />
          </CardSection>
        </Card>
        <Card>
          <CardSection>
            <CardTitle label="Education" />
          </CardSection>
          <CardSection>
            <Select
              label="University"
              options={Universities}
              pickerValue={this.state.university}
              modalVisibility={this.state.modalVisibility==5}
              showModal={()=>{this.setState({modalVisibility: 5})}}
              hideModal={()=>{this.setState({modalVisibility: 0})}}
              onValueChange={(university) => {if (university != "Select") {this.setState({university: university})} else {this.setState({university: ''})}}}
            />
          </CardSection>
          <CardSection>
            <Input
              autoCapitalize="words"
              placeholder=""
              label="Faculty"
              value={this.state.faculty}
              onChangeText={faculty => this.setState({ faculty })}
            />
          </CardSection>
          <CardSection>
            <InputDate
              placeholder="DD-MM-YYYY"
              label="Start Date"
              date={this.state.startUniv}
              onDateChange={(startUniv) => {this.setState({startUniv: startUniv})}}
            />
          </CardSection>
          <CardSection>
            <InputDate
              placeholder="DD-MM-YYYY"
              label="End Date"
              date={this.state.endUniv}
              onDateChange={(endUniv) => {this.setState({endUniv: endUniv})}}
            />
          </CardSection>
        </Card>
        <Card>
          <CardSection>
            <CardTitle label="Price Info" />
          </CardSection>
          <CardSection>
            <Select
              label="Phd"
              options={["Select", "Yes", "No"]}
              pickerValue={this.state.phd}
              modalVisibility={this.state.modalVisibility==6}
              showModal={()=>{this.setState({modalVisibility: 6})}}
              hideModal={()=>{this.setState({modalVisibility: 0})}}
              onValueChange={(phd) => {if (phd != "Select") {this.setState({phd: phd})} else {this.setState({phd: ""})}}}
            />
          </CardSection>
          <CardSection>
            <Input
              editable={this.state.phd=="Yes" ? true : false}
              keyboardType="numeric"
              placeholder="10"
              label="H-Index"
              value={this.state.hIndex}
              onChangeText={hIndex => this.setState({ hIndex })}
            />
          </CardSection>
          <CardSection>
            <Input
              keyboardType="numeric"
              placeholder="10"
              label="Hourly Rate"
              value={this.state.hourlyRate}
              onChangeText={hourlyRate => this.setState({ hourlyRate })}
            />
          </CardSection>
          <CardSection>
            <Select
              label="Currency"
              options={Currencies}
              pickerValue={this.state.currency}
              modalVisibility={this.state.modalVisibility==7}
              showModal={()=>{this.setState({modalVisibility: 7})}}
              hideModal={()=>{this.setState({modalVisibility: 0})}}
              onValueChange={(currency) => {if (currency != "Select") {this.setState({currency: currency})} else {this.setState({currency: ''})}}}
            />
          </CardSection>
          <CardSection>
            <Input
              placeholder="10"
              label="Satisfaction Score"
              value={this.state.satisfactionScore}
              editable={false}
            />
          </CardSection>
        </Card>
        {this.renderButton()}
        <Text style={footerStyle}>
          {this.state.lastUpdated!='' ? `Last updated on ${this.state.lastUpdated}` : ''}
        </Text>
      </View>
      </ScrollView>
    );
  }

}

const styles = {
  footerStyle: {
    color: '#333',
    fontSize: 12,
    textAlign: 'center',
    marginLeft: 15,
    marginRight: 15,
    marginTop: 15
  }
};

export default EditProfile;
