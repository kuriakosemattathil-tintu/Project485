import * as React from 'react';
import { Text, View, Button, TouchableOpacity } from 'react-native';

export default class ListScreen extends React.Component {
    static navigationOptions = {
        title: 'Event Details',
    }

    constructor(props, context) {
        super(props, context);
        this.goToDetailScreen = this.goToDetailScreen.bind(this);
    }

    goToDetailScreen() {
        this.props.navigation.navigate('Detail');
    }

    render() {
        return (
            <TouchableOpacity onPress={() => this.goToDetailScreen()}>
                <Text style={{fontFamily:"Arial",fontSize: 16, textAlign:"center"}}>Click </Text>
            </TouchableOpacity>
        );
    }
}

