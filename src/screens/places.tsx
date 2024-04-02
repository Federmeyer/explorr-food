import {
    Dimensions,
    Button,
    Text,
    View,
} from 'react-native';
import React, { useState, useEffect } from 'react';

import styles from '../utils/styles';

import { placeName } from '../utils/places';
import MyCarousel from '../components/mycarousel';

function Places({ route, navigation }) {
    const width = Dimensions.get('window').width;
    const { currentImages, currentLocation } = route.params;
    const [loactionName, setLoactionName] = useState(null);

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
            <MyCarousel
                data={currentImages}
            />
        </View>
    );
}

export default Places;
