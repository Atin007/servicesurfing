import React from 'react';
import { Platform, View } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import { NavigationActions, TabBarBottom } from 'react-navigation';

// Screens for the Tab Navigator
import Home from '../screens/Home';
import Search from '../screens/Search';
import Notifications from '../screens/Notifications';
import Menu from '../screens/Menu';

// Screens for the Root Navigator alongside the TabNavigator
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import SignIn from '../screens/SignIn';
import ForgotPassword from '../screens/ForgotPassword';
import UserProfile from '../screens/UserProfile';
import Friends from '../screens/Friends';
import PrivacyPolicy from '../screens/PrivacyPolicy';
import Share from '../screens/Share';
import AboutUser from '../screens/AboutUser';
import UserPhotos from '../screens/UserPhotos';
import BookAppointment from '../screens/BookAppointment';
import Appointments from '../screens/Appointments';
import EditProfile from '../screens/EditProfile';

// Tab Navigator with 4 tabs (Home, Search, Notifications, Menu)
export const Tabs = TabNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      title: 'Home',
      headerLeft: (
        <View style={{paddingLeft: 15}}>
          <Icon name="camera" type='entypo' size={22} color="#FFF" onPress={null} />
        </View>),
      headerRight: (
        <View style={{paddingRight: 15}}>
          <Icon name="message" type='entypo' size={24} color="#FFF" onPress={null} />
        </View>),
      tabBarIcon: ({ tintColor, focused }) => (
        <Icon name={focused ? "ios-home" : "ios-home-outline"} type='ionicon' size={35} color="#06A0A2" />
      ),
    },
  },
  Search: {
    screen: Search,
    navigationOptions: {
      title: 'Search',
      headerLeft: null,
      tabBarIcon: ({ tintColor, focused }) => (
        <Icon name={focused ? "ios-search" : "ios-search-outline"} type='ionicon' size={35} color="#06A0A2" />
      ),
    },
  },
  Notifications: {
    screen: Notifications,
    navigationOptions: {
      title: 'Notifications',
      headerLeft: null,
      tabBarIcon: ({ tintColor, focused }) => (
        <Icon name={focused ? "ios-notifications" : "ios-notifications-outline"} type='ionicon' size={35} color="#06A0A2" />
      ),
    },
  },
  Menu: {
    screen: Menu,
    navigationOptions: {
      title: 'Menu',
      headerLeft: null,
      tabBarIcon: ({ tintColor, focused }) => (
        <Icon name={focused ? "ios-menu" : "ios-menu-outline"} type='ionicon' size={35} color="#06A0A2" />
      ),
    },
  },
}, {
    tabBarComponent: TabBarBottom,
    tabBarPosition: Platform.OS == 'ios' ? 'bottom' : 'top',
    tabBarOptions: {
      showLabel: false,
      style: {
        backgroundColor: '#FFF',
      },
    },
});

// UserAuth Stack navigator (if the user is not logged in)
export const UserAuth = StackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      title: 'ServiceSurfing',
      headerLeft: null,
    },
  }, SignUp: {
    screen: SignUp,
    navigationOptions: ({ navigation }) => ({
      title: 'Sign up',
      headerLeft: (
        <View style={{paddingLeft: 15}}>
          <Icon name="cross" type='entypo' size={25} color="#FFF" underlayColor="#06A0A2" onPress={() => navigation.navigate('Login')} />
        </View>),
    }),
  }, SignIn: {
    screen: SignIn,
    navigationOptions: ({ navigation }) => ({
      title: 'Sign in',
      headerLeft: (
        <View style={{paddingLeft: 15}}>
          <Icon name="cross" type='entypo' size={25} color="#FFF" underlayColor="#06A0A2" onPress={() => navigation.navigate('Login')} />
        </View>),
    }),
  }, ForgotPassword: {
    screen: ForgotPassword,
    navigationOptions: {
      title: 'Forgot Password?',
    },
  }
}, {
    navigationOptions: {
      headerStyle: {
        backgroundColor: "#06A0A2",
      },
      headerTintColor: '#FFF',
    },
});

// Root StackNavigator containing all the Screen alongwith Tabs (TabNavigator) (if the user is logged in)
export const Root = StackNavigator({
  Tabs: {
      screen: Tabs,
  }, UserProfile: {
      screen: UserProfile,
      navigationOptions: ({ navigation }) => ({
        title: navigation.state.params.title,
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
  }, UserPhotos: {
      screen: UserPhotos,
      navigationOptions: {
        title: 'Photos',
      },
  }, AboutUser: {
      screen: AboutUser,
      navigationOptions: {
        title: 'About',
      },
  }, BookAppointment: {
      screen: BookAppointment,
      navigationOptions: {
        title: 'Book an Appointment',
      },
  }, Appointments: {
      screen: Appointments,
      navigationOptions: {
        title: 'My Appointments',
      },
  }, EditProfile: {
      screen: EditProfile,
      navigationOptions: {
        title: 'Edit Profile',
      },
  },
}, {
    navigationOptions: {
      headerStyle: {
        backgroundColor: "#06A0A2",
      },
      headerTintColor: '#FFF',
  },
});
