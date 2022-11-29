import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors} from '../globals/style';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
const MapViewScreen = () => {
  return (
    <View style={styles.mainContainer}>
      <Text>asd</Text>
    </View>
  );
};

export default MapViewScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.col6,
    alignItems: 'center',
  },
});
