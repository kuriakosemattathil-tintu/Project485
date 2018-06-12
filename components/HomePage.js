import * as React from 'react';
import { Constants } from 'expo';
import GooglePlaces from './places'; // 1.2.12
import Flexbox from 'flexbox-react';
import TabViewAnimated from './RestAPI';
import { StackNavigator, TabNavigator, TabView } from 'react-navigation';
import Expo from 'expo';
import HeaderComponent from './index';
// import Mini from './MainScreen';
import { AppRegistry,Dimensions, View, StyleSheet, ScrollView, Text, ActivityIndicator } from 'react-native';
import { Icon, Button, Container, Header, Content, Left } from 'native-base';

var { height } = Dimensions.get('window');
var box_count = 3;
var box_height = height / box_count;

const REQUEST_URL  = 'http://ec2-34-216-18-78.us-west-2.compute.amazonaws.com/user/checkUser';

export default class Home extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        user: [],
        PickerValue:'',
          isLoading: true
      }
  this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData(){
    this.setState({
      user: null,
    });

    fetch(REQUEST_URL,{
      method: 'GET'
    }).then((response) => response.json()).then((responseData)=>{
      if(responseData.user == null){
          this.setState({
          user:{
            "roles": [
              "guest"
            ],
            "_id": "5b1dc0a6f541e92bbfe64dd4",
            "email": "user@user.com",
            "__v": 0
          }
        })
      }else {
        this.setState({user:responseData.user});
        console.log("123123")
      }
      console.log(responseData);
      this.setState({isLoading:false})
    }).done();
  }

    render() {
      if(this.state.isLoading) {
        return(
            <View style={styles.container}>
                <ActivityIndicator />
                </View>
        )
      }
        let userName = this.state.user ? this.state.user.email : "Onur";
          return (
              <View style={styles.container}>
                  <HeaderComponent />
                  <Text style={styles.baseText}>
                      Welcome, {userName}
                  </Text>
                  <View style ={styles.box1} >
                  <GooglePlaces />
                  </View>
                  <View style ={styles.box2} >
                  <TabViewAnimated navigation={this.props.navigation}/>
                  </View>
              </View>
          );

    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    box: {
        height: box_height
    },
    box1: {
        flex: 0.5,
        backgroundColor: 'white'
    },
    box2: {
        flex: 4,
    },
    baseText: {
        fontFamily: 'Cochin',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
        lineHeight: 50,
    },
});
AppRegistry.registerComponent("HomePage", () => HomePage);
