import React, { Component } from 'react';
import { Dimensions, KeyboardAvoidingView, ScrollView, Text, TextInput, View } from 'react-native';
import { List, ListItem, TextButton } from '../components/common';
import firebase from 'firebase';

class ChatView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      showView: false,
      messages: []
    };
    this.currentUser = firebase.auth().currentUser;
    this.friendID = this.props.navigation.state.params.profileID;
    this.MessagesRef = firebase.database().ref('/Messages');
    this.messages = [];
  }

  componentWillMount() {
    this.MessagesRef.on('child_added', (snapshot) => {
      var fromVal = snapshot.val().from;
      var toVal = snapshot.val().to;
      if((fromVal == this.currentUser.uid && toVal == this.friendID) || (fromVal == this.friendID && toVal == this.currentUser.uid)) {
        this.messages = [ ...this.messages, snapshot.val() ];
        this.setState({messages: this.messages});
      }
    });
  }

  renderMessages() {
    return(
      <View style={{padding: 10}}>
        {this.state.messages.map((message, i) => (
          <View key={i} style={{padding: 5}}>
            <View style={{
              alignSelf: message.from == this.friendID ? 'flex-start' : 'flex-end',
              backgroundColor: message.from == this.friendID ? '#ddd' : '#06A0A2',
              borderRadius: 5,
              maxWidth: Dimensions.get('window').width/2,
              padding: 10
            }}>
              <Text style={{
                color: message.from == this.friendID ? '#000' : '#FFF',
              }}>{message.message}</Text>
              <Text style={{
                alignSelf: 'flex-end',
                color: message.from == this.friendID ? '#000' : '#FFF',
                fontSize: 10,
                marginTop: 5
              }}>{message.timestamp}</Text>
            </View>
          </View>
        ))}
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

  handleSendPress() {
    if(this.state.message != '') {
      this.MessagesRef.push({
        from: this.currentUser.uid,
        to: this.friendID,
        message: this.state.message,
        timestamp: new Date().toLocaleString()
      });
      this.setState({message: ''});
    }
  }

  render() {
    const { containerStyle, inputContainerStyle, inputStyle } = styles;

    return (
      <KeyboardAvoidingView behavior='padding' style={containerStyle}>
        <ScrollView
          ref={ref => this.scrollView = ref}
          onContentSizeChange={(contentWidth, contentHeight)=>{
              this.scrollView.scrollToEnd({animated: true});
        }}>
          {this.renderMessages()}
        </ScrollView>
        <View style={inputContainerStyle}>
          <TextInput
            multiline={true}
            placeholder="Type your message"
            value={this.state.message}
            style={inputStyle}
            onFocus={() => this.setState({showView: true})}
            onBlur={() => this.setState({showView: false})}
            onChangeText={message => this.setState({message})}
          />
          <TextButton buttonColor='#06A0A2' onPress={() => this.handleSendPress()}>Send</TextButton>
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
  }
};

export default ChatView;
