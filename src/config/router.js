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

// Stack Navigator for the SignUp page
export const SignUpStack = StackNavigator({
  SignUp: {
    screen: SignUp,
    navigationOptions: {
      title: 'SignUp',
    },
  },
},);

// Stack navigator for Friends
export const FriendListStack = StackNavigator({
  FriendList: {
    screen: FriendList,
    navigationOptions: {
      title: 'Friends',
    }
  },
}, {
  mode: 'card',
  headerMode: 'none',
});

// Stack navigator for User Profile
export const UserProfileStack = StackNavigator({
  UserProfile: {
    screen: UserProfile,
    navigationOptions: ({ navigation }) => ({
      title: `${toTitleCase(navigation.state.params.name.first)} ${toTitleCase(navigation.state.params.name.last)}`,
    }),
  },
}, {
  mode: 'card',
  headerMode: 'none',
});

// Stack navigator for 1. Home tab
export const HomeStack = StackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      title: 'Home',
    },
  }, Share: {
    screen: ShareUpdate,
    navigationOptions: {
      title: 'Share',
    },
  },
},);

// Stack navigator for 2. FriendList tab
export const FriendStack = StackNavigator({
  Friend: {
    screen: FriendListStack,
    navigationOptions: {
      title: 'My Friends',
    },
  }, FriendProfile : {
      screen: UserProfileStack,
  }
},);

// Stack navigator for 3. NotificationList tab
export const NotificationStack = StackNavigator({
  Notifications: {
    screen: NotificationList,
    navigationOptions: {
      title: 'Notifications',
    },
  },
},);

// Stack navigator for 4. MenuList tab
export const MenuStack = StackNavigator({
  Notifications: {
    screen: MenuList,
    navigationOptions: {
      title: 'Menu',
    },
  }, Policy: {
    screen: Policy,
    navigationOptions: {
      title: 'Privacy Policy',
    },
  }, MyProfile: {
    screen: UserProfileStack,
    navigationOptions: {
      title: 'My Profile',
      headerRight: <Button title='Edit Profile' />,
    }
  }
},);

// Tab Navigator with 4 tabs (Home, Friends, Notifications, Menu)
export const Tabs = TabNavigator({
  Home: {
    screen: HomeStack,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: ({ tintColor, focused }) => (
        <Icon name={focused ? "ios-home" : "ios-home-outline"} size={35} color={tintColor} />
      ),
    },
  },
  FriendList: {
    screen: FriendStack,
    navigationOptions: {
      tabBarLabel: 'Friends',
      tabBarIcon: ({ tintColor, focused }) => (
        <Icon name={focused ? "ios-contacts" : "ios-contacts-outline"} size={35} color={tintColor} />
      ),
    },
  },
  NotificationList: {
    screen: NotificationStack,
    navigationOptions: {
      tabBarLabel: 'Notifications',
      tabBarIcon: ({ tintColor, focused }) => (
        <Icon name={focused ? "ios-notifications" : "ios-notifications-outline"} size={35} color={tintColor} />
      ),
    },
  },
  MenuList: {
    screen: MenuStack,
    navigationOptions: {
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

// Root Stack containing SignUp and containing SignUp and TabNavigator
export const Root = StackNavigator({
  SignUp: {
    screen: SignUpStack,
  }, Tabs: {
      screen: Tabs,
  },
}, {
  mode: 'card',
  headerMode: 'none',
});
