const API_KEY = 'AIzaSyDXBtYy26NvRwIkZkTAjlYmFwafA9s-DsY';

export async function getNearbyPhotos(lat: string, long: string) {
    const res = await getPlaces(lat, long).catch(() => {
        return [];
    });
    const images = await getAllPhotos(res).catch(() => {
        return [];
    });
    return images;
}

export async function placeName(lat: string, long: string) {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${API_KEY}`;
    const response = await fetch(url).catch(() => {
        return undefined;
    });
    const res = await response.json().catch(() => {
        return undefined;
    });
    console.log('address: ', res.results[0].formatted_address);

    return res.results[0].formatted_address;
}

export async function getPlaces(lat: string, long: string) {
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${long}&radius=${1000}&type=restaurant&key=${API_KEY}`;
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
    const url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photo_reference}&key=${API_KEY}`;
    const response = await fetch(url).catch(() => {
        return undefined;
    });

    return response.url;
}
