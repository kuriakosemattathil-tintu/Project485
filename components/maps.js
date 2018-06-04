import * as React from 'react';
import {StyleSheet, Text, View, ActivityIndicator, Button, FlatList, ListView,ScrollView, TouchableOpacity, TouchableHighlight } from 'react-native';
import MapView from 'react-native-maps';
import { Container, Content, List, ListItem, Left, Right, Body } from 'native-base';
//import HeaderComponent from './HeaderComponents/index';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { StackNavigator, TabNavigator, TabView } from 'react-navigation';
import ViewMoreText from 'react-native-view-more-text';
import Home from './HomePage';
import openMap from 'react-native-open-maps';
const URL = 'http://ec2-34-216-18-78.us-west-2.compute.amazonaws.com/event/get';
export default class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          //  dataSource: [],
            isLoading: true
        }
       this.fetchEvent = this.fetchEvent.bind(this);
    } 
    static navigationOptions = ({ navigation }) => ({
        title: 'Event Details',
    });
    renderSeparator = () => {
        return (
            <View style={{ height: 2, width: '100%', backgroundColor: 'white' }}>
            </View>
        )
    }

    componentDidMount() {
      this.fetchEvent();
    }
    
    fetchEvent() {
        this.setState({
          dataSource: null,
        });
        fetch(URL,{
            method: 'POST',
            headers: new Headers({
                       'Content-Type': 'application/json', 
              }),
              body: JSON.stringify({
                id: '16tZA80fOZAGkFvG'
              
            })
          })
          .then((response) => response.json())
          .then((responseData) => { 
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            this.setState({
                isLoading: false,
                dataSource: ds.cloneWithRows(responseData._embedded.venues),
                
            });
          })
        .done();
      }

    _goSantaClara() {
        openMap({ latitude: 37.335641, longitude: -121.888322, name: 'San Jose' });
      }
   
    renderViewMore(onPress) {
        return (
            <Text onPress={onPress} style={{ fontFamily: "Arial", fontSize: 16, color: 'blue' }}>View more</Text>
        )
    }
    renderViewLess(onPress) {
        return (
            <Text onPress={onPress} style={{ fontFamily: "Arial", fontSize: 16, color: 'blue' }}>View less</Text>
        )
    }

render() {
    if(this.state.isLoading) {
        return(
            <View>
                <ActivityIndicator />
                </View>
        )
    }
    return (
        
        <View style={{ flex: 1 }}>
            <MapView style={{ flex: .8 }}
                    initialRegion={{
                        latitude: 37.3541,
                        longitude: -121.9552,
                        latitudeDelta: 0.1,
                        longitudeDelta: 0.1,
                    }}>
                    <MapView.Marker
                        coordinate={{
                            latitude: 37.3541,
                            longitude: -121.9552,
                        }}
                    />
                </MapView>

            <ListView
               dataSource={this.state.dataSource}
            // renderRow={this.renderRow.bind(this)}
            renderRow = {(item) =>
                        <ScrollView>
                        <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}>
                    <Text style={styles.header } > Event Name</Text>
                    <Text style={styles.header } > ETA</Text>
                </View> 
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}>
                    <Text style={styles.content }> Anjelaah johnson </Text>
                    <Text style={styles.content }> 19:20 </Text>
                </View>
                <View style={{
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    marginBottom: 30,
                }}>

                    <Text style={styles.header }  > Event Address</Text>
                    <Text style={styles.content }  > {item.address.line1}, {item.city.name} </Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}>
                    <Text style={styles.header } > Date</Text>
                    <Text style={styles.header } > Starts At </Text>
                    <Text style={styles.header } > ETD </Text>
                    <Text style={styles.header } > Venue </Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 20,
                }}>
                    <Text style={styles.content }> 2018-06-02 </Text>
                    <Text style={styles.content }> 19:30 </Text>
                    <Text style={styles.content }> ~1.5h </Text>
                    <Text style={styles.content }> {item.name} </Text>
                </View>
                </ScrollView>
                    
                }  
              keyExtractor={(item, index) => index}
            ItemSeparatorComponent={this.renderSeparator}
            />
            <ViewMoreText
                    numberOfLines={2}
                    renderViewMore={this.renderViewMore}
                    renderViewLess={this.renderViewLess}
                    textStyle={{ textAlign: 'left' }}
                >
                    <Text style={styles.content }>
                    Anjelaah johnson has revealed details of the first annual Diamond Ball, a black-tie fundraiser benefitting The Clara Lionel Foundation. The singer will perform with a live orchestra at the event, which takes place December 11th at The Vineyard, a private 157-acre enclave located in Beverly Hills. According to a press release, the Diamond Ball – which also includes a dinner and live auction – will host an estimated 600 guests, "ranging from entertainment and business executives to celebrities and philanthropists."
                    </Text>
                </ViewMoreText>

                <View >
                <TouchableOpacity style={styles.fullWidthButton}>
                    <Text style={styles.fullWidthButtonText}
                    onPress= {this._goSantaClara}
                    title="NavigateNow"
                >
                    Navigate Now
                </Text>
                 </TouchableOpacity> 
                 </View>
        </View>
    );
}
}

const styles = StyleSheet.create({
        header: {
            fontWeight: "bold", 
            fontSize: 18 ,
        },
        content: {
            fontFamily: "Arial",
            fontSize:15,
        },
      fullWidthButton: {
        backgroundColor: '#3B5998',
        height:50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
      },
      fullWidthButtonText: {
        fontSize:20,
        fontWeight: 'bold',
        color: 'white'
      }
});
