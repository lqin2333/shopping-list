import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Constants, MapView } from 'expo';

const ACTIVE_PIN = require('../assets/images/store.png');
const INACTIVE_PIN = require('../assets/images/map_pin_active.png'); 

export default class Map extends Component {

    static navigationOptions = {
        title: 'Map',
    };

    state = {
        isSelected: false
    }

    renderPins = () => {
        const { isSelected } = this.state;

        const venues = [
            {
                id: 'Countdown_1',
                name: 'Countdown Grafton',
                coordinates: [174.7702937, -36.8538515]
            },
            {
                id: 'Countdown_2',
                name: 'Countdown City Center',
                coordinates: [174.7630381, -36.8512801]
            },
            {
                id: 'NewWorld_1',
                name: 'NewWorld City Center',
                coordinates: [174.748607, -36.8569975]
            },
            {
                id: 'ParknSave_1',
                name: 'PaknSave Sunnyvale',
                coordinates: [174.6325965, -36.8941536]
            },
            {
                id: 'ParknSave_2',
                name: 'PaknSave Mt Albert',
                coordinates: [174.7038943, -36.892696]
            }];

        return venues.map(venue => (
            <MapView.Marker
                key={venue.id}
                identifier={venue.id}
                title={venue.name ? venue.name : ''}
                coordinate={{
                    longitude: venue.coordinates[0],
                    latitude: venue.coordinates[1],
                }}
                image={isSelected ? INACTIVE_PIN : ACTIVE_PIN}
                ref={`callout-${venue.id}`}
                zIndex={isSelected ? 999 : 0}
            >
                <MapView.Callout
                    tooltip={false}
                >
                    <Text>{venue.name}</Text>
                </MapView.Callout>
            </MapView.Marker>
        ));
    }

    render() {
        return (
            <View style={styles.container}>
                <MapView
                    style={{ flex: 1 }}
                    mapType={'standard'}
                    showsPointsOfInterest={false}
                    showsUserLocation={true}
                    loadingEnabled={true}
                    provider={Platform.OS === 'ios' ? null : 'google'}
                    initialRegion={{
                        latitude: -36.8509629,
                        longitude: 174.7680712,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421
                    }}
                    
                >
                    {this.renderPins()}
                </MapView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ecf0f1',
    },
});
