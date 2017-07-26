import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

import Home from '../screens/Home.js';
import FriendList from '../screens/FriendList';
import MenuList from '../screens/MenuList';
import NotificationList from '../screens/NotificationList';
import UserProfile from '../screens/UserProfile';

import { toTitleCase } from '../helpers';

export const Tabs = TabNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      title: 'Home',
      tabBarLabel: 'Home',
      tabBarIcon: ({ tintColor }) => <Icon name="ios-home-outline" size={35} color={tintColor} />,
    },
  },
  FriendList: {
    screen: FriendList,
    navigationOptions: {
      title: 'Friends',
      tabBarLabel: 'Friends',
      tabBarIcon: ({ tintColor }) => <Icon name="ios-contacts-outline" size={35} color={tintColor} />,
    },
  },
  NotificationList: {
    screen: NotificationList,
    navigationOptions: {
      title: 'Notifications',
      tabBarLabel: 'Notifications',
      tabBarIcon: ({ tintColor }) => <Icon name="ios-notifications-outline" size={35} color={tintColor} />
    },
  },
  MenuList: {
    screen: MenuList,
    navigationOptions: {
      title: 'Menu',
      tabBarLabel: 'Menu',
      tabBarIcon: ({ tintColor }) => <Icon name="ios-menu-outline" size={35} color={tintColor} />
    },
  },
},  {
  tabBarOptions: {
    showLabel: false
  },
});

export const Root = StackNavigator({
  Tabs: {
    screen: Tabs,
  },
  UserProfile: {
    screen: UserProfile,
    navigationOptions: ({ navigation }) => ({
      title: `${toTitleCase(navigation.state.params.name.first)} ${toTitleCase(navigation.state.params.name.last)}`,
    }),
  },
},);
