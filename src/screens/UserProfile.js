import React, { Component } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View} from 'react-native';
import { Icon } from 'react-native-elements';
import { CoverPic, DisplayPic, TextButton, Spinner } from '../components/common';

import Posts from '../components/Posts';
import { posts, me } from '../config/data';
import { toTitleCase } from '../helpers';
const window = Dimensions.get("window");

class UserProfile extends Component {
  state = { userID: '', user: '', profileID: '', profile: '' };

  componentWillMount() {
    const { user, userID } = this.props.screenProps;
    this.setState({user: user, userID: userID});
    this.setState({profileID: userID, profile: user});
  }

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

  renderSummaryLine(iconName, textString) {
    return (
      <View style={{flexDirection: 'row'}}>
        <Icon name={iconName} type='ionicon' size={18} />
        <Text style={{padding: 10, margin: 5}}>{textString}</Text>
      </View>
    );
  }

  renderSummary(type) {
    var iconName = '';
    var textString = '';

    switch(type) {
      case "Location":
        iconName = 'md-pin';
        textString = `Lives in ${this.state.profile.city}${this.state.profile.city && this.state.profile.country ? ', ' : ''}${this.state.profile.country}`;
        return (this.renderSummaryLine(iconName, textString));
        break;
      case "Work":
        iconName = 'md-briefcase';
        textString = `Worked at ${this.state.profile.institution}`;
        return (this.renderSummaryLine(iconName, textString));
        break;
      case "Industry":
        iconName = 'md-briefcase';
        textString = `${this.state.profile.position}${this.state.profile.position && this.state.profile.industry ? ' - ' : ''}${this.state.profile.industry}`;
        return (this.renderSummaryLine(iconName, textString));
        break;
      case "Education":
        iconName = 'md-school';
        textString = `Studied ${this.state.profile.faculty}${this.state.profile.university ? ' at ' : ''}${this.state.profile.university}`
        return (this.renderSummaryLine(iconName, textString));
      case "Price":
        iconName= 'md-cash';
        textString = `${this.state.profile.hourlyRate ? this.state.profile.hourlyRate : '- ' } ${this.state.profile.currency}/hr`;
        return (this.renderSummaryLine(iconName, textString));
      case "Phd":
        iconName= 'md-school';
        textString = `Phd (h-index: ${this.state.profile.hIndex})`;
        return (this.renderSummaryLine(iconName, textString));
      case "Score":
        iconName= 'md-stats';
        textString = `Satisfation score: ${this.state.profile.satisfactionScore}`;
        return (this.renderSummaryLine(iconName, textString));
      default:
        return null;
    }
  }

  renderContent() {
    const { topContainer, dpContainer, profileTitleStyle, actionIconContainer, profileSummaryStyle, actionButtonContainer, buttonStyle } = styles;
    const edit = this.props.navigation.state.params;

    if (this.state.profile) {
      return (
        <ScrollView>
          <View style={topContainer}>
            <CoverPic source="" window={window} />
            <View style={dpContainer}>
              <DisplayPic source={{uri: this.state.profile.displayPic}} window={window} />
              <Text style={profileTitleStyle}>
                {toTitleCase(this.state.profile.firstName)} {toTitleCase(this.state.profile.lastName)}
              </Text>
            </View>
            <View style={actionIconContainer}>
              {this.renderIcons(edit)}
            </View>
          </View>
          <View style={profileSummaryStyle}>
            {this.state.profile.city || this.state.profile.country ? this.renderSummary("Location") : null}
            {this.state.profile.position || this.state.profile.industry ? this.renderSummary("Industry") : null}
            {this.state.profile.institution ? this.renderSummary("Work") : null}
            {this.state.profile.faculty || this.state.profile.university ? this.renderSummary("Education") : null}
            {this.state.profile.phd=="true" ? this.renderSummary("Phd") : null}
            {this.state.profile.satisfactionScore ? this.renderSummary("Score") : null}
            {this.state.profile.hourlyRate || this.state.profile.currency ? this.renderSummary("Price") : null}
          </View>
          <View style={actionButtonContainer}>
            <View style={buttonStyle}>
              <TextButton>ABOUT</TextButton>
            </View>
            <View style={buttonStyle}>
              <TextButton>PHOTOS</TextButton>
            </View>
            <View style={buttonStyle}>
              <TextButton>FRIENDS</TextButton>
            </View>
          </View>
          <View style={{marginBottom: 10}}>
            <Posts />
          </View>
        </ScrollView>
      );
    } else {
        <Spinner size="large" />
    }
  }

  render() {
    return (
      <View>
        {this.renderContent()}
      </View>
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
  profileTitleStyle: {
    color: '#000',
    fontSize: 18,
    padding: 15
  },
  actionIconContainer: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#8B9DC3',
    flexDirection: 'row',
    transform: [ { translateY: -window.width/16 } ],
    paddingLeft: 5,
    paddingRight: 5
  },
  iconContainerStyle: {
    paddingLeft: 25,
    paddingRight: 25
  },
  profileSummaryStyle: {
    backgroundColor: '#FFF',
    marginTop: 5,
    paddingLeft: 30,
    paddingRight: 30
  },
  actionButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    marginTop: 5,
    paddingLeft: 30,
    paddingRight: 30
  },
  buttonStyle: {
    paddingLeft: 30,
    paddingRight: 30
  }
}

export default UserProfile;
