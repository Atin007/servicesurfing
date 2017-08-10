import React from 'react';
import { Button } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

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

// Convert a string to TitleCase
import { toTitleCase } from '../helpers';

// Tab Navigator with 4 tabs (Home, Search, Notifications, Menu)
export const Tabs = TabNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      title: 'Home',
      headerLeft: null,
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
      navigationOptions: {
        title: 'Share',
      },
    },
},);
