import React, { Component } from 'react';
import { KeyboardAvoidingView, ScrollView, Text, TextInput, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import { List, ListItem, SearchBar, TextButton } from '../components/common';
import { DEFAULT_DISPLAY_PIC } from '../defaults';
import firebase from 'firebase';

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {Comments: [], comment: '', showView: false, postKey: ''};
    this.Comments = [];
    this.currentUser = firebase.auth().currentUser;
    this.UserProfilesRef = firebase.database().ref('/UserProfiles');
    this.PostsRef = firebase.database().ref('/Posts');
  }

  componentWillMount() {
    const { postKey } = this.props.navigation.state.params;
    this.setState({postKey: postKey});

    this.PostsRef.child(`${postKey}/postComments`).on('child_added', snapshot => {
      var comments = snapshot.val().comment;
      console.log(comments);
      var key = snapshot.val().userID;
      this.UserProfilesRef.child(key).on('value', snapshot => {
        var data = {
          userID: key,
          displayPic: snapshot.val().displayPic || DEFAULT_DISPLAY_PIC,
          userName: snapshot.val().firstName + ' ' + snapshot.val().lastName,
          comments: comments
        }
        this.Comments = [...this.Comments, data];
        this.setState({Comments: this.Comments});
      });
    });
  }

  renderComments() {
    const { textStyle } = styles;
    return (
      <View style={{flex: 1}}>
        <List>
          {this.state.Comments.map((user, i) => (
            <ListItem key={i} onPress={() => this.props.navigation.navigate('UserProfile', {profileID: user.userID, title: user.userName})}>
              <Avatar small rounded source={{uri:user.displayPic }} />
              <View style={{margin: 5}}>
                <Text style={textStyle}>{user.userName}</Text>
                <Text style={[textStyle, {fontSize: 14}]}>{user.comments}</Text>
              </View>
            </ListItem>
          ))}
        </List>
      </View>
    );
  }

  renderView() {
    if(this.state.showView) {
      return (
        <View style={{height: 60}}></View>
      );
    } else {
      return null;
    }
  }

  handleCommentPress(postKey) {
    var options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };

    if(this.state.message != '') {
      this.PostsRef.child(`${postKey}/postComments/`).push({
        userID: this.currentUser.uid,
        comment: this.state.comment,
        timestamp: new Date().toLocaleString('en-US', options)
      });
      this.setState({comment: ''});
    }
  }

  render() {
    const { containerStyle, inputContainerStyle, inputStyle } = styles;

    return (
      <KeyboardAvoidingView behavior='padding' style={containerStyle}>
        <ScrollView ref={ref => this.scrollView = ref} onContentSizeChange={(contentWidth, contentHeight)=>{ this.scrollView.scrollToEnd({animated: true});}}>
          {this.renderComments()}
        </ScrollView>
        <View style={inputContainerStyle}>
          <TextInput
            multiline={true}
            placeholder="Comment"
            value={this.state.comment}
            style={inputStyle}
            onFocus={() => this.setState({showView: true})}
            onBlur={() => this.setState({showView: false})}
            onChangeText={comment => this.setState({comment})}/>
          <TextButton buttonColor='#06A0A2' onPress={() => this.handleCommentPress(this.state.postKey)}>Comment</TextButton>
        </View>
        {this.renderView()}
      </KeyboardAvoidingView>
    );
  }
}

const styles = {
  containerStyle: {
    backgroundColor: '#FFF',
    flex: 1
  },
  inputContainerStyle: {
    borderColor: '#ddd',
    borderTopWidth: 1,
    flexDirection: 'row',
    maxHeight: 120,
    padding: 10
  },
  inputStyle: {
    flex: 2,
    fontSize: 16
  },
  textStyle: {
    color:'#333',
    fontSize: 16,
    marginLeft: 10
  }
};

export default Comments;
