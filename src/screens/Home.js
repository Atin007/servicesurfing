import React, { Component } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Button, Card, CardSection, PostItem, Spinner, TextButton } from '../components/common';
import { DEFAULT_DISPLAY_PIC } from '../defaults';
import { Avatar } from 'react-native-elements';
import firebase from 'firebase';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {profile: null, loading: null, Posts: []};
    this.currentUser = firebase.auth().currentUser;
    this.UserProfilesRef = firebase.database().ref('/UserProfiles');
    this.FriendsRef = firebase.database().ref('/Friends');
    this.PostsRef = firebase.database().ref('/Posts');
    this.Posts = [];
  }

  componentWillMount() {
    this.setState({loading: true, profile: null});

    this.UserProfilesRef.child(this.currentUser.uid)
      .on('value', snapshot => this.setState({profile: snapshot.val(), loading: false}));

    this.FriendsRef.child(this.currentUser.uid).on('child_added', snapshot => {
      this.PostsRef.orderByChild('userID').equalTo(snapshot.val().userID).on('child_added', snapshot => {
        this.Posts = [ snapshot.val(), ...this.Posts ];
        this.Posts.sort(function(a, b) {
          return a.timeMS - b.timeMS;
        });
        this.setState({Posts: this.Posts});
      });
    });

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
    const { containerStyle, shareCardStyle, subTitleStyle } = styles;
    if(!this.state.loading) {
      return (
        <View style={containerStyle}>
          <Card>
            <CardSection>
              <View style={shareCardStyle}>
                <View style={{padding: 10}}>
                  <Avatar small source={{uri: this.state.profile.displayPic || DEFAULT_DISPLAY_PIC}} />
                </View>
                <View style={{paddingRight: 10}}>
                  <TextButton onPress={() => this.props.navigation.navigate('Share', {imagePath: ''})}>Share something!</TextButton>
                </View>
              </View>
            </CardSection>
          </Card>
          <Text style={subTitleStyle}>New Posts</Text>
          <ScrollView>
            <View style={{marginBottom: 10}}>
              {this.renderPosts()}
            </View>
          </ScrollView>
        </View>
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
  containerStyle: {
    flex: 1
  },
  shareCardStyle: {
    alignItems: 'center',
    flex: 1,
    flexDirection:'row'
  },
  subTitleStyle: {
    backgroundColor: 'transparent',
    color: '#333',
    fontSize: 18,
    margin: 15
  }
}

export default Home;
