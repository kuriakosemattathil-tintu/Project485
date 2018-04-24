import * as React from 'react';
import { Button, Text, Platform, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { DrawerNavigator } from 'react-navigation';
import { StackNavigator, TabNavigator, TabView } from 'react-navigation';
import ButtonScreen from './buttonScreen';
import Maps from './maps';

const TodayView = StackNavigator({
    List: {
        screen: ButtonScreen,
    },
    Detail: {
        screen: Maps,
    },
});
export default TodayView;

