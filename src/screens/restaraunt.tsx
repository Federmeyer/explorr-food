import { View, Text } from 'react-native';
import styles from '../utils/styles';

const Restaraunt = ({ route, navigation }) => {
    return (
        <View style={[styles.centered]}>
            <Text>{route.params.name}</Text>
        </View>
    );
};

export default Restaraunt;
