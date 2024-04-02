import { ActivityIndicator, StyleSheet, View, Text } from 'react-native';
import React, { useEffect } from 'react';
import * as Location from 'expo-location';

import { getNearbyPhotos } from '../utils/places';
import styles from '../utils/styles';

const HOME_IMAGE = '../assets/test.png';

function Home({ navigation }) {
    useEffect(() => {
        const getLocation = async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            let images: string[] = await getNearbyPhotos(
                `${location.coords.latitude}`,
                `${location.coords.longitude}`
            );
            navigation.navigate('Places', {
                currentImages: images,
                currentLocation: location,
            });
        };

        getLocation();
    }, []);
    return (
        <View style={[styles2.container, styles2.horizontal]}>
            {/* <Text>
                Loading locations!
            </Text> */}
            <View style={[styles2.loading]}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        </View>
    );
}

const styles2 = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
    },
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
});

export default Home;
