import { ImageBackground, View } from 'react-native';
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
        <View style={styles.container}>
            <ImageBackground
                source={require(HOME_IMAGE)}
                style={styles.imageBackground}
            ></ImageBackground>
        </View>
    );
}

export default Home;
