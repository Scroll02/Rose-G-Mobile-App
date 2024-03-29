import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {ScrollView} from 'react-native-virtualized-view';
import React, {useState, useEffect} from 'react';
import {Icon} from '@rneui/base';
import {colors} from '../globals/style';
import {categoryList} from '../globals/sampleData';
import {productData} from '../globals/sampleData';
import {firebase} from '../Firebase/FirebaseConfig';

const MenuScreen = ({navigation, route}) => {
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);

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

  const [productList, setProductList] = useState(foodData);

  /*-------------------- Categories Section --------------------*/
  const setCategoryFilter = selectedCategoryIndex => {
    if (selectedCategoryIndex !== 0) {
      setProductList([
        ...foodData.filter(e => e.categoryTitle === selectedCategoryIndex),
      ]);
    } else {
      setProductList(foodData);
    }
    setSelectedCategoryIndex(selectedCategoryIndex);
  };

  return (
    <View style={styles.mainContainer}>
      {/*-------------------- Header Navigation --------------------*/}
      <View style={styles.headerContainer}>
        <View style={styles.goBackIcon}>
          <Icon
            name="arrow-back"
            type="material"
            size={30}
            onPress={() => navigation.navigate('Home')}
          />
        </View>

        <Text style={styles.heading1}>Menu</Text>
      </View>

      {/*-------------------- Categories Button Section --------------------*/}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesListContainer}>
        <View style={{flexDirection: 'row'}}>
          {categoryList.map((e, index) => {
            return (
              <TouchableOpacity
                key={index}
                activeOpacity={0.8}
                onPress={() => {
                  setCategoryFilter(e.categoryTitle);

                  setSelectedCategoryIndex(index);
                }}>
                <View
                  style={{
                    backgroundColor:
                      selectedCategoryIndex == index
                        ? colors.col2
                        : colors.col5,
                    ...styles.categoryBtn,
                  }}>
                  <Text style={styles.categoryBtnTxt}>{e.categoryTitle}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/*-------------------- Menu --------------------*/}
      <ScrollView showsVerticalScrollIndicator={false}>
        <FlatList
          numColumns={2}
          style={styles.foodContainerOut}
          data={productList}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('FoodDetails', {
                    foodId: item.foodId,
                    foodName: item.foodName,
                    description: item.description,
                    img: item.img,
                    price: item.price,
                    addOn: item.addOn,
                    addOnPrice: item.addOnPrice,
                  })
                }>
                <View style={styles.foodContainerIn}>
                  <View style={styles.foodImgContainer}>
                    <Image source={{uri: item.img}} style={styles.foodImg} />
                  </View>
                  <Text style={styles.foodTitle}>{item.foodName}</Text>
                  <Text numberOfLines={2} style={styles.foodDescription}>
                    {item.description}
                  </Text>
                  <Text style={styles.foodPriceTxt}>
                    ₱&nbsp;{parseFloat(item.price).toFixed(2)}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </ScrollView>
    </View>
  );
};

export default MenuScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.col6,
    width: '100%',
    height: '100%',
  },
  categoryContainer: {
    marginVertical: 20,
    width: '100%',
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

  //-------------------- Categories Section --------------------//
  categoriesListContainer: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    // backgroundColor: 'red',
  },
  categoryBtn: {
    height: 45,
    width: 110,
    marginRight: 7,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  categoryBtnTxt: {
    fontWeight: 'bold',
    fontSize: 15,
    color: colors.col7,
  },

  //-------------------- Menu --------------------//
  foodContainerOut: {
    height: Dimensions.get('screen').height,
    marginHorizontal: 8,
    // backgroundColor: 'red',
  },
  foodContainerIn: {
    borderColor: colors.col5,
    backgroundColor: colors.col5,
    borderRadius: 10,
    margin: 10,
    borderWidth: 1,
    width: 170,
    height: 230,
  },
  foodImgContainer: {
    alignItems: 'center',
  },
  foodImg: {
    width: 130,
    height: 130,
    resizeMode: 'contain',
    justifyContent: 'center',
    alignItems: 'center',
  },
  foodTitle: {
    fontWeight: '400',
    color: colors.col7,
    fontSize: 15,
    marginTop: 5,
    marginLeft: 10,
  },
  foodDescription: {
    marginLeft: 10,
    fontSize: 13,
    marginBottom: 5,
  },
  foodPriceTxt: {
    fontWeight: '700',
    marginLeft: 10,
    color: colors.col7,
  },
});
