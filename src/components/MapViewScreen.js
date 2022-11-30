import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../globals/style';

const MapViewScreen = () => {
  return (
    <View style={styles.mainContainer}>
      <Text>Map View Screen</Text>
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
