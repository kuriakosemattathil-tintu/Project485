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
import { filter } from 'rxjs/operator/filter';
console.disableYellowBox = true;
const REQUEST_URL  = 'http://ec2-34-216-18-78.us-west-2.compute.amazonaws.com/event/list';
const fetch_URL = 'http://ec2-34-216-18-78.us-west-2.compute.amazonaws.com/poi/list';
export default class Rest extends React.Component {
    distances = [ "5 Miles", "10 Miles", "25 Miles", "50 Miles", "Any"];

    constructor(props) {
        super(props);
        this.state = {
          dataSource: [],
          PickerValue:'',
            isLoading: true
        }
    this.fetchData = this.fetchData.bind(this);
      //  this.fetchPOI = this.fetchPOI.bind(this);
    } 
    static navigationOptions = ({ navigation }) => ({
        title: 'Events',
    });
    renderSeparator = () => {
        return (
            <View style={{ height: 2, width: '100%', backgroundColor: 'white' }}>
            </View>
        )
    }

    componentDidMount() {
      this.fetchData();
    }
    
    fetchData() {
        this.setState({
          dataSource: null,
        });
        fetch(REQUEST_URL,{
            method: 'POST',
            headers: new Headers({
                       'Content-Type': 'application/json', 
              }),
              body: JSON.stringify({
                lat: 37.349642,
                lng: -121.938987,
                opt: {
                    sort:"distance,asc",
                    endDateTime:"2018-06-04T19:34:25.002Z",
                    radius:"25",
                    unit:"miles"
                }
              
            })
          })
          .then((response) => response.json())
          .then((responseData) => { 
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            this.setState({
                isLoading: false,
                dataSource: ds.cloneWithRows(responseData.items),
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
            <Index />
            <Text style={styles.baseText}>
                    Welcome, Kuriakose
                </Text>
                <Picker
                style={{width: '70%', backgroundColor: '#FFF0E0',
                borderColor: 'black',width: 140,alignSelf: 'flex-end',
                height: 30}}
                selectedValue={this.state.PickerValue}
                onValueChange={(itemValue,itemIndex) => 
                this.setState({PickerValue:itemValue})}
            
                >
                <Picker.Item label="Filter By" value="" />
                <Picker.Item label="< 5 Miles" value="<5 Miles" />
                <Picker.Item label="< 10 Miles" value="<10 Miles" />
                <Picker.Item label="< 15 Miles" value="<15 Miles" />
                <Picker.Item label="< 25 Miles" value="<25 Miles" />
                <Picker.Item label="< 50 Miles" value="<50 Miles" />
                <Picker.Item label="Any" value="Any" />
            
                </Picker>
                
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
                                        <Text style={styles.headerText}> {item.dates.start.localTime} </Text>
                                        <Text style={styles.headerText}> {item.distance} {item.units} </Text>
                                        <Text style={styles.headerText}>{item._embedded.venues.name}  </Text>
                                    </Body>
                                    
                                    <Right>
                                    <Icon name="chevron-right" style={styles.icon} />
                                    </Right>
                                
                           
                                </ListItem>
                            </ScrollView>
                        
                    }  
                
                  keyExtractor={(item, index) => index}
                ItemSeparatorComponent={this.renderSeparator}
                />
                <View>
                <Button
                title="View POI"
                color="#33FFE9"
                onPress={()=>this.props.navigation.navigate("POI")}
                >
                </Button>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 600,
    },
    baseText: {
        color: "white",
        fontFamily: 'Cochin',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
    },
    icon: {
        color: "white",
        fontFamily: 'Cochin',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
        lineHeight: 30,
    },
    headerText: {
        color: "white",
        fontSize: 18,
        fontWeight: 'bold',
    }
})
