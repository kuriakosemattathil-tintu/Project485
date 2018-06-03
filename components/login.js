import * as React from "react";
import {
  AppRegistry,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  AsyncStorage,
  Image,
  TextInput,
  StyleSheet, // CSS-like styles
  Text, // Renders text
  View // Container component
} from "react-native";
import { StackNavigator } from "react-navigation";
import Home from './HomePage';
import Rest from './RestAPI';
import Header from './index';
import Register from './Register';
import Icon from 'react-native-vector-icons/Feather';
import { Actions } from 'react-native-router-flux';

const ACCESS_TOKEN = 'access_token';
const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);
export default class MyLogin extends React.Component {
  state = { email: '', password: '', errorMessage: null }
  
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: ""
    }
  // this._login = this._login.bind(this)
   // this._register = this._register.bind(this)
  }
 
  async storeToken(accessToken) {
    try {
      await AsyncStorage.setItem(ACCESS_TOKEN, accessToken);
      this.getToken();
    } catch(error) {
      console.log("something went wrong");
    }
  }
  async getToken() {
    try {
      let token = await AsyncStorage.getItem(ACCESS_TOKEN);
      console.log("token is" + token);
    } catch(error) {
      console.log("something went wrong");
    }
  }

  static navigationOptions = {
    headerStyle: {
      backgroundColor: "#16a085",
      elevation: null
    },
    header: null
  };
 
  async onLoginPressed(navigate) {
    try {
      let response = await fetch('http://ec2-34-216-18-78.us-west-2.compute.amazonaws.com/user/login',{
        method: 'POST',
  headers: {
    'Accept': 'application.json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
      email: this.state.email,
      password: this.state.password
    
  })
      });

      let res = await response.text();
      if(response.status >=200 && response.status < 300) {
        this.setState({error: ""});
        let accessToken = res;
        this.storeToken(accessToken);
        console.log("res success is:" + res);
        this.props.navigation.navigate("Rest");
      } else {
        let error = res;
        throw error;
      }
     
    } catch(error) {
      this.setState({error: error});
        console.log("caught errors:" + error);
    }
  }
  render() {
    return (
      <DismissKeyboard>
      <View style={styles.container}> 
        <Header />
          <View style={styles.logoContainer}>
            <Image style={styles.logo} source={require("./yoloo.png")} />
          </View>
          <KeyboardAvoidingView  behavior="padding" >
            <TextInput
              placeholder="Username"
              placeholderTextColor = "#808080"
              returnKeyType="next"
              onSubmitEditing={() => this.passwordInput.focus()}
              keyboardType="email-address"
              autoCapitalize="none"
              blurOnSubmit={ true }
              autoCorrect={false}
              value={this.state.email}
              onChangeText={email => this.setState({ email })}
              style={styles.input}
            />
            
            <TextInput
              placeholder="Password"
              placeholderTextColor = "#808080"
              returnKeyType="go"
              secureTextEntry
              ref={input => (this.passwordInput = input)}
              value={this.state.password}
              onChangeText={password => this.setState({ password })}
              style={styles.input}
            />
            </KeyboardAvoidingView>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={this.onLoginPressed.bind(this)}
            >
              <Text style={styles.buttonText}>LOGIN</Text>
            </TouchableOpacity>
            
        <TouchableOpacity style={styles.button}>
          <Text
            style={styles.buttonText}
            onPress={() => this.props.navigation.navigate("Register")}
            title="Sign up"
          >
            Sign up
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text
            style={styles.buttonText}
            onPress={() => this.props.navigation.navigate("ForgotPassword")}
            title="Forgot Password"
          >
            Forgot Password?
          </Text>
        </TouchableOpacity>
      </View>
      </DismissKeyboard>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3654C1"
  },
  logoContainer: {
    alignItems: "center",
    flexGrow: 0.8,
    justifyContent: "center",
    alignItems: "center"
  },
  input: {
    height: 40,
    backgroundColor: '#FFFFFF',
    marginBottom: 10,
    color: 'black',
    paddingHorizontal: 15
  },
  logo: {
    width: 600,
    height: 350
  },
  subtext: {
    color: "#ffffff",
    marginTop: 10,
    width: 160,
    textAlign: "center",
    opacity: 0.8
  },
  keyboard:{
    margin: 20,
    padding: 20,
    alignSelf: "stretch"
  },
  buttonContainer: {
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingVertical: 15
  },
  buttonText: {
    textAlign: "center",
    color: "#FFF",
    fontWeight: "700"
  },
  button: {
    backgroundColor: "#27ae60",
    paddingVertical:20
  }
});

AppRegistry.registerComponent("Login", () => Login);