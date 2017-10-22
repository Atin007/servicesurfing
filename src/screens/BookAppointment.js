import React, { Component } from 'react';
import { Dimensions, ScrollView, Text, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import { Button, Card, CardSection, CardTitle, Input, InputDate, InputTime, Select, Spinner } from '../components/common';
import { DEFAULT_DISPLAY_PIC } from '../defaults';
import firebase from 'firebase';
const window = Dimensions.get("window");

class BookAppointment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appointmentDate: '',
      appointmentTime: '',
      error: null,
      loading: null
    };
    this.currentUser = firebase.auth().currentUser;
    this.AppointmentsRef = firebase.database().ref('/Appointments');
  }

  componentWillMount() {
    const { profile, profileID } = this.props.navigation.state.params;
    this.setState({'profile': profile, profileID: profileID});
  }

  onButtonPress() {
    this.setState({ error: '', loading: true });
    if(this.state.appointmentDate == '' && this.state.appointmentTime == '') {
      this.setState({error: 'Add appointment date & time', loading: false});
      return;
    }
    const appointmentData = {
      from: this.currentUser.uid,
      to: this.state.profileID,
      status: 'pending',
      appointmentDate: this.state.appointmentDate,
      appointmentTime: this.state.appointmentTime
    };

    var newAppointmentKey = this.AppointmentsRef.child(this.currentUser.uid).push().key;
    var updates = {};

    updates[this.currentUser.uid + '/' + newAppointmentKey] = appointmentData;
    updates[this.state.profileID + '/' + newAppointmentKey] = appointmentData;

    this.AppointmentsRef.update(updates)
      .then(() => {
        this.setState({ error: '', loading: false });
        this.props.navigation.navigate('Appointments');
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
      <View style={{flex: 1}}>
        <Card>
          <View style={styles.userInfoStyle}>
            <Avatar
              large
              rounded
              source={{uri: this.state.profile.displayPic || DEFAULT_DISPLAY_PIC}}
            />
          </View>
          <CardSection>
            <Input
              autoCapitalize="words"
              editable={false}
              placeholder=""
              label="Name"
              value={this.state.profile.firstName + ' ' + this.state.profile.lastName}
            />
          </CardSection>
          <CardSection>
            <Input
              autoCapitalize="words"
              editable={false}
              placeholder=""
              label="Industry"
              value={this.state.profile.industry || '-'}
            />
          </CardSection>
          <CardSection>
            <Input
              autoCapitalize="words"
              editable={false}
              placeholder=""
              label="Position"
              value={this.state.profile.position || '-'}
            />
          </CardSection>
          <CardSection>
            <Input
              editable={false}
              placeholder=""
              label="Hourly Rate"
              value={this.state.profile.hourlyRate || '-'}
            />
          </CardSection>
          <CardSection>
            <Input
              autoCapitalize="words"
              editable={false}
              placeholder=""
              label="Currency"
              value={this.state.profile.currency || '-'}
            />
          </CardSection>
          <CardSection>
            <InputDate
              placeholder="DD-MM-YYYY"
              label="Appointment Date"
              date={this.state.appointmentDate}
              onDateChange={(appointmentDate) => {this.setState({appointmentDate: appointmentDate})}}
            />
          </CardSection>
          <CardSection>
            <InputTime
              placeholder="HH:mm"
              label="Appointment Time"
              date={this.state.appointmentTime}
              onDateChange={(appointmentTime) => {this.setState({appointmentTime: appointmentTime})}}
            />
          </CardSection>
        </Card>
        {this.renderButton()}
      </View>
      </ScrollView>
    );
  }

}

const styles = {
  userInfoStyle: {
    borderBottomWidth: 1,
    padding: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    borderColor: '#ddd',
    position: 'relative'
  }
};

export default BookAppointment;
