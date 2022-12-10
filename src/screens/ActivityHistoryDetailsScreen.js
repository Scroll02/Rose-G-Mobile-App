import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import {ScrollView} from 'react-native-virtualized-view';
import React, {useState, useEffect} from 'react';
import {Icon} from '@rneui/base';
import {button1, colors} from '../globals/style';
import {firebase} from '../Firebase/FirebaseConfig';

const ActivityHistoryDetailsScreen = ({navigation}) => {
  return (
    <View style={styles.mainContainer}>
      {/*-------------------- Header Navigation --------------------*/}
      <View style={styles.headerContainer}>
        <View style={styles.goBackIcon}>
          <Icon
            name="arrow-back"
            type="material"
            size={30}
            onPress={() => navigation.navigate('ActivityHistory')}
          />
        </View>

        <Text style={styles.heading1}>Activity Details</Text>
      </View>
    </View>
  );
};

export default ActivityHistoryDetailsScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.col6,
    width: '100%',
    height: '100%',
  },

  //-------------------- Header Navigation --------------------//
  headerContainer: {
    flexDirection: 'row',
    width: '100%',
    height: 50,
    alignItems: 'center',
    padding: 10,
    backgroundColor: colors.col1,
    elevation: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  goBackIcon: {
    color: colors.col7,
    marginLeft: 5,
    width: 40,
  },
  heading1: {
    flex: 1,
    paddingRight: 45,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    color: colors.col7,
  },
});
