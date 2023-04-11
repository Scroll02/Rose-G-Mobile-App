import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Image,
} from 'react-native';
import {ScrollView} from 'react-native-virtualized-view';
import React, {useState, useEffect} from 'react';
import {Icon} from '@rneui/base';
import {colors} from '../globals/style';
import {productData} from '../globals/sampleData';
import {SwipeListView} from 'react-native-swipe-list-view';
import {firebase} from '../Firebase/FirebaseConfig';

const BagScreen = ({navigation}) => {
  const [quantity, setQuantity] = useState('1');

  const [bagData, setBagData] = useState(null);
  const [subtotalCost, setSubTotalCost] = useState('0');
  const [totalCost, setTotalCost] = useState('0');

  /*-------------------- Retrieving UserBag Data --------------------*/
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

  /*-------------------- Sub Total Cost & Total Cost --------------------*/
  useEffect(() => {
    if (bagData != null) {
      const foodPrice = JSON.parse(bagData).bag;
      let subTotalFoodCost = 0;
      let grandTotalFoodCost = 0;
      foodPrice.map(item => {
        // Sub Total Cost
        subTotalFoodCost =
          parseInt(item.data.price * item.foodQty) +
          parseInt(item.data.addOnPrice * item.addOnQty) +
          subTotalFoodCost;
        // Total Cost
        grandTotalFoodCost = subTotalFoodCost + 50;
      });
      setSubTotalCost(JSON.stringify(subTotalFoodCost));
      setTotalCost(JSON.stringify(grandTotalFoodCost));
    }
  }, [bagData]);

  //----------Food Quantity: Increase & Decrease Button Function----------//
  // const increaseQuantity = () => {
  //   setQuantity((parseInt(quantity) + 1).toString());
  // };

  const increaseQuantity = async itemIndex => {
    try {
      const docRef = firebase
        .firestore()
        .collection('UserBag')
        .doc(firebase.auth().currentUser.uid);

      await docRef.update({
        [`bag.${itemIndex}.foodQty`]:
          firebase.firestore.FieldValue.increment(1),
      });

      setQuantity((parseInt(quantity) + 1).toString());
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const decreaseQuantity = () => {
    if (parseInt(quantity) > 1) {
      setQuantity((parseInt(quantity) - 1).toString());
    }
  };

  /*-------------------- Delete Button --------------------*/
  const deleteItem = item => {
    const docRef = firebase
      .firestore()
      .collection('UserBag')
      .doc(firebase.auth().currentUser.uid);
    docRef.update({
      bag: firebase.firestore.FieldValue.arrayRemove(item),
    });
    getBagData();
  };

  const [myBagList, setMyBagList] = useState(productData);

  return (
    <View style={styles.mainContainer}>
      {/*-------------------- Header Navigation --------------------*/}
      <View style={styles.headerContainer}>
        <View style={styles.goBackIcon}>
          <Icon
            name="arrow-back"
            type="material"
            size={30}
            onPress={() => navigation.replace('Home')}
          />
        </View>

        <Text style={styles.heading1}>Bag</Text>
      </View>
      {/*-------------------- Order Summary Title --------------------*/}
      <View
        style={{
          backgroundColor: colors.col6,
          marginHorizontal: 20,
          paddingTop: 10,
        }}>
        <Text style={{color: colors.col7, fontWeight: 'bold', fontSize: 17}}>
          Order Summary
        </Text>
      </View>
      {/*-------------------- Bag List --------------------*/}

      {bagData == null || JSON.parse(bagData).bag.length == 0 ? (
        /*-------------------- Bag is empty --------------------*/
        <View style={{flex: 1, alignItems: 'center'}}>
          <View style={{marginVertical: 30}}>
            <Image
              source={require('../../assets/images/shopping-bag.png')}
              style={{width: 200, height: 200}}
            />
          </View>
          <Text style={{fontWeight: 'bold', fontSize: 25, margin: 10}}>
            Your bag is empty
          </Text>
          <Text style={{fontWeight: 'bold', fontSize: 15, margin: 10}}>
            Check the food we offer on the Menu
          </Text>
        </View>
      ) : (
        /*-------------------- Bag is not empty --------------------*/
        <SwipeListView
          data={JSON.parse(bagData).bag}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => `${item.id}${index}`}
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingBottom: 20,
          }}
          disableRightSwipe={true}
          rightOpenValue={-75}
          renderItem={(data, rowMap) => {
            return (
              <View
                style={{
                  height: 120,
                  backgroundColor: colors.col5,
                  ...styles.bagItemContainer,
                }}>
                {/* Food Image */}
                <View
                  style={{
                    width: 90,
                    height: 80,
                    marginLeft: -15,
                  }}>
                  <Image
                    source={{uri: data.item.data?.img}}
                    resizeMode="contain"
                    style={{
                      width: '100%',
                      height: '100%',
                      position: 'absolute',
                    }}
                  />
                </View>
                {/* Food Info */}
                <View style={{flex: 1}}>
                  <Text style={{color: colors.col7, fontWeight: '500'}}>
                    {data.item.data?.foodName}
                  </Text>
                  <Text style={{color: colors.col7, fontWeight: 'bold'}}>
                    ₱ {parseFloat(data.item.data?.price).toFixed(2)}
                  </Text>
                  <Text style={{fontSize: 13, marginTop: 5}}>Add ons:</Text>
                  <View style={{flexDirection: 'row'}}>
                    {data.item.addOnQty != 0 && (
                      <Text style={{fontSize: 13}}>
                        {data.item.addOnQty}&nbsp;
                      </Text>
                    )}
                    {data.item.addOnQty != 0 && (
                      <Text style={{fontSize: 13}}>
                        {data.item.data?.addOn}
                      </Text>
                    )}
                  </View>
                </View>

                {/* Total Price per item & Quantity */}
                <View>
                  {/* Total Price per item */}
                  <Text
                    style={{
                      alignSelf: 'flex-end',
                      padding: 10,
                      color: colors.col7,
                      fontWeight: 'bold',
                      fontSize: 15,
                    }}>
                    ₱
                    {data.item.addOnQty != 0
                      ? (
                          parseFloat(
                            data.item.data?.price * data.item.foodQty,
                          ) +
                          parseFloat(
                            data.item.data?.addOnPrice * data.item.addOnQty,
                          ) *
                            parseFloat(quantity)
                        ).toFixed(2)
                      : (
                          parseFloat(
                            data.item.data?.price * data.item.foodQty,
                          ) * parseFloat(quantity)
                        ).toFixed(2)}
                  </Text>
                  {/* Quantity */}
                  <View
                    style={{
                      flexDirection: 'row',
                      height: 40,
                      width: 100,
                      backgroundColor: colors.col5,
                      borderRadius: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        width: 30,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <TouchableOpacity onPress={decreaseQuantity}>
                        <Icon
                          name="minuscircleo"
                          type="antdesign"
                          size={20}
                          style={{height: 20, width: 20}}
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
                        {parseInt(data.item.foodQty * quantity).toString()}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: 30,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <TouchableOpacity onPress={increaseQuantity}>
                        <Icon
                          name="pluscircleo"
                          type="antdesign"
                          color={colors.col4}
                          size={20}
                          style={{height: 20, width: 20}}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            );
          }}
          renderHiddenItem={(data, rowMap) => {
            return (
              /*-------------------- Delete Button --------------------*/
              <View
                style={{
                  flex: 1,
                  justifyContent: 'flex-end',
                  backgroundColor: colors.col2,
                  ...styles.bagItemContainer,
                }}>
                <TouchableOpacity onPress={() => deleteItem(data.item)}>
                  <Icon
                    name="delete-outline"
                    type="material-icon"
                    size={30}
                    style={{marginRight: 5, fontWeight: 'bold'}}
                  />
                </TouchableOpacity>
              </View>
            );
          }}
        />
      )}
      {/*-------------------- Footer Component --------------------*/}
      <View
        style={{
          backgroundColor: colors.col1,
          height: 160,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}>
        {/*-------------------- Sub Total --------------------*/}
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text
            style={{
              paddingTop: 10,
              paddingHorizontal: 25,
              fontSize: 16,
              color: colors.col7,
              fontWeight: '500',
            }}>
            Subtotal:
          </Text>
          <Text
            style={{
              paddingTop: 10,
              paddingHorizontal: 25,
              fontSize: 16,
              color: colors.col7,
              fontWeight: '500',
            }}>
            ₱ {(parseFloat(subtotalCost) * parseFloat(quantity)).toFixed(2)}
          </Text>
        </View>

        {/*-------------------- Shipping Fee --------------------*/}
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text
            style={{
              paddingTop: 5,
              paddingHorizontal: 25,
              fontSize: 16,
              color: colors.col7,
              fontWeight: '500',
            }}>
            Shipping Fee:
          </Text>
          <Text
            style={{
              paddingTop: 5,
              paddingHorizontal: 25,
              fontSize: 16,
              color: colors.col7,
              fontWeight: '500',
            }}>
            ₱ 50.00
          </Text>
        </View>

        {/*-------------------- Total Cost --------------------*/}
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text
            style={{
              paddingTop: 10,
              paddingHorizontal: 25,
              fontSize: 20,
              color: colors.col7,
              fontWeight: 'bold',
            }}>
            Total:
          </Text>
          <Text
            style={{
              paddingTop: 10,
              paddingHorizontal: 25,
              fontSize: 20,
              color: colors.col7,
              fontWeight: 'bold',
            }}>
            ₱ {parseFloat(totalCost).toFixed(2)}
          </Text>
        </View>

        {/*-------------------- Proceed to Checkout Button --------------------*/}
        {bagData == null || JSON.parse(bagData).bag.length == 0 ? (
          /*-------------------- Disabled Proceed to Checkout Button when bag is empty --------------------*/
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              disabled={true}
              style={{
                backgroundColor: colors.col2,
                width: 300,
                height: 40,
                borderRadius: 20,
                justifyContent: 'center',
                alignItems: 'center',
                opacity: 0.6,
              }}
              onPress={() => navigation.navigate('CheckOut', {bagData})}>
              <Text
                style={{fontSize: 18, fontWeight: 'bold', color: colors.col7}}>
                Proceed to Checkout
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          /*-------------------- Enable Button Proceed to Checkout Button when bag is not empty --------------------*/
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={{
                backgroundColor: colors.col2,
                width: 300,
                height: 40,
                borderRadius: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => navigation.navigate('CheckOut', {bagData})}>
              <Text
                style={{fontSize: 18, fontWeight: 'bold', color: colors.col7}}>
                Proceed to Checkout
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

export default BagScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.col6,
    // alignItems: 'center',
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

  //-------------------- Bag --------------------//
  bagItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
});
