import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import Home from './screens/homescreen';
import Browse from './screens/browse';
import Map from './screens/map';
import styles from './utils/styles';
import Restaraunt from './screens/restaraunt';

const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Map" component={Map} />
                <Stack.Screen
                    name="Browse"
                    component={Browse}
                    initialParams={{ currentImages: [], currentLocation: [] }}
                />
                <Stack.Screen name="Restaraunt" component={Restaraunt} initialParams={{ name: "Test" }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
