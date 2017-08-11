import React, { Component } from 'react';
import { View } from 'react-native';
import PostItem from '../components/PostItem';
import { posts, me } from '../config/data';

class Posts extends Component {

  render() {
    return (
      <View>
        {posts.map((post, i) => (
          <PostItem post={post} key={i} />
        ))}
      </View>
    );
  }
  
}

export default Posts;
