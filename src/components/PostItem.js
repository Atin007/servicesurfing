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

// import { toTitleCase } from '../helpers';
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
              {/* {`${toTitleCase(post.name.first)} ${toTitleCase(post.name.last)}`} */}
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
              paddingRight: 10,
              color: '#999999'
            }}>
              11 Likes
            </Text>
          </TouchableHighlight>
          <TouchableHighlight>
            <Text style={{
              paddingLeft: 5,
              color: '#999999'
            }}>
              5 Comments
            </Text>
          </TouchableHighlight>
        </View>
        <View style={{
          flexDirection: 'row',
          flex: 1,
          paddingTop: 15,
          justifyContent: 'space-around',
          alignItems: 'center'
        }}>
          <TouchableHighlight underlayColor="#FFF" onPress={() => {console.log('hello')}}>
            <Text style={{
              fontSize: 16,
              fontWeight: 'bold',
              paddingRight: 10,
              color: '#000'
            }}>
              Like
            </Text>
          </TouchableHighlight>
          <TouchableHighlight underlayColor="#FFF" onPress={() => {console.log('hello')}}>
            <Text style={{
              fontSize: 16,
              fontWeight: 'bold',
              paddingLeft: 10,
              color: '#000'
            }}>
              Comment
            </Text>
          </TouchableHighlight>
        </View>
      </Card>
    );
  }

}

export default PostItem;
