import * as React from 'react';
import { View, StyleSheet,PickerIOS, ActivityIndicator, Button, ListView, FlatList, ScrollView, TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
// import { List, ListItem } from "react-native-elements";
import { Container, Content, List, ListItem, Text, Left, Right, Body, Picker} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Maps from './maps';
import Login from './login';
import { StackNavigator, NavigationActions } from "react-navigation";
import { Dropdown } from 'react-native-material-dropdown';
import GooglePlaces from './places';
import Index from './index';
console.disableYellowBox = true;
const fetch_URL = 'http://ec2-34-216-18-78.us-west-2.compute.amazonaws.com/poi/list';

export default class Rest extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
          //  dataSource: [],
            isLoading: true
        }
       this.fetchPOI = this.fetchPOI.bind(this);
    } 
    static navigationOptions = ({ navigation }) => ({
        title: 'POI',
    });
    renderSeparator = () => {
        return (
            <View style={{ height: 2, width: '100%', backgroundColor: 'white' }}>
            </View>
        )
    }

    componentDidMount() {
      this.fetchPOI();
    }
    
    fetchPOI() {
        this.setState({
          dataSource: null,
        });
        fetch(fetch_URL,{
            method: 'POST',
            headers: new Headers({
                       'Content-Type': 'application/json', 
              }),
              body: JSON.stringify({
                lat: 37.354107,
                lng: -121.955238
              
            })
          })
          .then((response) => response.json())
          .then((responseData) => { 
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            this.setState({
                isLoading: false,
                dataSource: ds.cloneWithRows(responseData.searchResults),
            });
          })
        .done();
      }
      
    render() {
        
        let data = [{
            value: 'Distance',
          }, {
            value: 'Time',
          }];
        if(this.state.isLoading) {
            return(
                <View>
                    <ActivityIndicator />
                    </View>
            )
        }
        return (
            
            <View style={[styles.container, { backgroundColor: 'steelblue' }]}>
 
                <ListView
                   dataSource={this.state.dataSource}
                // renderRow={this.renderRow.bind(this)}
                renderRow = {(item) =>
                            <ScrollView>
                                <ListItem onPress={()=>this.props.navigation.navigate("Maps")}>
                                <Left>
                                        <Text style={styles.headerText}> {item.name} </Text>
                                </Left>
                                <Body>
                                        <Text style={styles.headerText}> {item.fields.address} </Text>
                                    </Body>
                                    <Right>
                                        <Text style={styles.headerText}> {item.distance} </Text>
                                        </Right>
                                </ListItem>
                            </ScrollView>
                        
                    }  
                  keyExtractor={(item, index) => index}
                ItemSeparatorComponent={this.renderSeparator}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 700,
    },
    baseText: {
        color: "white",
        fontFamily: 'Cochin',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
    },
    icon: {
        color: "white",
        fontFamily: 'Cochin',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
        lineHeight: 30,
    },
    headerText: {
        color: "white",
        fontSize: 18,
        fontWeight: 'bold',
    }
})
