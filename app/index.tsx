import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import Home from './screens/homescreen';
import Places from './screens/places';
import Map from './screens/map';

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
