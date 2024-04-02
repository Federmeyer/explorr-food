import { ImageBackground, StyleSheet, View } from 'react-native';
import React, { useEffect } from 'react';
import * as Location from 'expo-location';

import { getNearbyPhotos } from '../utils/places';

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

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    carousel_view: {
        paddingTop: '20%',
        flex: 1,
        alignItems: 'center',
    },

    carousel: {
        paddingTop: 10,
        display: 'flex',
        flex: 1,
        alignItems: 'center',
    },

    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    imageBackground: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },

    map_view: {
        flex: 1,
        alignItems: 'center',
    },

    map: {
        width: '100%',
        height: '100%',
    },

    slider: {
        marginLeft: '10%',
        marginRight: '10%',
        height: 40,
        marginTop: 50,
    },
    location: {
        color: '#4f59e3',
    },
});
