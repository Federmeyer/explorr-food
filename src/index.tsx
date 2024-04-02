import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import Home from './screens/homescreen';
import Places from './screens/places';
import Map from './screens/map';
import styles from './utils/styles';

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Map" component={Map} />
                <Stack.Screen
                    name="Places"
                    component={Places}
                    initialParams={{ currentImages: [], currentLocation: [] }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
