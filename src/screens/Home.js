import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import {
  SearchBar,
  Card,
  Avatar,
  Button
 } from 'react-native-elements';

import { posts, me } from '../config/data';
import { toTitleCase } from '../helpers';
const window = Dimensions.get("window");

class Home extends Component {

  render() {
    return (
      <View>
        <View>
          <SearchBar
            round
            lightTheme
            placeholder="Search"
          />
        </View>
        <ScrollView>
          <View>
            <Card>
              <View style={{flexDirection: 'row'}}>
                <Avatar
                  small
                  source={{uri: me.picture.large}}
                />
                <View style={{
                  flex: 1,
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                  <TouchableOpacity>
                    <Text style={{fontSize: 15}}>Share something with your friends!</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Card>
          </View>
          {posts.map((post, i) => (
            <Card key={i}>
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
                <TouchableOpacity>
                  <Text style={{
                    color: '#999999'
                  }}>
                    Comments
                  </Text>
                </TouchableOpacity>
              </View>
            </Card>
          ))}
        </ScrollView>
      </View>
    );
  }
}

export default Home;
