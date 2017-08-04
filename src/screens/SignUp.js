import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  Dimensions } from 'react-native';

  const window = Dimensions.get("window");

  import {
    Tile,
    Button
   } from 'react-native-elements';

class SignUp extends Component {

  render() {
    return (
      <ScrollView style={styles.containerStyle}>
        <View style={styles.coverPicContainer}>
          {/* <Image
            resizeMode='contain'
            style={{height: 7*window.width/20}}
            source={require('../assets/images/cover_pic.jpg')}
          /> */}
          <View
            style={{
              // transform: [
              //   {
              //     translateY: -window.width/16
              //   }
              // ],
              alignItems: 'center'
            }}>
            <Image
              source={require('../assets/images/servicesurfing.png')}
              resizeMode='cover'
              style={{
                height: 2*window.width/10,
                width: 2*window.width/10,
                marginTop: 30,
                borderColor: '#FFF',
                borderWidth: 2
              }}
            />
            <Text style={{fontSize: 20, padding: 10}}>
              ServiceSurfing
            </Text>
          </View>
          <View style={{paddingTop: 25}}>
            <Text style={styles.textStyle}>Hire Professionals around the world</Text>
            <Text style={styles.textStyle}>Share articles, videos and images</Text>
            <Text style={styles.textStyle}>Invite your facebook friends</Text>
          </View>
        </View>
        <View style={{padding: 20}}>
          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
            <Button
              raised
              title="Sign up"
              color="#2998E4"
              backgroundColor="#FFF"
              borderRadius={5}
              fontSize={16}
              buttonStyle={{borderWidth: 1, borderColor: "#2998E4"}}
              containerViewStyle={{flex: 1, padding: 10, paddingRight: 5}}
              onPress={() => { this.props.navigation.navigate('Tabs') }}
            />
            <Button
              raised
              title="Login"
              color="#2998E4"
              borderRadius={5}
              fontSize={16}
              backgroundColor="#FFF"
              buttonStyle={{borderWidth: 1, borderColor: "#2998E4"}}
              containerViewStyle={{flex: 1, padding: 10, paddingLeft: 5}}
              onPress={() => { this.props.navigation.navigate('Tabs') }}
            />
          </View>
          <View>
            <Button
              raised
              icon={{name: "logo-google", type: "ionicon", color: "#DB4437"}}
              title="Continue with Google"
              color="#DB4437"
              backgroundColor="#FFF"
              borderRadius={5}
              fontSize={16}
              buttonStyle={{borderWidth: 1, borderColor: "#DB4437"}}
              containerViewStyle={{flex: 1, padding: 10}}
              onPress={() => { this.props.navigation.navigate('Tabs') }}
            />
          </View>
          <View>
            <Button
              raised
              icon={{name: 'logo-facebook', type: 'ionicon', color: "#1563A0"}}
              title="Continue with facebook"
              color="#1563A0"
              backgroundColor="#FFF"
              borderRadius={5}
              fontSize={16}
              buttonStyle={{borderWidth: 1, borderColor: "#1563A0"}}
              containerViewStyle={{flex: 1, padding: 10}}
              onPress={() => { this.props.navigation.navigate('Tabs') }}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = {
  containerStyle: {
    flex: 1,
    backgroundColor: '#FFF'
  },
  coverPicContainer: {
    alignItems: 'center'
  },
  textStyle: {
    fontSize: 16,
    padding: 10
  }
};

export default SignUp;
