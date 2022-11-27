import {
  StyleSheet,
  Text,
  View,
  Flatlist,
  TouchableOpacity,
  Image,
  TextInput,
  Pressable,
} from 'react-native';
import React, {useState} from 'react';
import {ScrollView} from 'react-native-virtualized-view';
import {Icon} from '@rneui/base';
import {colors} from '../globals/style';

const FoodDetailsScreen = ({navigation, route}) => {
  const [quantity, setQuantity] = useState('1');
  //----------Food Quantity: Increase & Decrease Button Function----------
  const increaseQuantity = () => {
    setQuantity((parseInt(quantity) + 1).toString());
  };
  const decreaseQuantity = () => {
    if (parseInt(quantity) > 1) {
      setQuantity((parseInt(quantity) - 1).toString());
    }
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
            onPress={() => navigation.goBack()}
          />
        </View>

        <Text style={styles.heading1}>Food</Text>
      </View>
      {/*-------------------- Food Details Body --------------------*/}
      <ScrollView>
        <View
          style={{
            marginTop: 10,
            marginBottom: 10,
            paddingHorizontal: 20,
          }}>
          {/* Food Card */}
          {/* Food Image */}
          <View
            style={{
              height: 190,
              borderRadius: 15,
              backgroundColor: colors.col5,
            }}>
            <Image
              source={route.params?.image}
              style={{
                height: 150,
                width: '100%',
                resizeMode: 'contain',
                marginVertical: 20,
              }}
            />
          </View>
          {/* Food Info */}
          <View style={{marginTop: 20}}>
            {/* Name & Description */}
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text
                style={{fontWeight: 'bold', fontSize: 20, color: colors.col7}}>
                {route.params?.title}
              </Text>
              <Text
                style={{fontWeight: 'bold', fontSize: 20, color: colors.col7}}>
                {route.params?.price}
              </Text>
            </View>
            <Text
              style={{
                marginTop: 10,
                color: colors.col8,
                textAlign: 'justify',
                fontSize: 15,
              }}>
              {route.params?.description}
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Food Details Footer */}
      <View
        style={{
          height: 120,
          width: '100%',
          backgroundColor: colors.col1,
          paddingVertical: 10,
          paddingHorizontal: 10,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}>
        <Text style={{fontWeight: 'bold', fontSize: 20, color: colors.col7}}>
          Total Price:&nbsp;{route.params?.price}
        </Text>

        {/* Quantity & Add to Bag Button */}
        <View
          style={{
            flexDirection: 'row',
            paddingVertical: 20,
            justifyContent: 'space-between',
          }}>
          {/* Quantity */}
          <View
            style={{
              flexDirection: 'row',
              height: 45,
              width: 150,
              backgroundColor: colors.col1,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: 60,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TouchableOpacity onPress={decreaseQuantity}>
                <Icon
                  name="minuscircleo"
                  type="antdesign"
                  size={30}
                  style={{height: 30, width: 30}}
                />
              </TouchableOpacity>
            </View>

            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: '500',
                  color: colors.col7,
                }}>
                {quantity}
              </Text>
            </View>
            <View
              style={{
                width: 60,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TouchableOpacity onPress={increaseQuantity}>
                <Icon
                  name="pluscircleo"
                  type="antdesign"
                  color={colors.col4}
                  size={30}
                  style={{height: 30, width: 30}}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Add to Bag Button */}
          <View
            style={{
              width: '50%',
              height: 45,
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center',
              borderRadius: 10,
              backgroundColor: colors.col2,
            }}>
            <TouchableOpacity>
              <Text
                style={{fontWeight: 'bold', fontSize: 18, color: colors.col7}}>
                Add to Bag
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default FoodDetailsScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.col6,
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
