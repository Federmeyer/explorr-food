import { Dimensions, View, Text } from 'react-native';
import React from 'react';
import Carousel from 'react-native-reanimated-carousel';
import {
    useNavigation,
    ParamListBase,
    NavigationProp,
} from '@react-navigation/native';

import styles from '../utils/styles';
import Graph from './graph';

// interface Props {
//     data: [
//         stat: string,
//         entries: [
//             time: number,
//             amount: number,
//         ]
//     ]
// }

const MyCarousel = ({ data }) => {
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

    // data for graph
    // const tempData = {
    //     labels: [0, 1, 2, 3, 4, 5],
    //     datasets: [
    //         {
    //             data: [20, 45, 28, 80, 99, 43],
    //             color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
    //             strokeWidth: 2 // optional
    //         },
    //         {
    //             data: [25, 4, 21, 70, 20, 4],
    //             color: (opacity = 1) => `rgba(70, 6, 24, ${opacity})`, // optional
    //             strokeWidth: 2 // optional
    //         }
    //     ],
    //     legend: ["Rainy Days", "Test"] // optional
    // };

    // For debug!
    // TODO: If no graph data, have an empty version to throw in for empty graphs!
    // if ((data as any[]).length == 0) {
    //     data = [1, 2, 3, 4, 5];
    // }

    // data = (data as any[]).map((item, index) => index);

    return (
        <Carousel
            style={null}
            loop={false}
            width={width}
            height={width}
            autoPlay={false}
            data={data}
            mode="parallax"
            scrollAnimationDuration={1000}
            // onSnapToItem={(index) => console.log('current index:', index)}
            renderItem={({ item, index }) => {
                // console.log(item);
                return (
                    <View style={{ flex: 1 }}>
                        <Graph data={item} />
                    </View>
                );
            }}
        />
    );
};

export default MyCarousel;
