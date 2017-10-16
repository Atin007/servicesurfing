import React, { Component } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import { CoverPic, DisplayPic, PostItem, Spinner, TextButton } from '../components/common';
import { DEFAULT_DISPLAY_PIC, DEFAULT_COVER_PIC } from '../defaults';
import { Icon } from 'react-native-elements';
import firebase from 'firebase';
const window = Dimensions.get("window");

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = { currentUser: null, edit: null, friend: null, loading: null, profile: null, profileID: null, Posts: [] };
    this.currentUser = firebase.auth().currentUser;
    this.UserProfilesRef = firebase.database().ref('/UserProfiles');
    this.FriendsRef = firebase.database().ref('/Friends');
    this.PostsRef = firebase.database().ref('/Posts');
    this.Posts = [];
  }

  componentWillMount() {
    this.setState({loading: true, profile: null});

    const { profileID } = this.props.navigation.state.params;
    this.setState({profileID: profileID});
    this.setState({edit: this.currentUser.uid == profileID ? true : false});

    this.FriendsRef.child(this.currentUser.uid).orderByChild('userID').equalTo(profileID).on('child_added', snapshot => {
      var status = snapshot.val().status;
      if(status == 'pending') {
        this.setState({'friend': false});
      } else if(status == 'accepted') {
        this.setState({friend: true})
      }
    });

    this.UserProfilesRef.child(this.currentUser.uid).on('value', snapshot => this.setState({currentUser: snapshot.val()}));

    this.UserProfilesRef.child(profileID).on('value', snapshot => this.setState({profile: snapshot.val(), loading: false}));

    this.PostsRef.orderByChild("userID").equalTo(profileID).on('child_added', snapshot => {
      this.Posts = [snapshot.val(), ...this.Posts];
      this.setState({Posts: this.Posts});
    });
  }

  sendFriendRequest() {
    this.setState({friend: false});
    this.FriendsRef.child(this.state.profileID).push({
      from: this.currentUser.uid,
      to: this.state.profileID,
      userID: this.currentUser.uid,
      status: 'pending'
    }).then(() => {
        this.FriendsRef.child(this.currentUser.uid).push({
          from: this.currentUser.uid,
          to: this.state.profileID,
          userID: this.state.profileID,
          status: 'pending'
        });
    });
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
            name={this.state.friend==null ? 'ios-person-add-outline' : 'ios-person-outline'}
            type='ionicon'
            color={this.state.friend ? '#06A0A2' : '#333'}
            onPress={this.state.friend==null ? () => {this.sendFriendRequest()} : () => {}}
            size={35}
            containerStyle={iconContainerStyle} />
          <Icon
            name='ios-chatbubbles-outline'
            type='ionicon'
            color='#333'
            onPress={() => {this.props.navigation.navigate('ChatView', {title: this.state.profile.firstName + ' ' + this.state.profile.lastName, profileID: this.state.profileID})}}
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

  renderPosts() {
    return(
      <View>
        {this.state.Posts.map((post, i) => (
          <PostItem
            key={i}
            userID={post.userID}
            avatarImage={post.userPic || DEFAULT_DISPLAY_PIC}
            userName={post.userName}
            onPress={() => this.props.navigation.navigate('UserProfile', {profileID: post.userID, title: post.userName})}
            postText={post.postText}
            postImageURL={post.imageURL}
          />
        ))}
      </View>
    );
  }

  renderContent() {
    const { topContainer, dpContainer, profileTitleStyle, actionIconContainer, profileSummaryStyle, actionButtonContainer, buttonStyle, subTitleStyle } = styles;
    if (!this.state.loading) {
      return (
        <ScrollView>
          <View style={topContainer}>
            <CoverPic source={this.state.profile.coverPic || DEFAULT_COVER_PIC} window={window} />
            <View style={dpContainer}>
              <DisplayPic source={this.state.profile.displayPic || DEFAULT_DISPLAY_PIC} window={window} />
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
            <Text style={subTitleStyle}>{this.state.profile.firstName}'s Posts</Text>
            {this.renderPosts()}
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
  },
  subTitleStyle: {
    backgroundColor: 'transparent',
    color: '#333',
    fontSize: 18,
    margin: 15
  }
}

export default UserProfile;
