import { Dimensions, View, Image, Pressable } from 'react-native';
import React from 'react';
import Carousel from 'react-native-reanimated-carousel';
import { useNavigation, ParamListBase,  NavigationProp } from '@react-navigation/native';

import { Place } from '../utils/api';

interface Props {
    data: Place[]
}

const MyCarousel: React.FC<Props> = ({ data }) => {
    const width = Dimensions.get('window').width;
    const navigation: NavigationProp<ParamListBase> = useNavigation();

    return (
        <Carousel
            style={null}
            loop={false}
            width={width * 0.7}
            height={width / 1.2}
            autoPlay={false}
            data={data as any}
            mode="parallax"
            scrollAnimationDuration={1000}
            // onSnapToItem={(index) => console.log('current index:', index)}
            renderItem={({ item }) => (
                <View>
                    <Pressable
                        onPress={() => {
                            let restaraunt = (item as Place).name;
                            console.log(`pressed ${restaraunt}`);
                            navigation.navigate("Restaraunt", {name: restaraunt});
                        }}
                    >
                        <Image
                            style={{ width: '100%', height: '80%' }}
                            source={{ uri: (item as Place).photoURL }}
                            borderRadius={20}
                        />
                    </Pressable>
                </View>
            )}
        />
    );
};

export default MyCarousel;
