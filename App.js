import * as React from 'react';
import Home from './components/HomePage';
import Maps from './components/maps';
import Rest from './components/RestAPI';
import PoiPage from './components/poi';
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
import ForgotPassword from "./components/ForgetPassword";
import Register from "./components/Register";
import ForgetPassword from './components/ForgetPassword';
console.disableYellowBox = true; 

export default class App extends React.Component {
  
  render() {
    return (
      <View style={styles.container}>
      <App1 />
      </View>
    );
  }
}

const App1 = StackNavigator ({
  Login: { screen: Login},
  Home: { screen: Home},
  Rest: { screen: Rest},
  Maps: { screen: Maps, title: "Event Details"},
  Register: { screen: Register},
  POI: {screen: PoiPage, title:"POI"},
  ForgotPassword: {screen: ForgetPassword},
}, {
initialRouteName: 'Login',
}
);

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});