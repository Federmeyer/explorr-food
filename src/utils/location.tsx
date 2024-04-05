import {
    ActivityIndicator,
    StyleSheet,
    View,
    Text,
    Platform,
} from 'react-native';
import React, { useEffect } from 'react';
import * as Location from 'expo-location';

import { getNearbyPhotos } from '../utils/api';
import styles from '../utils/styles';

const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
        console.log('Permission to access location denied');
        return;
    }
    console.log('Permission to access location granted!');

    let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
    });
    return location;
};

export default getLocation;
