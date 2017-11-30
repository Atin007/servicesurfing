import React, { Component } from 'react';
import { Dimensions, Image, Text, TextInput, View } from 'react-native';
import { Button, Card, TextButton } from './';
import { Avatar } from 'react-native-elements';
const window = Dimensions.get("window");

const PostItem = ({userID, avatarImage, userName, postText='', postImageURL='', onPress, onLike, onComment, toLikes, toComments}) => {
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
        <View style={lineStyle}>
          <Text onPress={toLikes} style={[postTextStyle, {color: '#06A0A2'}]}>Likes</Text>
          <Text onPress={toComments} style={[postTextStyle, {color: '#06A0A2'}]}>Comments</Text>
        </View>
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around'}}>
          <TextButton onPress={onLike}>Like</TextButton>
          <TextButton onPress={onComment}>Comment</TextButton>
        </View>
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
