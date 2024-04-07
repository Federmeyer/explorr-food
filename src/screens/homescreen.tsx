import { View, Text, FlatList, ScrollView, Button, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';

import * as SQLite from 'expo-sqlite';

import MyCarousel from '../components/mycarousel';
import LogItem from '../components/logitem';
import styles from '../utils/styles';

const db = SQLite.openDatabase('foodlog');

// https://www.npmjs.com/package/react-native-sqlite-storage

const LogHeader = ({ data }) => {
    // console.log(data);

    // We need some dummy data on first login :(
    if (data.length == 0) {
        data = [
            {
                time: 0,
                calories: 0,
                carbs: 0,
                protein: 0,
                fat: 0
            }
        ]
    }

    const allData = ["calories", "carbs", "protein", "fat"].map((category) => {
        return {
            labels: data.map((val) => val["time"]),
            datasets: [
                {
                    data: data.map((val) => val[category]),
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    strokeWidth: 2,
                }
            ],
            legend: [category],
        }
    });

    return (
        <View>
            <MyCarousel
                data={allData}
            />
            <Text style={styles.seperator}>
                ────────  My Log  ────────
            </Text>
        </View>
    );
};

const Home = ({ route, navigation }) => {
    const [logItems, setLogItems] = useState([]);
    const [graphData, setGraphData] = useState([]);

    useEffect(() => {
        const onFocus = navigation.addListener('focus', () => {
            db.transactionAsync(async tx => {
                let result = await tx.executeSqlAsync(`
                SELECT * FROM logitem;
                `);
                // console.log("count:", ((result.rows as any[]).length));

                // sort ALL data, but keep all json together!
                let resSorted = result.rows.sort((entry1, entry2) => {
                    // console.log("\n", entry1, "\n");
                    // console.log("\n", entry2, "\n");
                    return parseFloat(entry1["time"]) - parseFloat(entry2["time"]);
                });
                setLogItems(resSorted);
            });
        });

        db.transactionAsync(async tx => {
            let result = null;

            // FOR DEBUG ONLY, THIS WILL WIPE **ALL** TABLE ON RESTART!!!!!
            // result = await tx.executeSqlAsync(`
            // DROP TABLE IF EXISTS logitem;
            // `);

            result = await tx.executeSqlAsync(`
            CREATE TABLE IF NOT EXISTS logitem (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                date VARCHAR,
                location VARCHAR,
                description VARCHAR,
                calories NUMERIC,
                carbs NUMERIC,
                protein NUMERIC,
                fat NUMERIC,
                time VARCHAR,
                duration INT
            );
            `);

            result = await tx.executeSqlAsync(`
                SELECT * FROM logitem;
            `);
            // console.log(result.rows);
        });

        return onFocus;
    }, []);

    return (
        <ScrollView>
            <View style={[styles.container]}>
                <FlatList
                    style={{ backgroundColor: 'light blue' }}
                    contentContainerStyle={[styles.flatlist]}
                    data={logItems}
                    scrollEnabled={false}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item, index }) => {
                        return (
                            <LogItem data={item} />
                        );
                    }}
                    ListHeaderComponent={
                        <View>
                            <LogHeader data={logItems} />
                            <LogItem data={null} style={{ backgroundColor: 'lightblue', borderBottomWidth: 3, borderTopWidth: 3 }} />
                        </View>
                    }
                    ListFooterComponent={
                        <View style={[styles.horizontal]}>
                            <Button title="New Log Entry" onPress={() => {
                                navigation.navigate("NewEntry");
                            }} />
                        </View>
                    }
                />
            </View>
        </ScrollView>
    );
};

export default Home;
