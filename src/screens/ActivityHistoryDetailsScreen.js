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
import moment from 'moment';

const ActivityHistoryDetailsScreen = ({navigation, route}) => {
  // -------------------- Retrieve User Orders Data -------------------- //
  const orders = route.params;
  // console.log(orders);

  // -------------------- Compute Sub Total Cost -------------------- //
  const [subtotalCost, setSubTotalCost] = useState('0');
  useEffect(() => {
    if (orders != null) {
      const foodPrice = orders.orderData;
      let subTotalFoodCost = 0;
      foodPrice.map(item => {
        // Sub Total Cost
        subTotalFoodCost =
          parseInt(item.data.price * item.foodQty) +
          parseInt(item.data.addOnPrice * item.addOnQty) +
          subTotalFoodCost;
      });
      setSubTotalCost(JSON.stringify(subTotalFoodCost));
    }
  }, [orders]);

  // -------------------- Convert the Timestamp to Date -------------------- //
  const convertDate = date => {
    const newDate = new Date(date && date.toDate && date.toDate().getTime());
    return newDate.toDateString();
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
            onPress={() => navigation.navigate('ActivityHistory')}
          />
        </View>

        <Text style={styles.heading1}>Activity Details</Text>
      </View>

      {/*-------------------- Activity Details Screen Body --------------------*/}
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{flex: 1, width: '100%', height: '100%'}}>
        {/*-------------------- Order Details --------------------*/}
        <View
          style={{
            marginTop: 20,
            width: '90%',
            marginHorizontal: 20,
            marginVertical: 15,
            paddingVertical: 10,
            borderRadius: 10,
            elevation: 10,
            backgroundColor: colors.col5,
          }}>
          {/* Order ID */}
          <View
            style={{
              flexDirection: 'row',
              alignItem: 'center',
              justifyContent: 'space-between',
              marginTop: 5,
              marginBottom: 5,
              paddingHorizontal: 10,
            }}>
            <Text style={{fontWeight: 'bold', color: colors.col7}}>
              Order ID:
            </Text>
            <Text style={{}}>{orders.orderId}</Text>
          </View>

          {/* Order Date */}
          <View
            style={{
              flexDirection: 'row',
              alignItem: 'center',
              justifyContent: 'space-between',
              marginBottom: 5,
              paddingHorizontal: 10,
            }}>
            <Text style={{fontWeight: 'bold', color: colors.col7}}>
              Order Date:
            </Text>
            <Text style={{}}>
              {moment(orders.orderDate.toDate()).format('MMM D, YYYY h:mm A')}
            </Text>
          </View>

          {/* Order Status */}
          {orders.orderStatus === 'Delivered' ? (
            /* Order Status - Delivered */
            <View
              style={{
                flexDirection: 'row',
                alignItem: 'center',
                justifyContent: 'space-between',
                marginBottom: 10,
                paddingHorizontal: 10,
              }}>
              <Text style={{fontWeight: 'bold', color: colors.col7}}>
                Order Status:
              </Text>
              <Text style={{color: 'green'}}>{orders.orderStatus}</Text>
            </View>
          ) : (
            /* Order Status - Cancelled */
            <View
              style={{
                flexDirection: 'row',
                alignItem: 'center',
                justifyContent: 'space-between',

                marginBottom: 10,
                paddingHorizontal: 10,
              }}>
              <Text style={{fontWeight: 'bold', color: colors.col7}}>
                Order Status:
              </Text>
              <Text style={{color: 'red'}}>{orders.orderStatus}</Text>
            </View>
          )}

          {/* Delivery Address */}
          <View
            style={{
              marginBottom: 20,
              paddingHorizontal: 10,
            }}>
            <Text
              style={{
                color: colors.col7,
                fontSize: 14,
              }}>
              Delivery Address:
            </Text>
            <Text
              style={{
                color: colors.col7,
                fontSize: 14,
                fontWeight: 'bold',
              }}>
              {orders.orderAddress}
            </Text>
          </View>
        </View>

        {/*-------------------- Order Summary --------------------*/}
        <View
          style={{
            marginTop: 10,
            width: '90%',
            marginHorizontal: 20,
            marginVertical: 15,
            paddingVertical: 10,
            borderRadius: 10,
            elevation: 5,
            backgroundColor: colors.col5,
          }}>
          <View
            style={{
              marginTop: 5,
              marginBottom: 10,
              paddingHorizontal: 10,
            }}>
            <Text
              style={{
                color: colors.col7,
                fontSize: 14,
                fontWeight: 'bold',
              }}>
              Order Summary
            </Text>
          </View>

          {/* Order Summary Body */}
          {orders.orderData.map(item => {
            return (
              <View>
                <View style={styles.rowOutContainer}>
                  {/*-------------------- Food Details --------------------*/}
                  <View style={styles.rowContainer}>
                    <View style={styles.left}>
                      <Text style={styles.qty}>{item.foodQty}x</Text>
                      <Text style={styles.title}>{item.data.foodName}</Text>
                      <Text style={styles.price}>
                        ₱ {parseFloat(item.data.price).toFixed(2)} /each
                      </Text>
                    </View>

                    <View style={styles.right}>
                      <Text style={styles.totalPrice}>
                        ₱{parseFloat(item.data.price * item.foodQty).toFixed(2)}
                      </Text>
                    </View>
                  </View>

                  {/*-------------------- Food Add Ons Details --------------------*/}
                  {item.addOnQty != 0 && (
                    <View style={styles.rowContainer}>
                      <View style={styles.left}>
                        <Text style={styles.qty}>{item.addOnQty}x</Text>
                        <Text style={styles.title}>{item.data.addOn}</Text>
                        <Text style={styles.price}>
                          ₱ {parseFloat(item.data.addOnPrice).toFixed(2)}
                          /each
                        </Text>
                      </View>

                      <View styles={styles.right}>
                        <Text style={styles.totalPrice}>
                          ₱
                          {parseFloat(
                            item.data.addOnPrice * item.addOnQty,
                          ).toFixed(2)}
                        </Text>
                      </View>
                    </View>
                  )}
                </View>
              </View>
            );
          })}

          {/* Sub Total */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 15,
              marginHorizontal: 10,
              justifyContent: 'space-between',
            }}>
            <View style={styles.left}>
              <Text>Subtotal:</Text>
            </View>
            <View style={styles.right}>
              <Text>₱&nbsp;{parseFloat(subtotalCost).toFixed(2)}</Text>
            </View>
          </View>

          {/* Shipping Fee */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 5,
              marginHorizontal: 10,
              justifyContent: 'space-between',
            }}>
            <View style={styles.left}>
              <Text>Shipping Fee:</Text>
            </View>
            <View style={styles.right}>
              <Text>₱&nbsp;{parseFloat(50).toFixed(2)}</Text>
            </View>
          </View>

          {/* Total Cost */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 5,
              marginHorizontal: 10,
              justifyContent: 'space-between',
            }}>
            <View style={styles.left}>
              <Text
                style={{fontWeight: 'bold', fontSize: 15, color: colors.col7}}>
                Total:
              </Text>
            </View>
            <View style={styles.right}>
              <Text
                style={{fontWeight: 'bold', fontSize: 15, color: colors.col7}}>
                ₱&nbsp;{parseFloat(orders.orderTotalCost).toFixed(2)}
              </Text>
            </View>
          </View>
        </View>

        {/*-------------------- Order Payment Method --------------------*/}
        <View
          style={{
            marginTop: 10,
            width: '90%',
            marginHorizontal: 20,
            marginVertical: 15,
            paddingVertical: 10,
            borderRadius: 10,
            elevation: 5,
            backgroundColor: colors.col5,
          }}>
          <View
            style={{
              marginTop: 5,
              marginBottom: 10,
              paddingHorizontal: 10,
            }}>
            <Text
              style={{
                color: colors.col7,
                fontSize: 14,
                fontWeight: 'bold',
              }}>
              Payment
            </Text>
          </View>

          {/* Payment Method */}
          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: 10,
            }}>
            <Icon name="money-bill" type="font-awesome-5" size={22} />
            <Text style={{alignSelf: 'center', marginLeft: 5}}>
              {orders.orderPayment}
            </Text>
            {orders.changeFor != 0 && (
              <Text style={{alignSelf: 'center'}}>
                &nbsp;
                {'('}
                Change for&nbsp;₱
                {parseFloat(orders.changeFor).toFixed(2)}
                {')'}
              </Text>
            )}
          </View>
        </View>

        {/*-------------------- Message --------------------*/}
        {orders.orderStatus === 'Delivered' ? (
          <Text style={styles.deliveredMsg}>
            Thank you for ordering with us
          </Text>
        ) : null}

        {orders.orderStatus === 'Cancelled' ? (
          <Text style={styles.cancelledMsg}>Sorry for the inconvenience</Text>
        ) : null}
      </ScrollView>
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

  //-------------------- Activity Details Screen Body --------------------//

  // Order Summary //
  rowOutContainer: {
    flexDirection: 'column',
    marginHorizontal: 10,
    borderRadius: 10,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    justifyContent: 'space-between',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  qty: {
    fontSize: 13,
    color: colors.text1,
    marginRight: 10,
  },
  title: {
    fontSize: 13,
    color: colors.text1,
    marginRight: 10,
  },
  price: {
    fontSize: 13,
    color: colors.text1,
    marginRight: 10,
  },
  totalPrice: {
    fontSize: 13,
    // color: colors.text1,
    marginRight: 10,
  },
  cancelledMsg: {
    fontSize: 15,
    fontWeight: 'bold',
    alignSelf: 'center',
    width: '90%',
    color: colors.col7,
    textAlign: 'center',
    marginVertical: 10,
    borderColor: 'red',
    backgroundColor: colors.col5,
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
  },
  deliveredMsg: {
    fontSize: 15,
    fontWeight: 'bold',
    alignSelf: 'center',
    width: '90%',
    color: colors.col7,
    textAlign: 'center',
    marginVertical: 10,
    borderColor: 'green',
    backgroundColor: colors.col5,
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
  },
});
