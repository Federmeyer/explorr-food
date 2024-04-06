import { View, Text, FlatList, ScrollView, Button } from 'react-native';
import React, { useEffect, useState } from 'react';

import * as SQLite from 'expo-sqlite';

import MyCarousel from '../components/mycarousel';
import LogItem from '../components/logitem';
import styles from '../utils/styles';

const db = SQLite.openDatabase('foodlog');

// https://www.npmjs.com/package/react-native-sqlite-storage

const LogHeader = ({ data }) => {
    return (
        <View>
            <MyCarousel
                data={data}
            />
            <Text style={styles.seperator}>
                ────────  My Log  ────────
            </Text>
        </View>
    );
};

const Home = ({ route, navigation }) => {
    const [logItems, setLogItems] = useState([]);

    useEffect(() => {
        const onFocus = navigation.addListener('focus', () => {
            db.transactionAsync(async tx => {
                let result = await tx.executeSqlAsync(`
                SELECT * FROM logitem;
                `);
                console.log("count:", ((result.rows as any[]).length));
                setLogItems(result.rows);
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
            console.log(result);
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
                            <LogItem data={null} />
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
