import * as React from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  TouchableOpacity
} from "react-native";

export default class ForgetPassword extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
    };
  }
  static navigationOptions = {
    headerStyle: {
      backgroundColor: "#16a085",
      elevation: null
    }
  };

  onForgetPress() {
        this.props.navigation.navigate("Login");
  }
 
  render() {
    return (
      <View style={styles.container}>
     
      <Text style={styles.text}> Enter your email to reset your password </Text>
        <TextInput
          placeholder="Username or Email"
          placeholderTextColor="rgba(255,255,255,0.7)"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.input}
          value={this.state.email}
          onChangeText={email => this.setState({ email })}
        />
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={this.onForgetPress.bind(this)}
        >
          <Text style={styles.buttonText}>Reset Password</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1.2,
    justifyContent: "flex-start",
    backgroundColor: "#3498db",
    padding: 20,
    paddingTop: 100
  },
  text: {
    paddingVertical: 15,
    fontSize: 24,
    textAlign: "center",
    color: "#FFF",
    fontWeight: "500"
  },
  input: {
    height: 40,
    marginBottom: 10,
    backgroundColor: "rgba(255,255,255,0.2)",
    color: "#fff",
    paddingHorizontal: 10
  },
  buttonContainer: {
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingVertical: 15
  },
  buttonText: {
    textAlign: "center",
    color: "#FFF",
    fontSize: 18,
  },
});