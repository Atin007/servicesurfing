import React, { Component } from 'react';

import {
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  Dimensions,
  TouchableHighlight
} from 'react-native';

import {
  Card,
  Avatar,
  Button
 } from 'react-native-elements';

import { toTitleCase } from '../helpers';
const window = Dimensions.get("window");

class PostItem extends Component {

  render() {
    const { post } = this.props;

    return (
      <Card>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <Avatar
            small
            source={{uri: post.picture.thumbnail}}
          />
          <View style={{padding: 10}}>
            <Text>
              {`${toTitleCase(post.name.first)} ${toTitleCase(post.name.last)}`}
            </Text>
          </View>
        </View>
        <View style={{flex: 1, paddingTop: 10, paddingBottom: 10}}>
          <Image
            source={post.image}
            resizeMode='cover'
            style={{width: null, height: 0.5*window.width}}
          />
          <Text style={{paddingTop: 10}}>{post.caption}</Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
          <TouchableHighlight>
            <Text style={{
              color: '#999999'
            }}>
              Comments
            </Text>
          </TouchableHighlight>
        </View>
      </Card>
    );
  }

}

export default PostItem;
