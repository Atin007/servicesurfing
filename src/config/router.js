import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

import Home from '../screens/Home.js';
import FriendList from '../screens/FriendList';
import MenuList from '../screens/MenuList';
import NotificationList from '../screens/NotificationList';

export const HomeStack = StackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      title: 'Home',
    },
  },
});

export const FriendListStack = StackNavigator({
  Friends: {
    screen: FriendList,
    navigationOptions: {
      title: 'Friends',
    },
  },
});

export const NotificationListStack = StackNavigator({
  Notifications: {
    screen: NotificationList,
    navigationOptions: {
      title: 'Notifications',
    },
  },
});

export const MenuListStack = StackNavigator({
  Menu: {
    screen: MenuList,
    navigationOptions: {
      title: 'Menu',
    },
  },
});

export const Tabs = TabNavigator({
  Home: {
    screen: HomeStack,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: ({ tintColor }) => <Icon name="ios-home-outline" size={35} color={tintColor} />,
    },
  },
  FriendList: {
    screen: FriendListStack,
    navigationOptions: {
      tabBarLabel: 'Friends',
      tabBarIcon: ({ tintColor }) => <Icon name="ios-contacts-outline" size={35} color={tintColor} />,
    },
  },
  NotificationList: {
    screen: NotificationListStack,
    navigationOptions: {
      tabBarLabel: 'Notifications',
      tabBarIcon: ({ tintColor }) => <Icon name="ios-notifications-outline" size={35} color={tintColor} />
    },
  },
  MenuList: {
    screen: MenuListStack,
    navigationOptions: {
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
}, {
  mode: 'modal',
  headerMode: 'none',
});
