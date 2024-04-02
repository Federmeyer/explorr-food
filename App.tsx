// import { Image } from 'expo-image';
import { Dimensions, ImageBackground, Button, StyleSheet, Text, View, ActivityIndicator, Image} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useState, useEffect } from 'react';
import MapView, { Marker } from "react-native-maps";
import * as Location from 'expo-location';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Slider from '@react-native-community/slider';
import Carousel from 'react-native-reanimated-carousel';


import {myFunction, placeName} from "./places";

const HOME_IMAGE = "./assets/test.png";

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
  
}


function Places ({route, navigation }) {
  const width = Dimensions.get('window').width;
  const {currentImages, currentLocation} = route.params;
  const [loactionName, setLoactionName] = useState(null);

  useEffect(() => {

    const getLoactionName = async() => {
      const locationName = await placeName(currentLocation.coords.latitude, currentLocation.coords.longitude)
      setLoactionName(locationName);
    };
    getLoactionName()

  }, []);

  
  return (
    <View style={styles.carousel_view}>
            {loactionName && 
              <Button
              onPress={() => navigation.navigate('Map')}
                title={loactionName}
                color="#841584"
              />
            }
            <Text>
              TEST
            </Text>
            <Carousel
                style={null}
                loop
                width={width * 0.7}
                height={width / 1.2}
                autoPlay={false}
                data={currentImages}
                mode='parallax'
                scrollAnimationDuration={1000}
                onSnapToItem={(index) => console.log('current index:', index)}
                renderItem={({item}) => (
                  <View>
                      <Image  
                        style={{width: '100%', height: '80%'}}
                        source={{uri: item as string}}
                        borderRadius={20}
                      />
                  </View>
                )}
            />
        </View>
  )
}

function Map({ navigation }) {

  const [currentLocation, setCurrentLocation] = useState(null);
  const [initialRegion, setInitialRegion] = useState(null);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true, 
      title: 'Choose a location and distance',
      headerRight: () => (
        <FontAwesome.Button name="close" backgroundColor="white" color="gray" onPress={() => {navigation.goBack()}}>
        </FontAwesome.Button>
      ), 
      headerLeft: null
    });

    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation(location.coords);

      setInitialRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.10,
        longitudeDelta: 0.10,
      });
    };

    getLocation();
  }, [navigation]);

  return (
    <View style={styles.map_view}>
      {/* <View style={{marginTop: "15%", flexDirection: "row", alignContent: "flex-start"}}>
        <Text style={{fontWeight: "bold"}}>Choolse a location and radius</Text>
        <Button
              onPress={() => navigation.goBack()}
        />
      </View> */}
      {initialRegion && (
        <MapView style={styles.map} 
            initialRegion={initialRegion}
            provider={'google'}
        >
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={1}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#000000"
          />
          
          {currentLocation && (
            <Marker
              coordinate={{
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude,
              }}
              title="Your Location"
            />
          )}
        </MapView>
      )}
    </View>
  );
};

function Home({ navigation }) {

  useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      let images:string[] = await myFunction(`${location.coords.latitude}`, `${location.coords.longitude}`); 
      navigation.navigate('Places', {
        currentImages: images,
        currentLocation: location
      })
      
    };

    getLocation()

  }, []);
  return (
    <View style={styles.container}>
      <ImageBackground source={require(HOME_IMAGE)} style={styles.imageBackground}>
      </ImageBackground>
    </View>
  );
}

const Stack = createStackNavigator();
function MyStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen 
            name="Map" component={Map}/>
      <Stack.Screen name="Places" component={Places} initialParams={{currentImages: [], currentLocation: []}}/>
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },

  carousel_view: {
    paddingTop: "20%",
    flex: 1, 
    alignItems: "center", 
  },

  carousel: {
    paddingTop: 10,
    display: 'flex',
    flex: 1, 
    alignItems: "center", 
  },

  centered: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center", 

  }, 

  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },

  map_view: {
    flex: 1, 
    alignItems: "center", 
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
    color: "#4f59e3"
  }
});


