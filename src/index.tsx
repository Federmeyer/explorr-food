import { SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { Fragment } from 'react';

import Home from './screens/homescreen';
import Browse from './screens/browse';
import Map from './screens/map';
import styles from './utils/styles';
import Restaraunt from './screens/restaraunt';
import NewEntry from './screens/newentry';

const Stack = createStackNavigator();

const App = () => {
    return (
        <Fragment>
            <SafeAreaView style={{ flex: 0, backgroundColor: 'black' }} />
            <SafeAreaView style={[styles.container]}>
                <NavigationContainer>
                    <Stack.Navigator screenOptions={{ headerShown: false }}>
                        <Stack.Screen name="Home" component={Home} />
                        <Stack.Screen name="Map" component={Map} />
                        <Stack.Screen name="Browse" component={Browse} initialParams={{ currentImages: [], currentLocation: [] }} />
                        <Stack.Screen name="Restaraunt" component={Restaraunt} initialParams={{ name: "Test" }} />
                        <Stack.Screen name="NewEntry" component={NewEntry} />
                    </Stack.Navigator>
                </NavigationContainer>
            </SafeAreaView>
            <SafeAreaView style={{ flex: 0, backgroundColor: 'black' }} />
        </Fragment>
    );
};

export default App;
