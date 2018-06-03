import * as React from 'react';
import { View, StyleSheet,PickerIOS, ActivityIndicator, Button, ListView, FlatList, ScrollView, TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
// import { List, ListItem } from "react-native-elements";
import { Container, Content, List, ListItem, Text, Left, Right, Body, Picker} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Maps from './maps';
import Login from './login';
import { StackNavigator, NavigationActions } from "react-navigation";
import { Dropdown } from 'react-native-material-dropdown';
console.disableYellowBox = true;
const REQUEST_URL  = 'http://ec2-34-216-18-78.us-west-2.compute.amazonaws.com/event/list';

export default class Rest extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
          //  dataSource: [],
          PickerValue:'',
            isLoading: true
        }
        this.fetchData = this.fetchData.bind(this);
    } 
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
                lat: 37.354107,
                lng: -121.955238
              
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
            
            <View >
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
                                <ListItem >
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
                                    <Button style={styles.headerText}
                                    title="Go "
                            //    onPress={() => this.props.navigation.navigate('Maps')}
                                    />
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
