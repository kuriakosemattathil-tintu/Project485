import * as React from "react";
import {
  AppRegistry,
  StyleSheet,
  Button,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Image,
  KeyboardAvoidingView,
  AsyncStorage
} from "react-native";

import { StackNavigator } from "react-navigation";
import Login from './login';
import Icon from 'react-native-vector-icons/FontAwesome';
import { firebaseRef } from './Loading';

export default class Register extends React.Component {
 
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      password_confirmation: "",
      errors: [],
    };
 //  this._register = this._register.bind(this)
  }
  _register() {
    if(this.state.password == this.state.password_confirmation) {
    firebaseRef.auth().createUserWithEmailAndPassword(this.state.email,this.state.password).catch(function(error) {
      console.log(error.code)
      console.log(error.message)
    })
    this.props.navigation.navigate("Login");
  }
  else {
    console.log("password did not match");
  }
  }
  async submit() {
    try {
      let response = await fetch('http://ec2-34-216-18-78.us-west-2.compute.amazonaws.com/user/register',{
        method: 'POST',
  headers: {
    'Accept': 'application.json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
      email: this.state.email,
      password: this.state.password,
      repass: this.state.password_confirmation
    
  })
      });

      let res = await response.text();
      if(response.status >=200 && response.status < 300) {
        console.log("res success is:" + res);
        this.props.navigation.navigate("Login");
      } else {
        let errors = res;
        throw errors;
      }
      console.log("res is: " + res);
    } catch(errors) {
        console.log("caught errors:" + errors);
    }
  }

  static navigationOptions = {
    headerStyle: {
      backgroundColor: "#16a085",
      elevation: null
    }
  };

  render() {
    const {goBack} = this.props.navigation;
    return (
      <View behavior="padding" style={styles.container}>
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={require("./yoloo.png")} />
        </View>
        
        <KeyboardAvoidingView>
          <TextInput
            value={this.state.name}
            onChangeText={name => this.setState({ name })}
            style={styles.input}
            placeholder="Name"
            placeholderTextColor = "#808080"
            returnKeyType="next"
            onSubmitEditing={() => this.emailInput.focus()}
          />
          <TextInput
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
            style={styles.input}
            placeholderTextColor = "#808080"
            returnKeyType="next"
            ref={input => (this.emailInput = input)}
            onSubmitEditing={() => this.passwordCInput.focus()}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Email"
          />
          <TextInput
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
            placeholderTextColor = "#808080"
            ref={input => (this.passwordCInput = input)}
            onSubmitEditing={() => this.passwordInput.focus()}
            returnKeyType="next"
            secureTextEntry
          />
          <TextInput
            value={this.state.password_confirmation}
            onChangeText={password_confirmation => this.setState({ password_confirmation })}
            style={styles.input}
            placeholder="Confirm Password"
            secureTextEntry={true}
            placeholderTextColor = "#808080"
            returnKeyType="go"
            secureTextEntry
            ref={input => (this.passwordInput = input)}
          />
        </KeyboardAvoidingView>
        <TouchableHighlight
          onPress={this.submit.bind(this)}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Register</Text>
        </TouchableHighlight>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#3654C1",
  },
  logoContainer: {
    alignItems: "flex-start",
    flexGrow: 0.5,
    justifyContent: "flex-start",
    alignItems: "flex-start"
  },
  logo: {
    width: 600,
    height: 350
  },
  input: {
    height: 40,
    width: 350,
    marginBottom: 10,
    backgroundColor: "#FFFFFF",
    color: "black",
    paddingHorizontal: 10,
    paddingVertical: 15
  },
  button: {
    height: 50,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignSelf: "stretch",
    marginTop: 10,
    justifyContent: "center",
    paddingVertical: 15,
    marginBottom: 10
  },
  buttonText: {
    fontSize: 18,
    alignSelf: "center",
    textAlign: "center",
    color: "#FFF",
    fontWeight: "700"
  },
});

AppRegistry.registerComponent("Register", () => Register);