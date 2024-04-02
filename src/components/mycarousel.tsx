import {
    Dimensions,
    View,
    Image,
} from 'react-native';
import React from 'react';
import Carousel from 'react-native-reanimated-carousel';

function MyCarousel({ data }) {
    const width = Dimensions.get('window').width;

    return (
        <Carousel
            style={null}
            loop={false}
            width={width * 0.7}
            height={width / 1.2}
            autoPlay={false}
            data={data}
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
    )
}

export default MyCarousel;