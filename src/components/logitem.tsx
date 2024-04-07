import { View, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import React from 'react';

import styles from '../utils/styles';

interface Props {
    data: {
        calories: any;
        carbs: any;
        date: any;
        description: any;
        duration: any;
        fat: any;
        id: any;
        location: any;
        protein: any;
        time: any;
    };
    style?: StyleProp<ViewStyle>;
}

const LogItem: React.FC<Props> = ({ data, style }) => {
    return (
        <View style={[styles.horizontal, { borderWidth: 1 }, style]}>
            <View style={[styles.logitem]}>
                <Text>{data ? data.location : `Location`}</Text>
            </View>

            <View style={[styles.logitem]}>
                <Text>{data ? data.description : `Meal`}</Text>
            </View>

            <View style={[styles.logitem]}>
                <Text>{data ? data.time : `Time`}</Text>
            </View>
        </View>
    );
};

export default LogItem;
