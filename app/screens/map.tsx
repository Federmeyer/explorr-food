import { StyleSheet, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Slider from '@react-native-community/slider';

function Map({ navigation }) {
    const [currentLocation, setCurrentLocation] = useState(null);
    const [initialRegion, setInitialRegion] = useState(null);

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            title: 'Choose a location and distance',
            headerRight: () => (
                <FontAwesome.Button
                    name="close"
                    backgroundColor="white"
                    color="gray"
                    onPress={() => {
                        navigation.goBack();
                    }}
                ></FontAwesome.Button>
            ),
            headerLeft: null,
        });

        const getLocation = async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setCurrentLocation(location.coords);

            setInitialRegion({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.1,
                longitudeDelta: 0.1,
            });
        };

        getLocation();
    }, [navigation]);

    return (
        <View style={styles.map_view}>
            {/* <View style={{marginTop: "15%", flexDirection: "row", alignContent: "flex-start"}}>
        <Text style={{fontWeight: "bold"}}>Choolse a location and radius</Text>
        <Button
              onPress={() => navigation.goBack()}
        />
      </View> */}
            {initialRegion && (
                <MapView
                    style={styles.map}
                    initialRegion={initialRegion}
                    provider={'google'}
                >
                    <Slider
                        style={styles.slider}
                        minimumValue={0}
                        maximumValue={1}
                        minimumTrackTintColor="#FFFFFF"
                        maximumTrackTintColor="#000000"
                    />

                    {currentLocation && (
                        <Marker
                            coordinate={{
                                latitude: currentLocation.latitude,
                                longitude: currentLocation.longitude,
                            }}
                            title="Your Location"
                        />
                    )}
                </MapView>
            )}
        </View>
    );
}

export default Map;

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
