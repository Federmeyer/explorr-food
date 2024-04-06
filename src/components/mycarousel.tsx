import { Dimensions, View, Text } from 'react-native';
import React from 'react';
import Carousel from 'react-native-reanimated-carousel';
import { useNavigation, ParamListBase, NavigationProp } from '@react-navigation/native';

import styles from '../utils/styles';

interface Props {
    data: any
}

const MyCarousel: React.FC<Props> = ({ data }) => {
    const width = Dimensions.get('window').width;
    const navigation: NavigationProp<ParamListBase> = useNavigation();

    // This component will have the following
    // - A graph for each statistic gathered from food log
    // - This will require passing in json under the following format
    //
    // let my_data = {
    //     types: [
    //         {
    //             stat: "calories",
    //             entries: [
    //                 // Whatever the format is for the graph
    //                 // Tentetively the following
    //                 {
    //                     time: "12:15",  // 24 hour time. Is there a object for this?
    //                     amount: "15",
    //                     unit: "grams"
    //                 }    
    //             ]
    //         },
    //         // ... repeated for each stat (calories, carbs, etc...)
    //     ],
    // };

    // For debug!
    // TODO: If no graph data, have an empty version to throw in for empty graphs!
    if ((data as any[]).length == 0) {
        data = [1, 2, 3, 4, 5];
    }

    data = (data as any[]).map((item, index) => index);

    return (
        <Carousel
            style={null}
            loop={true}
            width={width}
            height={width}
            autoPlay={false}
            data={data}
            mode="parallax"
            scrollAnimationDuration={1000}
            // onSnapToItem={(index) => console.log('current index:', index)}
            renderItem={({ item, index }) => (
                <View style={[styles.carousel_view]}>
                    <Text>
                        This will be a graph {`${index}`} ^^
                    </Text>
                </View>
            )}
        />
    );
};

export default MyCarousel;
