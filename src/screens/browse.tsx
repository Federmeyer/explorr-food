import { Dimensions, Button, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';

import styles from '../utils/styles';

import { placeName } from '../utils/api';
import MyCarousel from '../components/mycarousel';

const Browse = ({ route, navigation }) => {
    const { currentImages, currentLocation } = route.params;
    const [loactionName, setLoactionName] = useState();

    useEffect(() => {
        const getLoactionName = async () => {
            const locationName = await placeName(
                currentLocation.coords.latitude,
                currentLocation.coords.longitude
            );
            setLoactionName(locationName);
        };
        getLoactionName();
    }, []);

    return (
        <View style={styles.carousel_view}>
            {loactionName && (
                <Button
                    onPress={() => navigation.navigate('Map')}
                    title={loactionName}
                    color="#841584"
                />
            )}
            <Text>TEST</Text>
            <MyCarousel data={currentImages} />
        </View>
    );
};

export default Browse;
