/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

// import React, { Component } from 'react';
// import {
//   Platform, StyleSheet, Text, View
// } from 'react-native';
//
// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
//   android:
//     'Double tap R on your keyboard to reload,\n'
//     + 'Shake or press menu button for dev menu',
// });
//
// type Props = {};
// export default class App extends Component<Props> {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.welcome}>Welcome to React Native!2</Text>
//         <Text style={styles.instructions}>To get started, edit App.js</Text>
//         <Text style={styles.instructions}>{instructions}</Text>
//       </View>
//     );
//   }
// }
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });
import React from 'react';
import {
  createAppContainer, createSwitchNavigator, createStackNavigator, createBottomTabNavigator
} from 'react-navigation';


import TabBarIcon from './components/TabBarIcon';
import TabBarLabel from './components/TabBarLabel';
import HomeScreen from './screens/HomeScreen';
import LinksScreen from './screens/LinksScreen';
import SettingsScreen from './screens/SettingsScreen';

// import UserInfo from './screens/User/UserInfo';
import AdminScreen from './screens/AdminScreen';
// import GoodsDesc from './screens/GoodsDesc';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: ({ focused }) => (
    <TabBarLabel focused={focused} title="首页" />
  ),
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      // name={
      //   Platform.OS === 'ios'
      //     ? `ios-information-circle${focused ? '' : '-outline'}`
      //     : 'md-information-circle'
      // }
      name="home"
    />
  ),
};

const LinksStack = createStackNavigator({
  Links: LinksScreen,
});

LinksStack.navigationOptions = {
  tabBarLabel: ({ focused }) => (
    <TabBarLabel focused={focused} title="个人中心" />
  ),
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name="user"
    />
  ),
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: ({focused}) => (
    <TabBarLabel focused={focused} title="商家管理"/>
  ),
  tabBarIcon: ({focused}) => (
    <TabBarIcon
      focused={focused}
      name="isv"
    />
  ),
};

const AdminStack = createStackNavigator({
  Admin: AdminScreen,
});

AdminStack.navigationOptions = {
  tabBarLabel: ({ focused }) => (
    <TabBarLabel focused={focused} title="后台管理" />
  ),
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name="API"
    />
  ),
};
// import LinksScreen from '../screens/LinksScreen';
// import SettingsScreen from '../screens/SettingsScreen';

// const UserInfoStack = createStackNavigator({
//   UserInfo,
// });
//
//
// const GoodsDescStack = createStackNavigator({
//   GoodsDesc,
// });

const BottomTabNav = createBottomTabNavigator({
  HomeStack,
  LinksStack,
  SettingsStack,
  AdminStack,
}, {
  activeTintColor: '#e91e63',
  labelStyle: {
    fontSize: 20,
  },
  style: {
    backgroundColor: 'blue',
  },
});


export default createAppContainer(createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Main: BottomTabNav,
  // User: UserInfoStack,
  // GoodsDesc: GoodsDescStack
}));
