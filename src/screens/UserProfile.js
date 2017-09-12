import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Image,
  Text,
  Dimensions,
  StyleSheet,
  TouchableHighlight,
  Button
 } from 'react-native';
import {
  Icon,
  Divider,
  ButtonGroup,
  Card,
  Avatar
} from 'react-native-elements';
import { CoverPic, DisplayPic, TextButton } from '../components/common';

import Posts from '../components/Posts';
import { posts, me } from '../config/data';
import { toTitleCase } from '../helpers';
const window = Dimensions.get("window");

class UserProfile extends Component {

  renderIcons(edit) {
    const { iconContainerStyle } = styles;

    if (edit.edit) {
      return (
        <TextButton fontSize={12} buttonColor={'#1563A0'} onPress={() => this.props.navigation.navigate('EditProfile')}>
          Edit Profile
        </TextButton>
      );
    }
    else {
      return (
        <View style={{flexDirection: 'row'}}>
          <Icon
            name='ios-calendar-outline'
            type='ionicon'
            color='#333'
            onPress={() => this.requestAppointment(user)}
            size={30}
            containerStyle={iconContainerStyle} />
          <Icon
            name='ios-person-add-outline'
            type='ionicon'
            color='#333'
            onPress={() => console.log('hello')}
            size={35}
            containerStyle={iconContainerStyle} />
          <Icon
            name='ios-chatbubbles-outline'
            type='ionicon'
            color='#333'
            onPress={() => console.log('hello')}
            size={28}
            containerStyle={iconContainerStyle} />
          <Icon
            name='md-more'
            type='ionicon'
            color='#333'
            onPress={() => console.log('hello')}
            size={31}
            containerStyle={iconContainerStyle} />
        </View>
      );
    }
  }

  render() {

    const { topContainer, dpContainer, userTitleStyle, actionIconContainer } = styles;

    const user = this.props.navigation.state.params;
    const edit = this.props.navigation.state.params;

    return (
      <ScrollView>
        <View style={topContainer}>
          <CoverPic source="" window={window} />
          <View style={dpContainer}>
            <DisplayPic source={{uri: user.picture.large}} window={window} />
            <Text style={userTitleStyle}>
              {toTitleCase(user.name.first)} {toTitleCase(user.name.last)}
            </Text>
          </View>
          <View style={actionIconContainer}>
            {this.renderIcons(edit)}
          </View>
        </View>
      </ScrollView>
    );
  }

}

const styles = {
  topContainer: {
    backgroundColor: '#FFF',
    alignItems: 'center'
  },
  dpContainer: {
    alignItems: 'center',
    transform: [ { translateY: -window.width/16 } ]
  },
  userTitleStyle: {
    color: '#000',
    fontSize: 18,
    padding: 15
  },
  actionIconContainer: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#8B9DC3',
    flexDirection: 'row',
    transform: [ { translateY: -window.width/16 } ]
  },
  iconContainerStyle: {
    paddingLeft: 25,
    paddingRight: 25
  }
}

export default UserProfile;
