import { log } from "console";
import { func } from "prop-types";

const API_KEY = "AIzaSyDXBtYy26NvRwIkZkTAjlYmFwafA9s-DsY";


export async function myFunction(lat: string, long: string) {
    const res = await getPlaces(lat, long);
    const images = await getAllPhotos(res);
    return images;
}

export async function placeName(lat: string, long: string) {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${API_KEY}`;
    const response = await fetch(url);
    const res = await response.json();

    return res.results[0].formatted_address;
}

async function getPlaces(lat: string, long: string) {
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${long}&radius=${4000}&key=${API_KEY}`;
    const response = await fetch(url);
    const result = await response.json();

    return (result.results);
}


async function getAllPhotos(places: any[]) {
    var images = [];

    for (var i = 0; i < places.length; i++) {
        const photoReference = places[i].photos[0].photo_reference;
        await getPhoto(photoReference).then(url => {images.push(url)});
    }

    return images;
}


async function getPhoto(photo_reference: string) {
    const url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photo_reference}&key=${API_KEY}`;
    const response = await fetch(url)

    return (response.url);
}

