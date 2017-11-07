import React, { Component } from 'react';
import { Dimensions, Image, Text, TextInput, View } from 'react-native';
import { Button, Card, TextButton } from './';
import { Avatar } from 'react-native-elements';
const window = Dimensions.get("window");

const PostItem = ({userID, avatarImage, userName, postText='', postImageURL='', onPress, postLikes=0, postComments=0}) => {
  const { postContainerStyle, postTextStyle, lineStyle, imageContainerStyle } = styles;

  return (
    <Card>
      <View style={postContainerStyle}>
        <View style={lineStyle}>
          <View style={{padding: 10}}>
            <Avatar small source={{uri: avatarImage}} onPress={onPress} />
          </View>
          <View style={{paddingRight: 5}}>
            <TextButton onPress={onPress}>{userName}</TextButton>
          </View>
        </View>
        <View style={lineStyle}>
          <Text style={postTextStyle}>{postText}</Text>
        </View>
        {postImageURL=='' ? <View></View> : <View style={imageContainerStyle}><Image
          source={{uri: postImageURL}}
          resizeMode='contain'
          style={{height: 0.5*window.width, width: 0.9*window.width}}
        /></View>}
        {/* <View style={lineStyle}>
          <Text style={postTextStyle}>{postLikes} Likes</Text>
          <Text style={postTextStyle}>{postComments} Comments</Text>
        </View> */}
      </View>
    </Card>
  );
};

const styles = {
  postContainerStyle: {
    backgroundColor: '#FFF',
    padding: 5,
    position: 'relative'
  },
  lineStyle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  imageContainerStyle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    backgroundColor: '#ddd'
  },
  postTextStyle: {
    padding: 10,
    fontSize: 16
  }
}

export { PostItem };
