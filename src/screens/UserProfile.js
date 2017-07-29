import React, { Component } from 'react';
import { View, ScrollView, Image, Text, Dimensions } from 'react-native';
import { Icon, Divider } from 'react-native-elements';

import { toTitleCase } from '../helpers';
const window = Dimensions.get("window");

class UserProfile extends Component {

  render() {
    const user = this.props.navigation.state.params;
    return (
      <ScrollView>
        <View
          style={
            {
              flex: 1,
              alignItems: 'center',
              backgroundColor: '#FFF'
            }
          }>
          <Image
            source={require('../assets/images/antalya.jpg')}
            resizeMode='cover'
            style={{height: 0.5*window.width, width: window.width}}
          />
          <View
            style={{
              transform: [
                {
                  translateY: -window.width/8
                }
              ],
              alignItems: 'center'
            }}>
            <Image
              source={{uri: user.picture.large}}
              resizeMode='cover'
              style={{
                height: window.width/4,
                width: window.width/4,
                paddingBottom: 0,
                // borderWidth: 6,
                borderColor: '#FFF'
              }}
            />
            <Text style={{padding:5, color: '#000', fontSize: 15}}>
              {toTitleCase(user.name.first)} {toTitleCase(user.name.last)}
            </Text>
            <View style={{flexDirection: 'row'}}>
              <Icon
                name='ios-calendar-outline'
                type='ionicon'
                color='#32CD32'
                onPress={() => console.log('hello')}
                size={25}
                containerStyle={{paddingRight: 40, paddingTop: 10}}
              />
              <Icon
                name='ios-person-outline'
                type='ionicon'
                color='#32CD32'
                onPress={() => console.log('hello')}
                size={29}
                containerStyle={{paddingRight: 40, paddingTop: 10}}
              />
              <Icon
                name='ios-mail-outline'
                type='ionicon'
                color='#32CD32'
                onPress={() => console.log('hello')}
                size={34}
                containerStyle={{paddingRight: 40, paddingTop: 10}}
              />
              <Icon
                name='md-more'
                type='ionicon'
                color='#32CD32'
                onPress={() => console.log('hello')}
                size={28}
                containerStyle={{paddingTop: 10}}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }

}
export default UserProfile;
