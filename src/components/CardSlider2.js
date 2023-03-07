import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {
  colors,
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveScreenFontSize,
} from '../globals/style';
import {featuredData} from '../globals/sampleData';

const CardSlider2 = ({cardTitle, viewTitle, navigation, data}) => {
  const openFoodDetailsScreen = item => {
    //console.log(item);
    navigation.navigate('FoodDetails', item);
  };
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.cardTitle}>{cardTitle}</Text>
        <Text
          style={styles.viewTitle}
          onPress={() => navigation.navigate('Menu')}>
          {viewTitle}
        </Text>
      </View>

      <FlatList
        style={styles.featuredContainer}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.replace('FoodDetails', {
                  foodId: item.foodId,
                  foodName: item.foodName,
                  description: item.description,
                  img: item.img,
                  price: item.price,
                  addOn: item.addOn,
                  addOnPrice: item.addOnPrice,
                  // openFoodDetailsScreen(item);
                });
              }}>
              <View style={styles.cardContainer}>
                <View style={styles.imageContainer}>
                  <Image source={{uri: item.img}} style={styles.cardImg} />
                </View>

                <Text style={styles.productTitle}>{item.foodName}</Text>
                <Text numberOfLines={2} style={styles.descriptionTxt}>
                  {item.description}
                </Text>
                <Text style={styles.productPriceTxt}>
                  ₱&nbsp;{parseFloat(item.price).toFixed(2)}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default CardSlider2;

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    width: responsiveScreenWidth(100),
    justifyContent: 'space-between',
  },
  cardTitle: {
    color: colors.col7,
    // fontSize: 20,
    fontSize: responsiveScreenFontSize(2.5),
    fontWeight: 'bold',
    marginHorizontal: 20,
  },
  viewTitle: {
    color: colors.col4,
    fontSize: responsiveScreenFontSize(2),
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    marginHorizontal: 20,
    marginVertical: 5,
  },
  featuredContainer: {
    width: responsiveScreenWidth(100),
    //backgroundColor: 'red',
  },
  cardContainer: {
    // width: 160,
    width: responsiveScreenWidth(45),
    // height: 230,
    height: responsiveScreenHeight(28),
    borderWidth: 1,
    borderColor: colors.col5,
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: colors.col5,
    borderRadius: 10,
  },
  imageContainer: {
    alignItems: 'center',
    backgroundColor: colors.col5,
  },
  cardImg: {
    width: 140,
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'contain',
  },
  productTitle: {
    fontWeight: '400',
    color: colors.col7,
    fontSize: 15,
    marginTop: 5,
    marginLeft: 10,
  },
  descriptionTxt: {
    fontSize: 12,
    marginLeft: 10,
    marginBottom: 5,
  },
  productPriceTxt: {
    fontWeight: '700',
    marginLeft: 10,
    color: colors.col7,
  },
});
