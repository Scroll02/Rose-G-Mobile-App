import {StyleSheet, Text, View, TextInput} from 'react-native';
import {ScrollView} from 'react-native-virtualized-view';
import React, {useState, useEffect} from 'react';
import {colors} from '../globals/style';
import {Icon} from '@rneui/base';
import HeaderNav from '../components/HeaderNav';
import OfferSlider from '../components/OfferSlider';
import CardSlider1 from '../components/CardSlider1';
import CardSlider2 from '../components/CardSlider2';
import {firebase} from '../Firebase/FirebaseConfig';

const HomeScreen = ({navigation}) => {
  /*-------------------- Retrieving Food Data --------------------*/
  const [foodData, setFoodData] = useState([]);

  const [drinksData, setDrinksData] = useState([]);
  const [iceCreamData, setIceCreamData] = useState([]);

  const foodRef = firebase.firestore().collection('FoodData');

  useEffect(() => {
    foodRef.onSnapshot(snapshot => {
      setFoodData(snapshot.docs.map(doc => doc.data()));
    });
  }, []);

  useEffect(() => {
    setDrinksData(foodData.filter(item => item.categoryTitle == 'Drinks'));
    setIceCreamData(foodData.filter(item => item.categoryTitle == 'Ice Cream'));
  }, [foodData]);

  /*-------------------- Count Bag Items --------------------*/
  const [bagData, setBagData] = useState(null);
  const getBagData = async () => {
    const docRef = firebase
      .firestore()
      .collection('UserBag')
      .doc(firebase.auth().currentUser.uid);

    docRef.get().then(doc => {
      if (doc.exists) {
        const data = JSON.stringify(doc.data());
        setBagData(data);
      } else {
        console.log('No such document!');
      }
    });
  };
  useEffect(() => {
    getBagData();
  }, []);

  return (
    <View style={styles.container}>
      <HeaderNav navigation={navigation} data={bagData} />

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
          data={foodData}
          cardTitle={'Foods'}
          viewTitle={'View Foods'}
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
