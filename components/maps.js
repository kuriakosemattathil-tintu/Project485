import * as React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, TouchableHighlight } from 'react-native';
import MapView from 'react-native-maps';
//import HeaderComponent from './HeaderComponents/index';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { StackNavigator, TabNavigator, TabView } from 'react-navigation';
import ViewMoreText from 'react-native-view-more-text';
import Home from './HomePage';
export default class LocationA extends React.Component {
    static navigationOptions = ({ navigation }) => ({
    });
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
        const { state } = this.props.navigation;
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
                <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                </TouchableOpacity>
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
                    <Text style={styles.content }> Rihanna Concert </Text>
                    <Text style={styles.content }> 07:30 </Text>
                </View>

                <View style={{
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    marginBottom: 30,
                }}>

                    <Text style={styles.header }  > Event Address</Text>
                    <Text style={styles.content }  > 500 El Camino Real, Santa Clara, CA 95053 </Text>
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
                    <Text style={styles.content }> 02-12-17 </Text>
                    <Text style={styles.content }> 10:30 </Text>
                    <Text style={styles.content }> ~1.5h </Text>
                    <Text style={styles.content }> Levis Stadium </Text>
                </View>

                <ViewMoreText
                    numberOfLines={2}
                    renderViewMore={this.renderViewMore}
                    renderViewLess={this.renderViewLess}
                    textStyle={{ textAlign: 'left' }}
                >
                    <Text style={styles.content }>
                        Rihanna has revealed details of the first annual Diamond Ball, a black-tie fundraiser benefitting The Clara Lionel Foundation. The singer will perform with a live orchestra at the event, which takes place December 11th at The Vineyard, a private 157-acre enclave located in Beverly Hills. According to a press release, the Diamond Ball – which also includes a dinner and live auction – will host an estimated 600 guests, "ranging from entertainment and business executives to celebrities and philanthropists."
                    </Text>
                </ViewMoreText>

                <View >
                <TouchableOpacity style={styles.fullWidthButton}>
                    <Text style={styles.fullWidthButtonText}
                    onPress={() => this.props.navigation.navigate("Home")}
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
