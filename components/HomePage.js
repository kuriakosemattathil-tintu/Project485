import * as React from 'react';
import { Constants } from 'expo';
import GooglePlaces from './places'; // 1.2.12
import Flexbox from 'flexbox-react';
import TabViewAnimated from './tabs';
import { StackNavigator, TabNavigator, TabView } from 'react-navigation';
import Expo from 'expo';
import HeaderComponent from './index';
// import Mini from './MainScreen';
import { AppRegistry,Dimensions, View, StyleSheet, ScrollView, Text } from 'react-native';
import { Icon, Button, Container, Header, Content, Left } from 'native-base';

var { height } = Dimensions.get('window');
var box_count = 3;
var box_height = height / box_count;

export default class Home extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <HeaderComponent />
                <Text style={styles.baseText}>
                    Welcome, Kuriakose
                </Text>
                <View style ={styles.box1} >
                <GooglePlaces />
                </View>
                <View style ={styles.box2} >
                <TabViewAnimated /> 
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
        flex: 1,
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