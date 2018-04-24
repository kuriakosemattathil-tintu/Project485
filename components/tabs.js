import * as React from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';
import API from './RestAPI';
const initialLayout = {
    height: 0,
    width: Dimensions.get('window').width,
};

const FirstRoute = () =>
    <View style={[styles.container, { backgroundColor: '#3B5998' }]}>
        <API />
    </View>
const SecondRoute = () =>
    <View style={[styles.container, { backgroundColor: 'steelblue' }]}>
        <API />
    </View>

export default class TabViewExample extends React.Component {
    state = {
        index: 0,
        routes: [
            { key: 'first', title: 'Today' },
            { key: 'second', title: 'Upcoming' },
        ],
    };

    _handleIndexChange = index => this.setState({ index });

    _renderHeader = props => <TabBar {...props} />;

    _renderScene = SceneMap({
        first: FirstRoute,
        second: SecondRoute,
    });

    render() {
        return (
            <TabViewAnimated
                navigationState={this.state}
                renderScene={this._renderScene}
                renderHeader={this._renderHeader}
                onIndexChange={this._handleIndexChange}
                initialLayout={initialLayout}
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 550,
    },
});