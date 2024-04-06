import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    carousel_view: {
        paddingTop: '25%',
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'orange',
        opacity: 1,
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
    },
    location: {
        color: '#4f59e3',
    },
    locatorbar: {
        backgroundColor: 'white',
        textAlign: 'center',
        borderWidth: 20,
        borderColor: 'white',
    },
    button: {
        flex: 1,
    },
    flatlist: {
        flex: 1,
        flexGrow: 1,
    },
    seperator: {
        textAlign: 'center',
        margin: 10,
    },
    horizontal: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    logitem: {
        margin: 5,
        borderStyle: 'solid',
        borderColor: 'black',
        flex: 1,
    },
    input: {
        // flex: 1,
        margin: 10,
        width: '75%',
        height: 50,
        borderRadius: 25,
        borderColor: 'black',
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightgrey',
        textAlign: 'center',
    },
    miniinput: {
        width: '50%',
    },
    miniinputtext: {
        textAlign: 'center',
        flexGrow: 1,
    },
});
