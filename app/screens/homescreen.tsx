import * as React from 'react';
import { Dimensions, StyleSheet } from "react-native";
import type { StyleSheet as SS } from "react-native";
import { Button, View, Text } from 'react-native';

import { googleAPIKey } from '../tools/apikeys';
import MyCarousel from '../components/myCarousel';
import Carousel from 'react-native-reanimated-carousel';

var latitude: number = 37.4225337;
var longitude : number = -122.0868744;

const km = 1000;
var distanceMultiplier = 4;
var searchRadius = () => {return distanceMultiplier * km};
var url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${searchRadius()}&key=${googleAPIKey}`;
var photosURL = (reference: string) => { return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${reference}&key=${googleAPIKey}`};


export const HomeScreen = ({navigation}) => {
    const [places, setPlaces] = React.useState([]); 

    // React.useEffect(() => {
    //     if (places.length != 0) {
    //         return;
    //     }

    //     fetch(url)
    //     .then(res => {
    //         return res.json();
    //     })
    //     .then(res => {
    //         var tempPlaces = [];
    //         var index = 0;
    //         for (let googlePlace of res.results) {
    //             var place = {};
    //             var myLat = googlePlace.geometry.location.lat;
    //             var myLong = googlePlace.geometry.location.lng;
    //             var coordinate = {
    //                 latitude: myLat,
    //                 longitude: myLong,
    //             };
    //             place['placeTypes'] = googlePlace.types;
    //             place['coordinate'] = coordinate;
    //             place['placeId'] = googlePlace.place_id;
    //             place['placeName'] = googlePlace.name;
    //             tempPlaces.push(place);

    //             index++;
    //         }

    //         setPlaces(tempPlaces);

    //         // Show all the places around 4 km from San Francisco.
    //         console.log(
    //             'The places around San Francisco, CA, USA: ' +
    //             tempPlaces.map(nearbyPlaces => nearbyPlaces.placeName),
    //         );
    //     })
    //     .catch(error => { 
    //         console.log(error);
    //     });
    // });

    // console.log(places);

    return (
        // <View style={{
        //     alignItems: 'center',
        //     justifyContent: 'center',
        // }}>
        //     <MyCarousel data={['https://developers.google.com/static/maps/documentation/maps-static/images/quota.png', 'https://www.w3schools.com/images/colorpicker2000.png', 'https://www.w3schools.com/images/img_program_up_300.png']} />
        // </View>
        <Button title='FUCK' />
    );
};