import {
    Dimensions,
    Button,
    Text,
    View,
    Image,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import Carousel from 'react-native-reanimated-carousel';

import styles from '../utils/styles';

import { placeName } from '../utils/places';

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
            <Carousel
                style={null}
                loop
                width={width * 0.7}
                height={width / 1.2}
                autoPlay={false}
                data={currentImages}
                mode="parallax"
                scrollAnimationDuration={1000}
                onSnapToItem={(index) => console.log('current index:', index)}
                renderItem={({ item }) => (
                    <View>
                        <Image
                            style={{ width: '100%', height: '80%' }}
                            source={{ uri: item as string }}
                            borderRadius={20}
                        />
                    </View>
                )}
            />
        </View>
    );
}

export default Places;
