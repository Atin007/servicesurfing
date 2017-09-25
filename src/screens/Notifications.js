import React, { Component } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import { List, ListItem } from '../components/common';
import firebase from 'firebase';

class Notifications extends Component {
  constructor(props) {
    super(props);
    const { currentUser } = firebase.auth();
    this.UserNotificationsRef = firebase.database().ref(`/UserNotifications/${currentUser.uid}`);
    this.Notifications = [];
  }

  componentWillMount() {
    this.UserNotificationsRef.orderByKey().on('child_added', snapshot => {
      var appointmentData = snapshot.val();
      firebase.database().ref(`/UserProfile/${appointmentData.senderID}`).on('value', data => {
        const user = data.val();
        appointmentData = {...appointmentData, senderFirstName: user.firstName, senderLastName: user.lastName, senderDisplayPic: user.displayPic};
      });
      this.Notifications = [ appointmentData, ...this.Notifications ];
      this.forceUpdate();
    });
  }

  render() {
    const { textStyle } = styles;
    const defaultDisplayPic = 'https://firebasestorage.googleapis.com/v0/b/servicesurfing-e6cbc.appspot.com/o/default-user.png?alt=media&token=899dcd9f-6951-4a61-b072-0818054a0840';
    return (
      <ScrollView>
        <View style={{flex: 1}}>
          <List>
            {this.Notifications.map((notification, i) => (
              <ListItem key={i}>
                <Avatar small rounded source={{uri:notification.senderDisplayPic || defaultDisplayPic}} />
                <View style={{flex: 1}}>
                <Text style={textStyle}>You have a {notification.type} request from {notification.senderFirstName + ' ' + notification.senderLastName} for {notification.appointmentDate} at {notification.appointmentTime}</Text>
                </View>
              </ListItem>
            ))}
          </List>
        </View>
      </ScrollView>
    );
  }
}

const styles = {
  textStyle: {
    alignSelf: 'center',
    color:'#333',
    fontSize: 16,
    marginLeft: 10
  }
};

export default Notifications;
