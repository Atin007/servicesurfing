import React, { Component } from 'react';
import { Dimensions, ScrollView, Text, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import { Button, Card, CardSection, CardTitle, Input, InputDate, InputTime, Select, Spinner } from '../components/common';
import { DEFAULT_DISPLAY_PIC } from '../defaults';
import firebase from 'firebase';
const window = Dimensions.get("window");

class RequestAppointment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appointmentDate: '',
      appointmentTime: '',
      error: null,
      loading: null
    }
  }

  componentWillMount() {
    const { profile, profileID } = this.props.navigation.state.params;
    this.setState(profile);
    this.UserNotificationsRef = firebase.database().ref(`/UserNotifications/${profileID}`);
  }

  onButtonPress() {
    this.setState({ error: '', loading: true });
    if(this.state.appointmentDate == '' && this.state.appointmentTime == '') {
      this.setState({error: 'Add appointment date & time', loading: false});
      return;
    }

    const { currentUser } = firebase.auth();
    const appointmentData = {
      senderID: currentUser.uid,
      type: 'Appointment',
      appointmentDate: this.state.appointmentDate,
      appointmentTime: this.state.appointmentTime
    };
    this.UserNotificationsRef.push(appointmentData)
      .then(() => {
        this.setState({ error: '', loading: false });
        this.props.navigation.goBack();
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
              source={{uri: this.state.displayPic || DEFAULT_DISPLAY_PIC}}
            />
          </View>
          <CardSection>
            <Input
              autoCapitalize="words"
              editable={false}
              placeholder=""
              label="Name"
              value={this.state.firstName + ' ' + this.state.lastName}
            />
          </CardSection>
          <CardSection>
            <Input
              autoCapitalize="words"
              editable={false}
              placeholder=""
              label="Industry"
              value={this.state.industry}
            />
          </CardSection>
          <CardSection>
            <Input
              autoCapitalize="words"
              editable={false}
              placeholder=""
              label="Position"
              value={this.state.position}
            />
          </CardSection>
          <CardSection>
            <Input
              editable={false}
              placeholder=""
              label="Hourly Rate"
              value={this.state.hourlyRate}
            />
          </CardSection>
          <CardSection>
            <Input
              autoCapitalize="words"
              editable={false}
              placeholder=""
              label="Currency"
              value={this.state.currency}
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

export default RequestAppointment;
