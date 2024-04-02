import { log } from "console";
import { func } from "prop-types";

const API_KEY = "AIzaSyDXBtYy26NvRwIkZkTAjlYmFwafA9s-DsY";


export async function myFunction(lat, long) {
    const res = await getPlaces(lat, long);
    const place = res[0]
    const photos = place.photos
    const images = await getAllPhotos(res);
    return images;
    
    // this is good
}

export async function placeName(lat:string, long:string) {
    const BASE = "https://maps.googleapis.com/maps/api/geocode/json?latlng="
    // const BASE = "https://maps.googleapis.com/maps/api/geocode/json?latlng=41.8663655786681,-87.6457829806161&key=AIzaSyDXBtYy26NvRwIkZkTAjlYmFwafA9s-DsY"

    const fullURL = BASE + lat + "," + long + "&key=" + API_KEY
    const response = await fetch(fullURL, {})
    const res = await response.json();
    return res.results[0].formatted_address;
}

async function getPlaces(lat, long) {

    const response = await fetch("https://places.googleapis.com/v1/places:searchNearby", {
        method: "POST",
        headers: 
        {
            "Content-Type": "application/json",
            "X-Goog-Api-Key": API_KEY,
            "X-Goog-FieldMask": "places.photos"
        }, 
        body: JSON.stringify({
            "includedTypes": ["restaurant"],
            "maxResultCount": 10,
            "locationRestriction": {
                "circle": {
                "center": {
                    "latitude": lat,
                    "longitude": long},
                "radius": 500.0 // meters
                }
            }
        })
    })

    var result = await response.json();
    return (result.places);
}


async function getAllPhotos(places) {
    var images = [];
     for (var i = 0; i < places.length; i++) {
        const  photoURL = places[i].photos[0].name;
        await getPhoto(photoURL).then((test) => {images.push(test)});
    }
    return images;
}


async function getPhoto(URL) {
    const BASE = "https://places.googleapis.com/v1/"

    const fullURL = BASE + URL + "/media?maxHeightPx=400&maxWidthPx=400&key=" + API_KEY
    const response = await fetch(fullURL, {})
    return (response.url);
}

