import * as React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
// import { List, ListItem } from "react-native-elements";
import { Container, Content, List, ListItem, Text, Left, Right, Body } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons'
console.disableYellowBox = true;
export default class Rest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
        }
    }
    renderItem = ({ item }) => {
        return (
            <Content>
                <List>
                    <ListItem>
                        <Left>
                            <Text style={styles.headerText}> {item.name} </Text>
                        </Left>
                        <Body>
                            <Text style={styles.headerText}> {item.dates.start.localTime} </Text>
                            <Text style={styles.headerText}>{item.venues.name}  </Text>
                        </Body>
                        <Right>
                            <Icon name="chevron-right" style={styles.icon} />
                        </Right>
                    </ListItem>
                </List>
            </Content>


        )
    }
    renderSeparator = () => {
        return (
            <View style={{ height: 2, width: '100%', backgroundColor: 'white' }}>
            </View>
        )
    }

    componentDidMount() {
        const url = 'http://ec2-54-245-5-50.us-west-2.compute.amazonaws.com/event/list'
        fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    dataSource: responseJson.events,
                })
            })
            .catch((error) => {
                console.log(error)
            })
    }
    render() {
        return (
            <View >
                <FlatList
                    data={this.state.dataSource}
                    renderItem={this.renderItem}
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
        fontSize: 14,
        fontWeight: 'bold',
    }
})
