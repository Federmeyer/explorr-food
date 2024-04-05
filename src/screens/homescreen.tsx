import { ActivityIndicator, StyleSheet, View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as Location from 'expo-location';

import { getNearbyPhotos } from '../utils/api';
import getLocation from '../utils/location';
import styles from '../utils/styles';
import MyCarousel from '../components/mycarousel';

const HOME_IMAGE = '../assets/test.png';

const Home = ({ route, navigation }) => {
    let [location, setLocation] = useState(null);
    let [localPlaces, setLocalPhotos] = useState(null);

    useEffect(() => {
        !location &&
            getLocation().then((l) => {
                setLocation(l);
                console.log('Got location!');
            });

        location &&
            !localPlaces &&
            getNearbyPhotos(
                location.coords.latitude,
                location.coords.longitude
            ).then((p) => {
                setLocalPhotos(p);
                console.log('Got photos!');
            });
    }, [location]);

    return (
        <View style={[styles2.container, styles2.horizontal]}>
            {!localPlaces && (
                <View style={[styles2.loading]}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            )}
            {localPlaces && <MyCarousel data={localPlaces} />}
        </View>
    );
};

const styles2 = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
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
        alignItems: 'center',
    },
});

export default Home;
