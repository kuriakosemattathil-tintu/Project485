import * as React from 'react';
import { View, StyleSheet, FlatList, ScrollView, TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
// import { List, ListItem } from "react-native-elements";
import { Container, Content, List, ListItem, Text, Left, Right, Body } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Maps from './maps';
import Login from './login';
import { StackNavigator, NavigationActions } from "react-navigation";
console.disableYellowBox = true;
const REQUEST_URL  = 'http://ec2-34-216-18-78.us-west-2.compute.amazonaws.com/event/list';


export default class Rest extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
        }
        this.fetchData = this.fetchData.bind(this);
    }

    renderItem = ({ item }) => {
        return (
        
            <Content>
                <ScrollView>
                <List>
                    <ListItem >
                        <Left>
                            <Text style={styles.headerText}> {item.name} </Text>
                        </Left>   
                        
                        <Body>
                            <Text style={styles.headerText}> {item.dates.start.localTime} </Text>
                            <Text style={styles.headerText}> {item.dates.start.localDate} </Text>
                            <Text style={styles.headerText}>{item._embedded.venues.name}  </Text>
                        </Body>
                        <Right>
                        <Icon name="chevron-right" style={styles.icon} />
                
                        </Right>
                    </ListItem>
                    
                </List>
                </ScrollView>
            </Content> 
            
        )}
           
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
            this.setState({
                dataSource: responseData.items,
            });
          })
        .done();
      }
    render() {
        return (
            <View >
                <FlatList
                    data={this.state.dataSource}
                    renderItem={this.renderItem.bind(this)}
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
