import * as React from 'react';
// import { Constants } from 'expo';
import Home from './components/HomePage';
import Maps from './components/maps';
import { DrawerNavigator, StackNavigator, DrawerItems, SafeAreaView } from 'react-navigation';
// var { height } = Dimensions.get('window');
import {
  Platform,
  StyleSheet,
  Text,
  View,
  StatusBar
} from 'react-native';

import Login from './components/login';
import ForgetPassword from "./components/ForgetPassword";
import Register from "./components/Register";
console.disableYellowBox = true; 
/*const MyApp = DrawerNavigator({
  Home:{
      screen: Home
  },
  Login:{
    screen: Login
  },
  Events: {
      screen: Maps
  },
  Logout: {
    screen: Home
  }
}
);
/*

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <MyApp />
      </View>
    );
  }
}
/*
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
}); */

/*class Home1 extends React.Component<{}> {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: "#16a085",
      elevation: null
    },
    header: null
  };
  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#16a085" />
        <Home navigation={this.props.navigation} />
      </View>
    );
  }
} */

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
      <MyApp />
      </View>
    );
  }
}

const MyApp = DrawerNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      title: "Login"
    }
  },
  Home: {
    screen: Home,
    navigationOptions: {
      title: "Home"
    }
  },
  Register: {
    screen: Register,
    navigationOptions: {
      title: "Register"
    }
  },
  ForgetPassword: {
    screen: ForgetPassword,
    navigationOptions: {
      title: "ForgetPassword"
    }
  },
  Events: {
    screen: Maps
},
Logout: {
  screen: Login
},
});

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});