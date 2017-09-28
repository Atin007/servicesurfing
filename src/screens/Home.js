import React, { Component } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Button, Card, CardSection, PostItem, Spinner, TextButton } from '../components/common';
import { Avatar } from 'react-native-elements';
import firebase from 'firebase';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {profile: null, loading: null};
  }

  componentWillMount() {
    this.setState({loading: true, profile: null});
    const { currentUser } = firebase.auth();

    firebase.database().ref(`/UserProfiles/${currentUser.uid}`)
      .on('value', snapshot => this.setState({profile: snapshot.val(), loading: false}));

    this.posts = [{
      userID: currentUser.uid,
      userFirstName: 'Atin',
      userLastName: 'Mathur',
      userDisplayPic: '',
      postText: 'I am feeling happy today',
      postImageURL: 'https://firebasestorage.googleapis.com/v0/b/servicesurfing-e6cbc.appspot.com/o/antalya.jpg?alt=media&token=6069a6b6-d4e6-4f00-a474-e95a4ab438d5',
      likes: 10,
      comments: 20
    }];
  }

  renderContent() {
    const defaultDisplayPic = 'https://firebasestorage.googleapis.com/v0/b/servicesurfing-e6cbc.appspot.com/o/default-user.png?alt=media&token=899dcd9f-6951-4a61-b072-0818054a0840';

    if(!this.state.loading) {
      return (
        <View style={{flex: 1}}>
          <Card>
            <CardSection>
              <View style={{flex: 1, flexDirection:'row', height: 40, alignItems: 'center'}}>
                <View style={{padding: 10}}>
                  <Avatar small source={{uri: this.state.profile.displayPic || defaultDisplayPic}} />
                </View>
                <View style={{paddingRight: 5}}>
                  <TextButton onPress={() => this.props.navigation.navigate('Share')}>Share something with your friends!</TextButton>
                </View>
              </View>
            </CardSection>
          </Card>
          <ScrollView>
            {this.posts.map((post, i) => (
              <PostItem
                key={i}
                userID={post.userID}
                avatarImage={post.userDisplayPic || defaultDisplayPic}
                userName={post.userFirstName + ' ' + post.userLastName}
                onPress={() => this.props.navigation.navigate('UserProfile', {profileID: post.userID, title: post.userName})}
                postText={post.postText}
                postImageURL={post.postImageURL}
              />
            ))}
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

export default Home;
