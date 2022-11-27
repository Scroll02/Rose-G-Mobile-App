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

const BagScreen = ({navigation}) => {
  const [myBagList, setMyBagList] = useState(productData);

  const [quantity, setQuantity] = useState('1');

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
      <SwipeListView
        data={myBagList}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => `${item.id}`}
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
                  source={data.item.image}
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
                  {data.item.title}
                </Text>
                <Text style={{color: colors.col7, fontWeight: 'bold'}}>
                  {data.item.price}
                </Text>
                <Text style={{fontSize: 13, marginTop: 5}}>Add ons:</Text>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{fontSize: 13}}>{data.item.addOnQty}&nbsp;</Text>
                  <Text style={{fontSize: 13}}>{data.item.addOn}</Text>
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
                  ₱ 123123
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
                    <TouchableOpacity>
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
                      {quantity}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: 30,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <TouchableOpacity>
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
              <TouchableOpacity>
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
      {/*-------------------- Footer Component --------------------*/}
      <View
        style={{
          backgroundColor: colors.col1,
          height: 160,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}>
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
            ₱123.00
          </Text>
        </View>

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
            ₱ 0.00
          </Text>
        </View>

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
            ₱ 123.00
          </Text>
        </View>

        {/*-------------------- Proceed to Checkout Button --------------------*/}
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
            onPress={() => navigation.navigate('CheckOut')}>
            <Text
              style={{fontSize: 18, fontWeight: 'bold', color: colors.col7}}>
              Proceed to Checkout
            </Text>
          </TouchableOpacity>
        </View>
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
