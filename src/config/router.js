import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

import SignUp from '../screens/SignUp';
import Home from '../screens/Home';
import FriendList from '../screens/FriendList';
import MenuList from '../screens/MenuList';
import NotificationList from '../screens/NotificationList';
import UserProfile from '../screens/UserProfile';
import Policy from '../screens/Policy';

import { toTitleCase } from '../helpers';

export const Tabs = TabNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      title: 'Home',
      tabBarLabel: 'Home',
      tabBarIcon: ({ tintColor, focused }) => (
        <Icon name={focused ? "ios-home" : "ios-home-outline"} size={35} color={tintColor} />
      ),
    },
  },
  FriendList: {
    screen: FriendList,
    navigationOptions: {
      title: 'Friends',
      tabBarLabel: 'Friends',
      tabBarIcon: ({ tintColor, focused }) => (
        <Icon name={focused ? "ios-contacts" : "ios-contacts-outline"} size={35} color={tintColor} />
      ),
    },
  },
  NotificationList: {
    screen: NotificationList,
    navigationOptions: {
      title: 'Notifications',
      tabBarLabel: 'Notifications',
      tabBarIcon: ({ tintColor, focused }) => (
        <Icon name={focused ? "ios-notifications" : "ios-notifications-outline"} size={35} color={tintColor} />
      ),
    },
  },
  MenuList: {
    screen: MenuList,
    navigationOptions: {
      title: 'Menu',
      tabBarLabel: 'Menu',
      tabBarIcon: ({ tintColor, focused }) => (
        <Icon name={focused ? "ios-menu" : "ios-menu-outline"} size={35} color={tintColor} />
      ),
    },
  },
},  {
  tabBarOptions: {
    showLabel: false
  },
});

export const SignUpStack = StackNavigator({
  SignUp: {
    screen: SignUp,
    navigationOptions: {
      title: 'SignUp',
    },
  },
},{
  mode: 'modal',
  headerMode: 'none',
});

export const PolicyStack = StackNavigator({
  Policy: {
    screen: Policy,
    navigationOptions: {
      title: 'Privacy Policy',
    },
  },
},{
  mode: 'modal',
  headerMode: 'none',
});

export const Root = StackNavigator({
  SignUp: {
    screen: SignUpStack,
    navigationOptions: {
      headerBackTitle: null
    },
  },
  Tabs: {
    screen: Tabs,
  },
  UserProfile: {
    screen: UserProfile,
    navigationOptions: ({ navigation }) => ({
      title: `${toTitleCase(navigation.state.params.name.first)} ${toTitleCase(navigation.state.params.name.last)}`,
    }),
  },
  Policy: {
    screen: PolicyStack
  }
},);
