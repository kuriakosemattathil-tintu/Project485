import * as React from 'react';
import { Platform, View, StyleSheet,PickerIOS, ActivityIndicator, Button, ListView, FlatList, ScrollView, TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
// import { List, ListItem } from "react-native-elements";
import { Container, Content, List, ListItem, Text, Left, Right, Body, Picker} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Maps from './maps';
import Login from './login';
import { StackNavigator, NavigationActions } from "react-navigation";
import { Dropdown } from 'react-native-material-dropdown';
import GooglePlaces from './places';
import Index from './index';
import { Constants, Location, Permissions } from 'expo';
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
          PickerValue:25,
          isLoading: true,
          location: null,
          errorMessage: null
        }
    this.fetchData = this.fetchData.bind(this);
    this.filterEvents = this.filterEvents.bind(this);
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

    componentWillMount() {
      if (Platform.OS === 'android' && !Constants.isDevice) {
        this.setState({
          errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
        });
      } else {
        this._getLocationAsync();
      }
    }

    componentDidMount() {
      //this.fetchData()
    }
    _getLocationAsync = async () => {
      let { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== 'granted') {
        this.setState({
          errorMessage: 'Permission to access location was denied',
        });
      }

      let location = await Location.getCurrentPositionAsync({enableHighAccuracy:true});
      this.setState({ location });
      this.fetchData();
    };
    getISOStringWithoutSecsAndMillisecs(date) {
      const dateAndTime = date.toISOString().split('T')
      const time = dateAndTime[1].split(':')
      return dateAndTime[0]+'T'+time[0]+':'+time[1]+':00Z'
    }

    filterEvents(value){
      console.log(value)
      this.setState({PickerValue: value},()=>this.fetchData());
    }

    fetchData() {
      console.log(this.state.location, this.state.PickerValue)
        this.setState({
          isLoading: true,
        });
        var date = new Date();
        date.setDate(date.getDate() + 2);
        date = this.getISOStringWithoutSecsAndMillisecs(date);
        fetch(REQUEST_URL,{
            method: 'POST',
            headers: new Headers({
                       'Content-Type': 'application/json',
              }),
              body: JSON.stringify({
                lat: this.state.location ? this.state.location.coords.latitude : 37.349642,
                lng: this.state.location ? this.state.location.coords.longitude : -121.938987,
                opts: {
                    sort:"distance,asc",
                    endDateTime:date,
                    radius:this.state.PickerValue,
                    unit:"miles"
                }

            })
          })
          .then((response) => response.json())
          .then((responseData) => {
            console.log(responseData)
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            this.setState({
                isLoading: false,
                dataSource: ds.cloneWithRows(responseData.items),
            });
          }).done();
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

                <Picker
                style={{width: '70%', backgroundColor: '#FFF0E0',
                borderColor: 'black',width: 140,alignSelf: 'flex-end',
                height: 30}}
                selectedValue={this.state.PickerValue}
                onValueChange={(itemValue,itemIndex) =>
                this.filterEvents(itemValue)}

                >
                <Picker.Item label="Filter By" value="" />
                <Picker.Item label="< 5 Miles" value={5} />
                <Picker.Item label="< 10 Miles" value={10} />
                <Picker.Item label="< 15 Miles" value={20} />
                <Picker.Item label="< 25 Miles" value={25} />
                <Picker.Item label="< 50 Miles" value={50} />
                <Picker.Item label="Any" value="Any" />

                </Picker>

                <ListView
                   dataSource={this.state.dataSource}
                //renderRow={this.renderRow.bind(this)}
                renderRow = {(item) =>
                            <ScrollView>

                                <ListItem onPress={()=>this.props.navigation.navigate("Maps")}>
                                    <Left>
                                        <Text style={styles.headerText}> {item.name}</Text>
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
