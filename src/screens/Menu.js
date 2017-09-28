import React, { Component } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { List, ListItem } from '../components/common';
import firebase from 'firebase';

class Menu extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { currentUser } = firebase.auth();
    
    this.ToS = 'https://firebasestorage.googleapis.com/v0/b/servicesurfing-e6cbc.appspot.com/o/ToS.pdf?alt=media&token=11c14fcb-caf8-4184-865c-664294ee7969';
    this.PP = 'https://firebasestorage.googleapis.com/v0/b/servicesurfing-e6cbc.appspot.com/o/PP.pdf?alt=media&token=e7aa68ae-aa26-4743-9781-b4eb1ac28d77';

    this.MenuList = [
      {
        title: 'View Profile',
        icon: 'ios-contact',
        type: 'ionicon',
        onPress: () => this.props.navigation.navigate('UserProfile', {profileID: currentUser.uid, title: 'My Profile'})
      },
      {
        title: 'Friends',
        icon: 'ios-contacts',
        type: 'ionicon',
        onPress: () => this.props.navigation.navigate('Friends', {profileID: currentUser.uid})
      },
      {
        title: 'Appointments',
        icon: 'ios-calendar',
        type: 'ionicon',
        onPress: () => this.props.navigation.navigate('Appointments', {profileID: currentUser.uid})
      },
      {
        title: 'Terms of Service',
        icon: 'ios-document',
        type: 'ionicon',
        onPress: () => this.props.navigation.navigate('PDFView', {fileURL: this.ToS, title: 'Terms of Service'})
      },
      {
        title: 'Privacy Policy',
        icon: 'ios-document',
        type: 'ionicon',
        onPress: () => this.props.navigation.navigate('PDFView', {fileURL: this.PP, title: 'Privacy Policy'})
      },
      {
        title: 'Logout',
        icon: 'ios-log-out',
        type: 'ionicon',
        onPress: () => firebase.auth().signOut()
      }
    ];
  }

  render() {
    const { textStyle } =styles;
    return (
      <ScrollView>
        <List>
          {this.MenuList.map((item, i) => (
            <ListItem key={i} onPress={item.onPress}>
              <Icon name={item.icon} type={item.type} size={22} color="#999" />
              <Text style={textStyle}>{item.title}</Text>
            </ListItem>
          ))}
        </List>
      </ScrollView>
    );
  }
}

const styles = {
  textStyle: {
    alignSelf: 'center',
    color:'#333',
    fontSize: 16,
    marginLeft: 20
  }
};

export default Menu;
