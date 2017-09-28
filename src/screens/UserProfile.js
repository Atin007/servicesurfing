import React, { Component } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import { CoverPic, DisplayPic, Spinner, TextButton } from '../components/common';
import { Icon } from 'react-native-elements';
import firebase from 'firebase';
const window = Dimensions.get("window");

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = { edit: null, loading: null, profile: null, profileID: null };
  }

  componentWillMount() {
    this.setState({loading: true, profile: null});

    const { currentUser } = firebase.auth();
    const { profileID } = this.props.navigation.state.params;
    this.setState({profileID: profileID});
    this.setState({edit: currentUser.uid == profileID ? true : false});

    firebase.database().ref(`/UserProfiles/${profileID}`)
      .on('value', snapshot => this.setState({profile: snapshot.val(), loading: false}));
  }

  renderIcons() {
    const { iconContainerStyle } = styles;

    if (this.state.edit) {
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
            onPress={() => {this.props.navigation.navigate('BookAppointment', {profileID: this.state.profileID, profile: this.state.profile})}}
            size={30}
            containerStyle={iconContainerStyle} />
          <Icon
            name='ios-person-add-outline'
            type='ionicon'
            color='#333'
            onPress={() => {}}
            size={35}
            containerStyle={iconContainerStyle} />
          <Icon
            name='ios-chatbubbles-outline'
            type='ionicon'
            color='#333'
            onPress={() => {}}
            size={28}
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
    const defaultDisplayPic = 'https://firebasestorage.googleapis.com/v0/b/servicesurfing-e6cbc.appspot.com/o/default-user.png?alt=media&token=899dcd9f-6951-4a61-b072-0818054a0840';
    const defaultCoverPic = 'https://firebasestorage.googleapis.com/v0/b/servicesurfing-e6cbc.appspot.com/o/antalya.jpg?alt=media&token=6069a6b6-d4e6-4f00-a474-e95a4ab438d5';

    if (!this.state.loading) {
      return (
        <ScrollView>
          <View style={topContainer}>
            <CoverPic source={this.state.profile.coverPic || defaultCoverPic} window={window} />
            <View style={dpContainer}>
              <DisplayPic source={this.state.profile.displayPic || defaultDisplayPic} window={window} />
              <Text style={profileTitleStyle}>
                {this.state.profile.firstName} {this.state.profile.lastName}
              </Text>
            </View>
            <View style={actionIconContainer}>
              {this.renderIcons()}
            </View>
          </View>
          <View style={profileSummaryStyle}>
            {this.state.profile.city || this.state.profile.country ? this.renderSummary("Location") : null}
            {this.state.profile.position || this.state.profile.industry ? this.renderSummary("Industry") : null}
            {this.state.profile.institution ? this.renderSummary("Work") : null}
            {this.state.profile.faculty || this.state.profile.university ? this.renderSummary("Education") : null}
            {this.state.profile.phd=="Yes" ? this.renderSummary("Phd") : null}
            {this.state.profile.satisfactionScore ? this.renderSummary("Score") : null}
            {this.state.profile.hourlyRate || this.state.profile.currency ? this.renderSummary("Price") : null}
          </View>
          <View style={actionButtonContainer}>
            <View style={buttonStyle}>
              <TextButton onPress={() => this.props.navigation.navigate('AboutUser', {profile: this.state.profile})}>ABOUT</TextButton>
            </View>
            <View style={buttonStyle}>
              <TextButton onPress={() => this.props.navigation.navigate('UserPhotos', {profileID: this.state.profileID})}>PHOTOS</TextButton>
            </View>
            <View style={buttonStyle}>
              <TextButton onPress={() => this.props.navigation.navigate('Friends', {profileID: this.state.profileID})}>FRIENDS</TextButton>
            </View>
          </View>
          <View style={{marginBottom: 10}}>
          </View>
        </ScrollView>
      );
    } else {
        return (
          <Spinner size="large" />
        );
    }
  }

  render() {
    return (
      <View style={{flex: 1}}>
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
    paddingLeft: 35,
    paddingRight: 35
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
