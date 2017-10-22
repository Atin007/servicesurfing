import React, { Component } from 'react';
import { Text, TouchableOpacity, ScrollView, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import { List, ListItem, TextButton } from '../components/common';
import { DEFAULT_DISPLAY_PIC } from '../defaults';
import Swiper from 'react-native-swiper';
import firebase from 'firebase';

class Appointments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      AppointmentsReceived: [],
      AppointmentsSent: []
    }
    this.currentUser = firebase.auth().currentUser;
    this.AppointmentsRef = firebase.database().ref('/Appointments');
    this.UserProfilesRef = firebase.database().ref('/UserProfiles');
    this.AppointmentsReceived = [];
    this.AppointmentsSent = []
  }

  componentWillMount() {
    this.AppointmentsRef.child(this.currentUser.uid).on('child_added', snapshot => {
      var data = snapshot.val();
      var key = snapshot.key;
      var user = {};
      if(data.from == this.currentUser.uid) {
        this.UserProfilesRef.child(data.to).on('value', snapshot => {
          user = {
            userName: snapshot.val().firstName + ' ' + snapshot.val().lastName,
            displayPic: snapshot.val().displayPic || ''
          }
        });
        this.AppointmentsSent = [ { key: key, data: data, user: user }, ...this.AppointmentsSent ];
        this.setState({ AppointmentsSent: this.AppointmentsSent});
      } else if (data.to == this.currentUser.uid) {
        this.UserProfilesRef.child(data.from).on('value', snapshot => {
          user = {
            userName: snapshot.val().firstName + ' ' + snapshot.val().lastName,
            displayPic: snapshot.val().displayPic || ''
          }
        });
        this.AppointmentsReceived = [ { key: key, data: data, user: user }, ...this.AppointmentsReceived ];
        this.setState({ AppointmentsReceived: this.AppointmentsReceived});
      }
    });
  }

  btnPress(action, key, data) {
    if(action == 'Accept') {
      var updates = {};
      updates[this.currentUser.uid + '/' + key + '/status'] = 'accepted';
      updates[data.from + '/' + key + '/status'] = 'accepted';
      this.AppointmentsRef.update(updates)
        .then(() => {
          this.props.navigation.navigate('Appointments');
        });
    } else if (action == 'Decline') {
        var updates = {};
        updates[this.currentUser.uid + '/' + key] = null;
        updates[data.from + '/' + key] = null;
        this.AppointmentsRef.update(updates)
        .then(() => {
          this.props.navigation.navigate('Appointments');
        });
    }
  }

  renderButtons(key, data) {
    const { appointmentText } = styles;
    const acceptBtn = {
      color: '#BB2A2F',
      fontSize: 16,
      fontStyle: 'normal',
      marginTop: 5
    };
    const declineBtn = {
      color: '#21A85E',
      fontSize: 16,
      fontStyle: 'normal',
      marginTop: 5
    };

    if(data.status == 'pending') {
      return (
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={() => this.btnPress("Accept", key, data)} activeOpacity={0.5}>
            <Text style={[ appointmentText, acceptBtn ]}>Accept</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.btnPress("Decline", key, data)} activeOpacity={0.5}>
            <Text style={[ appointmentText, declineBtn ]}>Decline</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <Text style={appointmentText}>{data.status}</Text>
      );
    }
  }

  render() {
    const { appointmentText, textStyle } = styles;

    return (
      <Swiper showButtons={true}>
        <View style={{flex: 1, backgroundColor: '#FFF'}}>
          <Text style={{alignSelf: 'center', fontSize: 18, padding: 10}}>Appointment Requests Received</Text>
          <ScrollView>
            <List>
              {this.state.AppointmentsReceived.map((appointment, i) => (
                <ListItem key={i} onPress={() => this.props.navigation.navigate('UserProfile', {profileID: appointment.data.from, title: appointment.user.userName})}>
                  <Avatar small rounded source={{uri:appointment.user.displayPic || DEFAULT_DISPLAY_PIC}} />
                  <View style={{flexDirection: 'column'}}>
                    <Text style={textStyle}>
                      {appointment.user.userName}
                    </Text>
                    <Text style={appointmentText}>
                      {appointment.data.appointmentTime}, {appointment.data.appointmentDate}
                    </Text>
                    {this.renderButtons(appointment.key, appointment.data)}
                  </View>
                </ListItem>
              ))}
            </List>
          </ScrollView>
        </View>
        <View style={{flex: 1, backgroundColor: '#FFF'}}>
          <Text style={{alignSelf: 'center', fontSize: 18, padding: 10}}>Appointment Requests Sent</Text>
          <ScrollView>
            <List>
              {this.state.AppointmentsSent.map((appointment, i) => (
                <ListItem key={i} onPress={() => this.props.navigation.navigate('UserProfile', {profileID: appointment.data.to, title: appointment.user.userName})}>
                  <Avatar small rounded source={{uri:appointment.user.displayPic || DEFAULT_DISPLAY_PIC}} />
                  <View style={{flexDirection: 'column'}}>
                    <Text style={textStyle}>
                      {appointment.user.userName}
                    </Text>
                    <Text style={appointmentText}>
                      {appointment.data.appointmentTime}, {appointment.data.appointmentDate}
                    </Text>
                    <Text style={appointmentText}>
                      {appointment.data.status}
                    </Text>
                  </View>
                </ListItem>
              ))}
            </List>
          </ScrollView>
        </View>
      </Swiper>
    );
  }

}

const styles = {
  textStyle: {
    color:'#333',
    fontSize: 16,
    marginLeft: 10
  },
  appointmentText: {
    color:'#333',
    fontStyle: 'italic',
    fontSize: 14,
    marginLeft: 10
  }
};

export default Appointments;
