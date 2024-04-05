import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
    },

    carousel_view: {
        paddingTop: '20%',
        flex: 1,
        alignItems: 'center',
    },

    carousel: {
        paddingTop: 10,
        display: 'flex',
        flex: 1,
        alignItems: 'center',
    },

    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    imageBackground: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },

    map_view: {
        flex: 1,
        alignItems: 'center',
    },

    map: {
        width: '100%',
        height: '100%',
    },

    slider: {
        marginLeft: '10%',
        marginRight: '10%',
        height: 40,
        color: 'black',
        // marginTop: 50,
    },
    location: {
        color: '#4f59e3',
    },
    locatorbar: {
        backgroundColor: 'white',
        // alignItems: 'center',
        // justifyContent: 'center',
        textAlign: 'center',
        // margin: 25,
        borderWidth: 20,
        borderColor: 'white',
        // borderRadius: 25,
    },
    button: {
        // alignItems: 'center',
        // justifyContent: 'center',
        // width: '50%',
        // padding: 10,
        borderRadius: 25,
        // backgroundColor: 'black',
    },
});
