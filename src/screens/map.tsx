import { View, Text, Button, Platform } from 'react-native';
import React, { useState, useEffect } from 'react';
import MapView, { Marker, Circle } from 'react-native-maps';
import * as Location from 'expo-location';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Slider from '@react-native-community/slider';

import styles from '../utils/styles';

const Map = ({ navigation }) => {
    const [currentLocation, setCurrentLocation] = useState(null);
    const [initialRegion, setInitialRegion] = useState(null);
    const [distance, setDistance] = useState(1);
    const [mapReady, setMapReady] = useState(false);

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
            {initialRegion && (
                <MapView
                    style={styles.map}
                    initialRegion={initialRegion}
                    // provider={'google'}
                    onMapReady={() => {
                        setTimeout(() => {
                            setMapReady(true); // initially this state is false
                        }, 1000);
                    }}
                >
                    <View style={{ flex: 1 }}>
                        <Text style={{ textAlign: 'center' }}>
                            Distance: {distance} Km
                        </Text>
                        <Button
                            title="Go!"
                            color={'red'}
                            onPress={() => {
                                // TODO: aaaaaaaaaaaaaaaa change params
                                navigation.navigate('Browse', {
                                    currentImages: [],
                                    currentLocation: [],
                                });
                            }}
                        />
                        {/* <Pressable>
                            <Text style={{ textAlign: 'center', color: "red" }}>
                                Test
                            </Text>
                        </Pressable> */}
                        <Slider
                            style={styles.slider}
                            minimumValue={1000}
                            maximumValue={5000}
                            value={distance}
                            onValueChange={(val) => {
                                val = Math.floor(val / 1000);
                                setDistance(val);
                            }}
                            minimumTrackTintColor="#FFFFFF"
                            maximumTrackTintColor="#000000"
                        />
                    </View>
                    {currentLocation && (
                        <Marker
                            coordinate={{
                                latitude: currentLocation.latitude,
                                longitude: currentLocation.longitude,
                            }}
                            title="Your Location"
                            tracksInfoWindowChanges={
                                Platform.OS === 'ios' ? true : false
                            }
                            tracksViewChanges={
                                Platform.OS === 'ios' ? true : false
                            }
                        />
                    )}
                    {currentLocation && (
                        <Circle
                            key={`circle`}
                            center={{
                                latitude: currentLocation.latitude,
                                longitude: currentLocation.longitude,
                            }}
                            radius={distance * 1000}
                            strokeWidth={1}
                            strokeColor={'#1a66ff'}
                            fillColor={'rgba(230,238,255,0.5)'}
                        />
                    )}
                </MapView>
            )}
        </View>
    );
};

export default Map;
