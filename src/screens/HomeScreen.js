import {StyleSheet, Text, View, TextInput} from 'react-native';
import {ScrollView} from 'react-native-virtualized-view';
import React from 'react';
import {colors} from '../globals/style';
import {Icon} from '@rneui/base';
import HeaderNav from '../components/HeaderNav';
import OfferSlider from '../components/OfferSlider';
import CardSlider1 from '../components/CardSlider1';
import CardSlider2 from '../components/CardSlider2';

const HomeScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <HeaderNav navigation={navigation} />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/*-------------------- Search Container -------------------- */}
        <View style={styles.searchContainer}>
          <Icon
            name="search"
            type="ionicons"
            size={27}
            style={styles.searchIcon}
          />
          <TextInput style={styles.input} placeholder="Search" />
        </View>

        {/*-------------------- Offer Slider Section -------------------- */}
        <OfferSlider />

        {/*-------------------- Menu Slider Section -------------------- */}
        <CardSlider1
          cardTitle={'Menu'}
          viewTitle={'View Menu'}
          navigation={navigation}
        />

        {/*-------------------- Featured Slider Section -------------------- */}
        <CardSlider2
          cardTitle={'Featured'}
          viewTitle={'View Featured'}
          navigation={navigation}
        />
      </ScrollView>
      {/* -------------------- Bottom Nav -------------------- */}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.col6,
    width: '100%',
    height: '100%',
  },
  searchContainer: {
    flexDirection: 'row',
    width: '90%',
    height: 45,
    backgroundColor: colors.col5,
    borderRadius: 10,
    alignItems: 'center',
    padding: 10,
    margin: 20,
    elevation: 10,
  },
  input: {
    marginLeft: 10,
    width: '90%',
    height: 45,
    fontSize: 18,
    color: colors.col7,
  },
  searchIcon: {
    color: colors.col7,
    marginLeft: 15,
  },
});