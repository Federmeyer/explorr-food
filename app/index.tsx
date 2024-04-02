import * as React from 'react';
import { StyleSheet } from "react-native";
import type { StyleSheet as SS } from "react-native";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack'

import { HomeScreen } from './screens/homescreen';
import { Restaraunt } from './screens/restaraunt';

import { googleAPIKey } from './tools/apikeys';
import { registerRootComponent } from 'expo';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name="Home"
                        component={HomeScreen}
                        options={{title: 'Home'}}
                    />
                    <Stack.Screen 
                        name="Restaraunt" 
                        component={Restaraunt} 
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </GestureHandlerRootView>
    );
}

registerRootComponent(App);

const styles = {
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        flex: 1,
        width: '100%',
    },
};
