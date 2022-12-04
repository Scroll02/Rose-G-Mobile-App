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
import React, {useState, useEffect} from 'react';
import {ScrollView} from 'react-native-virtualized-view';
import {Icon} from '@rneui/base';
import {colors} from '../globals/style';
import {firebase} from '../Firebase/FirebaseConfig';

const FoodDetailsScreen = ({navigation, route}) => {
  const data = route.params;

  const [quantity, setQuantity] = useState('1');
  const [addOnQuantity, setAddOnQuantity] = useState('0');
  const [addOnPrice, setAddOnPrice] = useState('0');

  //----------Add To Bag Function----------
  const addToBag = () => {
    //console.log(addtocart);
    const docRef = firebase
      .firestore()
      .collection('UserBag')
      .doc(firebase.auth().currentUser.uid);

    const data1 = {
      data,
      addOnQty: addOnQuantity,
      foodQty: quantity,
    };
    console.log('data1', data1);

    docRef.get().then(doc => {
      if (doc.exists) {
        docRef.update({
          bag: firebase.firestore.FieldValue.arrayUnion(data1),
        });
        alert('Added to cart ');
        navigation.replace('Menu');
      } else {
        docRef.set({
          bag: [data1],
        });
        alert('Added to cart');
        navigation.replace('Menu');
      }
    });
  };

  //----------Food Quantity: Increase & Decrease Button Function----------//
  const increaseQuantity = () => {
    setQuantity((parseInt(quantity) + 1).toString());
  };
  const decreaseQuantity = () => {
    if (parseInt(quantity) > 1) {
      setQuantity((parseInt(quantity) - 1).toString());
    }
  };

  //----------Add On Quantity: Increase & Decrease Button Function----------//
  const increaseAddonQuantity = () => {
    setAddOnQuantity((parseInt(addOnQuantity) + 1).toString());
  };
  const decreaseAddonQuantity = () => {
    if (parseInt(addOnQuantity) > 0) {
      setAddOnQuantity((parseInt(addOnQuantity) - 1).toString());
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
            onPress={() => navigation.replace('Menu')}
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
            width: 370,
            marginHorizontal: 10,
          }}>
          {/* Food Card */}
          {/* Food Image */}
          <View
            style={{
              height: 250,
              width: '100%',
              borderRadius: 15,
              backgroundColor: colors.col5,
            }}>
            <Image
              source={{uri: data.img}}
              style={{
                height: 220,
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
                {data.foodName}
              </Text>
              <Text
                style={{fontWeight: 'bold', fontSize: 20, color: colors.col7}}>
                ₱&nbsp;{data.price}
              </Text>
            </View>
            <Text
              style={{
                marginTop: 10,
                color: colors.col8,
                textAlign: 'justify',
                fontSize: 15,
              }}>
              {data.description}
            </Text>

            {/* Add Ons */}
            {data.addOnPrice !== ' ' && (
              <View style={{marginTop: 20}}>
                <Text style={{fontSize: 15, fontWeight: 'bold'}}>Add Ons:</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                  }}>
                  <View>
                    <Text style={{fontSize: 15}}>{data.addOn}</Text>
                    <Text style={{fontSize: 15}}>
                      ₱&nbsp;
                      {data.addOnPrice}
                    </Text>
                  </View>

                  {/* Add On Quantity */}
                  <View
                    style={{
                      flexDirection: 'row',
                      height: 45,
                      width: 150,
                      backgroundColor: colors.col6,
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
                      <TouchableOpacity onPress={decreaseAddonQuantity}>
                        <Icon
                          name="minuscircleo"
                          type="antdesign"
                          size={22}
                          style={{height: 23, width: 23}}
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
                        {addOnQuantity}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: 60,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <TouchableOpacity onPress={increaseAddonQuantity}>
                        <Icon
                          name="pluscircleo"
                          type="antdesign"
                          color={colors.col4}
                          size={22}
                          style={{height: 23, width: 23}}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            )}
          </View>
        </View>
      </ScrollView>

      {/*-------------------- Food Details Footer --------------------*/}
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
        {/* Total Price */}
        {data.addOnPrice !== 0 ? (
          <Text style={{fontWeight: 'bold', fontSize: 20, color: colors.col7}}>
            Total Price:&nbsp; ₱&nbsp;
            {(
              parseInt(data.price * quantity) +
              parseInt(data.addOnPrice * addOnQuantity)
            ).toString()}
          </Text>
        ) : (
          <Text style={{fontWeight: 'bold', fontSize: 20, color: colors.col7}}>
            Total Price:&nbsp; ₱&nbsp;
            {parseInt(data.price * quantity).toString()}
          </Text>
        )}
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
            <TouchableOpacity onPress={() => addToBag()}>
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
