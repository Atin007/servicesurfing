import React from 'react';
import { Button } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

// import screens for setting up Navigation
import SignUp from '../screens/SignUp';
import Home from '../screens/Home';
import FriendList from '../screens/FriendList';
import MenuList from '../screens/MenuList';
import NotificationList from '../screens/NotificationList';
import UserProfile from '../screens/UserProfile';
import Policy from '../screens/Policy';
import ShareUpdate from '../screens/ShareUpdate';

// Convert a string to TitleCase (react native -> React Native, REACT NATIVE -> React Native, reAct nATive -> React Native)
import { toTitleCase } from '../helpers';

// Tab Navigator with 4 tabs (Home, Friends, Notifications, Menu)
export const Tabs = TabNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      title: 'Home',
      headerLeft: null,
      tabBarIcon: ({ tintColor, focused }) => (
        <Icon name={focused ? "ios-home" : "ios-home-outline"} size={35} color={tintColor} />
      ),
    },
  },
  Friends: {
    screen: FriendList,
    navigationOptions: {
      title: 'Search',
      headerLeft: null,
      tabBarIcon: ({ tintColor, focused }) => (
        <Icon name={focused ? "ios-search" : "ios-search-outline"} size={35} color={tintColor} />
      ),
    },
  },
  Notifications: {
    screen: NotificationList,
    navigationOptions: {
      title: 'Notifications',
      headerLeft: null,
      tabBarIcon: ({ tintColor, focused }) => (
        <Icon name={focused ? "ios-notifications" : "ios-notifications-outline"} size={35} color={tintColor} />
      ),
    },
  },
  Menu: {
    screen: MenuList,
    navigationOptions: {
      title: 'Menu',
      headerLeft: null,
      tabBarIcon: ({ tintColor, focused }) => (
        <Icon name={focused ? "ios-menu" : "ios-menu-outline"} size={35} color={tintColor} />
      ),
    },
  },
// },  {
//   tabBarOptions: {
//     showLabel: false
//   },
});

// Root Stack containing SignUp and containing SignUp and TabNavigator
export const Root = StackNavigator({
  SignUp: {
    screen: SignUp,
    navigationOptions: {
      title: 'Login',
      headerLeft: null,
    },
  }, Tabs: {
      screen: Tabs,
  }, UserProfile: {
      screen: UserProfile,
      navigationOptions: ({ navigation }) => ({
        title: `${toTitleCase(navigation.state.params.name.first)} ${toTitleCase(navigation.state.params.name.last)}`,
      }),
  }, Policy: {
      screen: Policy,
      navigationOptions: {
        title: 'Privacy Policy',
      },
  }, Share: {
      screen: ShareUpdate,
      navigationOptions: {
        title: 'Share',
      },
    },
},);
