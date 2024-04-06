import * as Location from 'expo-location';


const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
        console.log('Permission to access location denied');
        return;
    }
    console.log('Permission to access location granted!');

    let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
    });
    return location;
};

export default getLocation;
