import * as React from 'react';
import { Button, View, Text } from 'react-native';

export const Restaraunt = ({navigation, route}) => {
    return (
      <View>
        <Text>
          This is a test! {route.params.name}!!!
        </Text>
      </View>
    ); 
  };