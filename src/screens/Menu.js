import React, { Component } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { List, ListItem } from '../components/common';
import { ToS, PP } from '../defaults';
import firebase from 'firebase';

class Menu extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { currentUser } = firebase.auth();

    this.MenuList = [
      {
        title: 'View Profile',
        icon: 'ios-contact',
        type: 'ionicon',
        onPress: () => this.props.navigation.navigate('UserProfile', {profileID: currentUser.uid, title: currentUser.displayName})
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
        onPress: () => this.props.navigation.navigate('Appointments')
      },
      {
        title: 'Terms of Service',
        icon: 'ios-document',
        type: 'ionicon',
        onPress: () => this.props.navigation.navigate('PDFView', {fileURL: ToS, title: 'Terms of Service'})
      },
      {
        title: 'Privacy Policy',
        icon: 'ios-document',
        type: 'ionicon',
        onPress: () => this.props.navigation.navigate('PDFView', {fileURL: PP, title: 'Privacy Policy'})
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
