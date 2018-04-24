import * as React from 'react';
import { Constants } from 'expo';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import {
    GooglePlacesAutocomplete,
} from 'react-native-google-places-autocomplete';
export default class Places extends React.Component {
    render() {
        return (
            <GooglePlacesAutocomplete
                placeholder="Search"
                minLength={2}
                autoFocus={false}
                returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                listViewDisplayed="auto"
                fetchDetails={true}
                renderDescription={row => row.description} // custom description render
                onPress={(data, details = null) => {
                    console.log(data);
                    console.log(details);
                }}
                getDefaultValue={() => {
                    return '';
                }}
                query={{
                    //  https://developers.google.com/places/web-service/autocomplete
                    key: 'AIzaSyAw-0PtoxgKN-Mxtx9P3fKd7ICTkaOGgGY',
                    language: 'en',
                    types: '(cities)',
                }}
                iOSHideShadow={true}
                debounce={200}
            />
        );
    }
}
