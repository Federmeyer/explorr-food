import {
    Dimensions,
    Button,
    StyleSheet,
    Text,
    View,
    Image,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import Carousel from 'react-native-reanimated-carousel';

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
