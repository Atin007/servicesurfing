import React, { Component } from 'react';
import { View, Text, Image, ScrollView, TextInput } from 'react-native';
import { SearchBar, Card, Avatar } from 'react-native-elements';
import { posts, me } from '../config/data';


class Home extends Component {

  toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{paddingBottom: 10}}>
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
                  medium
                  source={{uri: me.picture.large}}
                />
                <View style={{paddingLeft: 15}}>
                  <TextInput
                    placeholder="Share Something!"
                    multiline={true}
                    numberOfLines={6}
                    style={{flex: 1,
                      flexDirection: 'row',
                      width: 250,
                      fontSize: 14,
                      borderColor: '#F1F1F1',
                      borderWidth: 2,
                      padding: 5
                    }}
                  />
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
                    {`${this.toTitleCase(post.name.first)} ${this.toTitleCase(post.name.last)}`}
                  </Text>
                </View>
              </View>
              <View style={{flex: 1, paddingTop: 10}}>
                <Image
                  source={post.image}
                  resizeMode='cover'
                  style={{width: null, height: 200}}
                />
                <Text style={{paddingTop: 10}}>{post.caption}</Text>
              </View>
            </Card>
          ))}
        </ScrollView>
      </View>
    );
  }

}

export default Home;
