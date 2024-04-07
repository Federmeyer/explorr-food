import { View, Text, Dimensions } from 'react-native';
import React from 'react';

import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart,
} from 'react-native-chart-kit';

import styles from '../utils/styles';

const capitalize = (s) => (s && s[0].toUpperCase() + s.slice(1)) || '';

const Graph = ({ data }) => {
    const width = Dimensions.get('window').width;
    const label = capitalize(String(data['legend'][0]));
    data['legend'] = [];

    // const tempData = {
    //     labels: ["January", "February", "March", "April", "May", "June"],
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

    const chartConfig = {
        backgroundGradientFrom: '#dedede',
        backgroundGradientFromOpacity: 1,
        backgroundGradientTo: '#dddddd',
        backgroundGradientToOpacity: 1,
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        // propsForLabels: {
        //     fontSize: 20,
        //     strokeWidth: 10,
        // },
    };

    // console.log(data);

    return (
        <View style={[styles.centered]}>
            <Text style={{ fontSize: 25, marginTop: 10 }}>{label}</Text>
            <LineChart
                style={{ borderRadius: 25 }}
                width={width}
                height={width * 0.8}
                data={data}
                chartConfig={chartConfig}
                bezier
            />
        </View>
    );
};

export default Graph;
