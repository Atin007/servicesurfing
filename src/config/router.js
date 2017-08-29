import React from 'react';
import { View, Text, Button, Platform } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import { NavigationActions, TabBarBottom } from 'react-navigation';

// Screens for the Tab Navigator
import Home from '../screens/Home';
import Search from '../screens/Search';
import Notifications from '../screens/Notifications';
import Menu from '../screens/Menu';

// Screens for the Root Navigator alongside the TabNavigator
import Login from '../screens/Login';
import UserProfile from '../screens/UserProfile';
import Friends from '../screens/Friends';
import PrivacyPolicy from '../screens/PrivacyPolicy';
import Share from '../screens/Share';
import AboutUser from '../screens/AboutUser';
import UserPhotos from '../screens/UserPhotos';
import BookAppointment from '../screens/BookAppointment';
import Appointments from '../screens/Appointments';
import SignUpEmail from '../screens/SignUpEmail';
import SignInEmail from '../screens/SignInEmail';
import EditProfile from '../screens/EditProfile';

// Convert a string to TitleCase
import { toTitleCase } from '../helpers';

// Tab Navigator with 4 tabs (Home, Search, Notifications, Menu)
export const Tabs = TabNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      title: 'Home',
      headerLeft: (
        <View style={{paddingLeft: 15}}>
          <Icon name="camera" type='entypo' size={22} color="#42424C" onPress={null} />
        </View>),
      headerRight: (
        <View style={{paddingRight: 15}}>
          <Icon name="message" type='entypo' size={24} color="#42424C" onPress={null} />
        </View>),
      tabBarIcon: ({ tintColor, focused }) => (
        <Icon name={focused ? "ios-home" : "ios-home-outline"} type='ionicon' size={35} color={tintColor} />
      ),
    },
  },
  Search: {
    screen: Search,
    navigationOptions: {
      title: 'Search',
      headerLeft: null,
      tabBarIcon: ({ tintColor, focused }) => (
        <Icon name={focused ? "ios-search" : "ios-search-outline"} type='ionicon' size={35} color={tintColor} />
      ),
    },
  },
  Notifications: {
    screen: Notifications,
    navigationOptions: {
      title: 'Notifications',
      headerLeft: null,
      tabBarIcon: ({ tintColor, focused }) => (
        <Icon name={focused ? "ios-notifications" : "ios-notifications-outline"} type='ionicon' size={35} color={tintColor} />
      ),
    },
  },
  Menu: {
    screen: Menu,
    navigationOptions: {
      title: 'Menu',
      headerLeft: null,
      tabBarIcon: ({ tintColor, focused }) => (
        <Icon name={focused ? "ios-menu" : "ios-menu-outline"} type='ionicon' size={35} color={tintColor} />
      ),
    },
  },
}, {
    tabBarComponent: TabBarBottom,
    tabBarPosition: Platform.OS == 'ios' ? 'bottom' : 'top',
    tabBarOptions: {
      showLabel: false,
    },
});

// Root StackNavigator containing all the Screen alongwith Tabs (TabNavigator)
export const Root = StackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      title: 'Login',
      headerLeft: null,
    },
  }, SignUpEmail: {
    screen: SignUpEmail,
    navigationOptions: {
      title: 'Sign up using Email',
    },
  }, SignInEmail: {
    screen: SignInEmail,
    navigationOptions: {
      title: 'Login using Email',
    },
  }, Tabs: {
      screen: Tabs,
  }, UserProfile: {
      screen: UserProfile,
      navigationOptions: ({ navigation }) => ({
        title: `${toTitleCase(navigation.state.params.name.first)} ${toTitleCase(navigation.state.params.name.last)}`,
      }),
  }, Friends: {
      screen: Friends,
      navigationOptions: {
        title: 'Friends',
      },
  }, PrivacyPolicy: {
      screen: PrivacyPolicy,
      navigationOptions: {
        title: 'Privacy Policy',
      },
  }, Share: {
      screen: Share,
      navigationOptions: ({ navigation }) => ({
        title: 'Share',
        headerRight: <Button title="POST" onPress={() => navigation.goBack()} />
      }),
  }, UserPhotos: {
      screen: UserPhotos,
      navigationOptions: ({ navigation }) => ({
        title: 'Photos',
      }),
  }, AboutUser: {
      screen: AboutUser,
      navigationOptions: ({ navigation }) => ({
        title: 'About',
      }),
  }, BookAppointment: {
      screen: BookAppointment,
      navigationOptions: ({ navigation }) => ({
        title: 'Book an Appointment',
      }),
  }, Appointments: {
      screen: Appointments,
      navigationOptions: ({ navigation }) => ({
        title: 'My Appointments',
      }),
  }, EditProfile: {
      screen: EditProfile,
      navigationOptions: ({ navigation }) => ({
        title: 'Edit Profile',
      }),
  },
},);
