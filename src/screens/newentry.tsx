import { View, Text, TextInput, Button, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useEffect, useState } from 'react';

import * as SQLite from 'expo-sqlite';

import getLocation from '../utils/location';
import styles from '../utils/styles';

const db = SQLite.openDatabase('foodlog');

// https://docs.expo.dev/versions/latest/sdk/sqlite/

const NewEntry = ({ route, navigation }) => {
    let [myLocation, setLocation] = useState(null);

    useEffect(() => {
        !myLocation &&
            getLocation().then((l) => {
                setLocation(l);
                console.log('Got location!');
            });
    }, [myLocation]);

    let state = {
        day: "",
        location: "",
        description: "",
        calories: 0.0,
        carbs: 0.0,
        protein: 0.0,
        fat: 0.0,
        time: 0.0,
        duration: 0.0,
    }

    // This page will have the following
    // - Back button to cancel
    // - Location search for tagging restaraunts (or manually typed name)
    // - Textbox to add food item name
    // - optionally fillable boxed for
    //    - Calories
    //    - Carbs
    //    - Protein
    //    - Fats
    //    - ??? Anything else ???
    // - An option to autofill based on restaraunt/location name + food name with Google Gemini
    // - Button to "add to log"
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={[styles.container]}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={[styles.centered]}>
                    <Button title='Import From Favorites' />
                    <TextInput style={[styles.input]} placeholder='Location' onChangeText={(val) => state.location = val} />
                    <TextInput style={[styles.input]} placeholder='Meal description' onChangeText={(val) => state.description = val} />

                    <View style={[styles.horizontal]}>
                        <Button title='Autofill With Google Gemini AI' />
                    </View>

                    <View>
                        {
                            ['Calories', 'Carbs', 'Protein', 'Fat'].map((text) => {
                                return (
                                    <View style={[styles.horizontal]} key={text}>
                                        <Text style={[styles.miniinputtext]}>
                                            {`${text} (g)`}
                                        </Text>
                                        <TextInput style={[styles.input, styles.miniinput]} placeholder='0.0' keyboardType='numeric' onChangeText={(val) => state[`${text}`] = parseInt(val)} />
                                    </View>
                                )
                            })
                        }

                        <View style={[styles.horizontal]}>
                            <Text style={[styles.miniinputtext]}>
                                {`Time (00:00)`}
                            </Text>
                            <TextInput style={[styles.input, styles.miniinput]} placeholder='0.0' keyboardType='numeric' onChangeText={(val) => state.time = parseInt(val)} />
                        </View>

                        <View style={[styles.horizontal]}>
                            <Text style={[styles.miniinputtext]}>
                                {`Duration (Minutes)`}
                            </Text>
                            <TextInput style={[styles.input, styles.miniinput]} placeholder='0.0' keyboardType='numeric' onChangeText={(val) => state.duration = parseInt(val)} />
                        </View>

                        <View style={[styles.horizontal]}>
                            <Button title='Add To Log' onPress={() => {
                                db.transactionAsync(async tx => {
                                    let result = await tx.executeSqlAsync(`
                                            INSERT INTO logitem (date, location, description, calories, carbs, protein, fat, time, duration)
                                            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
                                    `, [
                                        state.day,
                                        state.location,
                                        state.description,
                                        state.calories,
                                        state.carbs,
                                        state.protein,
                                        state.fat,
                                        state.time,
                                        state.duration
                                    ]);
                                    console.log(result);

                                    result = await tx.executeSqlAsync(`
                                    SELECT * FROM logitem;
                                    `);
                                    console.log(result.rows);
                                });

                                navigation.navigate("Home");
                            }} />
                            <Button title='Add To Favorites' />
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

export default NewEntry;
