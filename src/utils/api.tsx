import keys from '../../keys.json';

export async function getNearbyPhotos(lat: number, long: number) {
    const res = await getPlaces(lat, long).catch(() => {
        return [];
    });
    const images = await getAllPhotos(res).catch(() => {
        return [];
    });
    return images.map((image, index) => {
        let place: Place = {
            name: res[index].name,
            place_id: res[index].place_id,
            photoURL: image,
        };

        return place;
    });
}

export async function placeName(lat: number, long: number) {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${keys.google.places}`;
    const response = await fetch(url).catch(() => {
        return undefined;
    });
    const res = await response.json().catch(() => {
        return undefined;
    });
    console.log('address: ', res.results[0].formatted_address);

    return res.results[0].formatted_address;
}

export async function getPlaces(
    lat: number,
    long: number,
    radiusMeters: number = 1000
) {
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${long}&radius=${radiusMeters}&type=restaurant&key=${keys.google.places}`;
    const response = await fetch(url).catch(() => {
        return undefined;
    });
    const result = await response.json().catch(() => {
        return undefined;
    });

    return result.results;
}

export async function getAllPhotos(places) {
    var images = [];

    for (var i = 0; i < places.length; i++) {
        const photoReference = places[i].photos[0].photo_reference;

        if (photoReference != undefined) {
            await getPhoto(photoReference).then((url) => {
                images.push(url);
            });
        }
    }

    return images;
}

export async function getPhoto(photo_reference: string) {
    const url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photo_reference}&key=${keys.google.places}`;
    const response = await fetch(url).catch(() => {
        return undefined;
    });

    return response.url;
}

export interface Place {
    name: string;
    place_id: string;
    photoURL: string;
}
