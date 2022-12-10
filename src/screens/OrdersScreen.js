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
import {firebase} from '../Firebase/FirebaseConfig';

const OrdersScreen = ({navigation}) => {
  // -------------------- Retrieve Users Orders Data -------------------- //
  const [orders, setOrders] = useState([]);
  const getOrders = async () => {
    const ordersRef = firebase
      .firestore()
      .collection('UserOrders')
      .where('orderUserUid', '==', firebase.auth().currentUser.uid);
    ordersRef.onSnapshot(snapshot => {
      setOrders(snapshot.docs.map(doc => doc.data()));
    });
  };
  useEffect(() => {
    getOrders();
  }, []);

  // -------------------- Convert the Timestamp to Date -------------------- //
  const convertDate = date => {
    const newDate = new Date(date && date.toDate && date.toDate().getTime());
    return newDate.toDateString();
  };

  // -------------------- Cancel Order Function -------------------- //
  const cancelOrder = orderitem => {
    const orderRef = firebase
      .firestore()
      .collection('UserOrders')
      .doc(orderitem.orderId);
    orderRef.update({
      orderStatus: 'Cancelled',
    });
    getOrders();
  };

  return (
    <View style={styles.mainContainer}>
      {/*-------------------- Header Navigation --------------------*/}
      <View style={styles.headerContainer}>
        <Text style={styles.heading1}>Orders</Text>
      </View>

      {/*-------------------- Orders Screen Body --------------------*/}
      <ScrollView showsVerticalScrollIndicator={false}>
        {orders.length == 0 ? (
          /*-------------------- Orders is empty --------------------*/
          <View style={{flex: 1, alignItems: 'center'}}>
            <View style={{marginVertical: 50}}>
              <Image
                source={require('../../assets/images/order-now.png')}
                style={{width: 250, height: 250}}
              />
            </View>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 20,
                margin: 10,
                textAlign: 'center',
              }}>
              You haven't placed any orders yet.
            </Text>
            <Text style={{fontWeight: 'bold', fontSize: 15, margin: 10}}>
              When you do, their status will appear here.
            </Text>
          </View>
        ) : (
          /*-------------------- Orders is not empty --------------------*/
          <View>
            <View style={{paddingVertical: 10, paddingHorizontal: 20}}>
              <Text
                style={{color: colors.col7, fontWeight: 'bold', fontSize: 17}}>
                On Going Orders
              </Text>
            </View>
            {orders.map((order, index) => {
              return (
                <View>
                  {order.orderStatus == 'Pending' && (
                    <View key={index} style={styles.orderContainer}>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('OrderTracker', {
                            orderId: order.orderId,
                            orderDate: order.orderDate,
                            orderAddress: order.orderAddress,
                            orderStatus: order.orderStatus,
                            orderPayment: order.orderPayment,
                            changeFor: order.changeFor,
                            orderData: order.orderData,
                            orderTotalCost: order.orderTotalCost,
                          })
                        }>
                        {/*-------------------- Order Id, Order Date, Order Status --------------------*/}
                        {/* <Text style={styles.orderIndex}>{index + 1}</Text> */}
                        {order.orderStatus == 'Pending' && (
                          <Text style={styles.orderPending}>
                            Order Pending{' '}
                          </Text>
                        )}
                        {order.orderStatus == 'Confirmed' && (
                          <Text style={styles.orderConfirmed}>
                            Order Confirmed{' '}
                          </Text>
                        )}
                        {order.orderStatus == 'Prepared' && (
                          <Text style={styles.orderPrepared}>
                            Preparing Order{' '}
                          </Text>
                        )}
                        {order.orderStatus == 'Delivery' && (
                          <Text style={styles.orderDelivery}>
                            Delivery on its way{' '}
                          </Text>
                        )}
                        {order.orderStatus == 'Delivered' && (
                          <Text style={styles.orderDelivered}>
                            Order Delivered{' '}
                          </Text>
                        )}
                        {order.orderStatus == 'Cancelled' && (
                          <Text style={styles.orderCancelled}>
                            Order Cancelled{' '}
                          </Text>
                        )}
                        <Text style={styles.orderTxt2}>
                          Order ID: {order.orderId}
                        </Text>
                        <Text style={styles.orderTxt2}>
                          Order Date: {convertDate(order.orderDate)}
                        </Text>
                        <Text style={styles.grandTotalCost}>
                          Total:&nbsp;₱
                          {parseFloat(order.orderTotalCost).toFixed(2)}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
                  {order.orderStatus == 'Confirmed' && (
                    <View key={index} style={styles.orderContainer}>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('OrderTracker', {
                            orderId: order.orderId,
                            orderDate: order.orderDate,
                            orderAddress: order.orderAddress,
                            orderStatus: order.orderStatus,
                            orderPayment: order.orderPayment,
                            changeFor: order.changeFor,
                            orderData: order.orderData,
                            orderTotalCost: order.orderTotalCost,
                          })
                        }>
                        {/*-------------------- Order Id, Order Date, Order Status --------------------*/}
                        {/* <Text style={styles.orderIndex}>{index + 1}</Text> */}
                        {order.orderStatus == 'Pending' && (
                          <Text style={styles.orderPending}>
                            Order Pending{' '}
                          </Text>
                        )}
                        {order.orderStatus == 'Confirmed' && (
                          <Text style={styles.orderConfirmed}>
                            Order Confirmed{' '}
                          </Text>
                        )}
                        {order.orderStatus == 'Prepared' && (
                          <Text style={styles.orderPrepared}>
                            Preparing Order{' '}
                          </Text>
                        )}
                        {order.orderStatus == 'Delivery' && (
                          <Text style={styles.orderDelivery}>
                            Delivery on its way{' '}
                          </Text>
                        )}
                        {order.orderStatus == 'Delivered' && (
                          <Text style={styles.orderDelivered}>
                            Order Delivered{' '}
                          </Text>
                        )}
                        {order.orderStatus == 'Cancelled' && (
                          <Text style={styles.orderCancelled}>
                            Order Cancelled{' '}
                          </Text>
                        )}
                        <Text style={styles.orderTxt2}>
                          Order ID: {order.orderId}
                        </Text>
                        <Text style={styles.orderTxt2}>
                          Order Date: {convertDate(order.orderDate)}
                        </Text>
                        <Text style={styles.grandTotalCost}>
                          Total:&nbsp;₱
                          {parseFloat(order.orderTotalCost).toFixed(2)}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
                  {order.orderStatus == 'Prepared' && (
                    <View key={index} style={styles.orderContainer}>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('OrderTracker', {
                            orderId: order.orderId,
                            orderDate: order.orderDate,
                            orderAddress: order.orderAddress,
                            orderStatus: order.orderStatus,
                            orderPayment: order.orderPayment,
                            changeFor: order.changeFor,
                            orderData: order.orderData,
                            orderTotalCost: order.orderTotalCost,
                          })
                        }>
                        {/*-------------------- Order Id, Order Date, Order Status --------------------*/}
                        {/* <Text style={styles.orderIndex}>{index + 1}</Text> */}
                        {order.orderStatus == 'Pending' && (
                          <Text style={styles.orderPending}>
                            Order Pending{' '}
                          </Text>
                        )}
                        {order.orderStatus == 'Confirmed' && (
                          <Text style={styles.orderConfirmed}>
                            Order Confirmed{' '}
                          </Text>
                        )}
                        {order.orderStatus == 'Prepared' && (
                          <Text style={styles.orderPrepared}>
                            Preparing Order{' '}
                          </Text>
                        )}
                        {order.orderStatus == 'Delivery' && (
                          <Text style={styles.orderDelivery}>
                            Delivery on its way{' '}
                          </Text>
                        )}
                        {order.orderStatus == 'Delivered' && (
                          <Text style={styles.orderDelivered}>
                            Order Delivered{' '}
                          </Text>
                        )}
                        {order.orderStatus == 'Cancelled' && (
                          <Text style={styles.orderCancelled}>
                            Order Cancelled{' '}
                          </Text>
                        )}
                        <Text style={styles.orderTxt2}>
                          Order ID: {order.orderId}
                        </Text>
                        <Text style={styles.orderTxt2}>
                          Order Date: {convertDate(order.orderDate)}
                        </Text>
                        <Text style={styles.grandTotalCost}>
                          Total:&nbsp;₱
                          {parseFloat(order.orderTotalCost).toFixed(2)}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
                  {order.orderStatus == 'Delivery' && (
                    <View key={index} style={styles.orderContainer}>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('OrderTracker', {
                            orderId: order.orderId,
                            orderDate: order.orderDate,
                            orderAddress: order.orderAddress,
                            orderStatus: order.orderStatus,
                            orderPayment: order.orderPayment,
                            changeFor: order.changeFor,
                            orderData: order.orderData,
                            orderTotalCost: order.orderTotalCost,
                          })
                        }>
                        {/*-------------------- Order Id, Order Date, Order Status --------------------*/}
                        {/* <Text style={styles.orderIndex}>{index + 1}</Text> */}
                        {order.orderStatus == 'Pending' && (
                          <Text style={styles.orderPending}>
                            Order Pending{' '}
                          </Text>
                        )}
                        {order.orderStatus == 'Confirmed' && (
                          <Text style={styles.orderConfirmed}>
                            Order Confirmed{' '}
                          </Text>
                        )}
                        {order.orderStatus == 'Prepared' && (
                          <Text style={styles.orderPrepared}>
                            Preparing Order{' '}
                          </Text>
                        )}
                        {order.orderStatus == 'Delivery' && (
                          <Text style={styles.orderDelivery}>
                            Delivery on its way{' '}
                          </Text>
                        )}
                        {order.orderStatus == 'Delivered' && (
                          <Text style={styles.orderDelivered}>
                            Order Delivered{' '}
                          </Text>
                        )}
                        {order.orderStatus == 'Cancelled' && (
                          <Text style={styles.orderCancelled}>
                            Order Cancelled{' '}
                          </Text>
                        )}
                        <Text style={styles.orderTxt2}>
                          Order ID: {order.orderId}
                        </Text>
                        <Text style={styles.orderTxt2}>
                          Order Date: {convertDate(order.orderDate)}
                        </Text>
                        <Text style={styles.grandTotalCost}>
                          Total:&nbsp;₱
                          {parseFloat(order.orderTotalCost).toFixed(2)}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              );
            })}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default OrdersScreen;

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
  heading1: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    color: colors.col7,
  },

  //-------------------- Order Screen Body --------------------//
  orderContainer: {
    backgroundColor: colors.col5,
    width: '90%',
    marginHorizontal: 20,
    margin: 10,
    borderRadius: 10,
    padding: 10,
    elevation: 5,
    borderColor: colors.col7,
  },
  orderIndex: {
    fontSize: 15,
    color: colors.col7,
    backgroundColor: colors.col2,
    textAlign: 'center',
    borderRadius: 30,
    padding: 5,
    width: 30,
    position: 'absolute',
    top: 10,
    left: 10,
  },
  orderTxt1: {
    fontSize: 15,
    color: colors.text1,
    textAlign: 'center',
    marginVertical: 10,
  },
  orderTxt2: {
    fontSize: 15,
    color: colors.col7,
    textAlign: 'center',
    marginVertical: 5,
    fontWeight: '400',
  },
  orderTxt3: {
    fontSize: 15,
    color: colors.col7,
    textAlign: 'center',
    marginVertical: 5,
    borderColor: colors.col7,
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
  },
  // Order Status //
  orderPending: {
    fontSize: 18,
    fontWeight: 'bold',
    // backgroundColor: 'black',
    color: colors.col4,
    textAlign: 'center',
    borderRadius: 10,
    // padding: 5,
    // marginVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'center',
  },
  orderConfirmed: {
    fontSize: 18,
    // backgroundColor: 'orange',
    color: 'orange',
    fontWeight: 'bold',
    textAlign: 'center',
    borderRadius: 10,
    // padding: 5,
    // marginVertical: 5,
    paddingHorizontal: 20,
    alignSelf: 'center',
  },
  orderPrepared: {
    fontSize: 18,
    // backgroundColor: 'orange',
    color: 'orange',
    fontWeight: 'bold',
    textAlign: 'center',
    borderRadius: 10,
    // padding: 5,
    // marginVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'center',
  },
  orderDelivery: {
    fontSize: 18,
    // backgroundColor: 'green',
    color: 'green',
    fontWeight: 'bold',
    textAlign: 'center',
    borderRadius: 10,
    // padding: 5,
    // marginVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'center',
  },
  orderDelivered: {
    fontSize: 18,
    // backgroundColor: 'green',
    fontWeight: 'bold',
    color: 'green',
    textAlign: 'center',
    borderRadius: 10,
    // padding: 5,
    // marginVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'center',
  },
  orderCancelled: {
    fontSize: 18,
    fontWeight: 'bold',
    // backgroundColor: 'red',
    color: 'red',
    textAlign: 'center',
    borderRadius: 10,
    // padding: 5,
    // marginVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'center',
  },
  grandTotalCost: {
    fontSize: 15,
    fontWeight: 'bold',
    color: colors.col7,
    textAlign: 'center',
    marginVertical: 10,
    marginRight: 20,
  },
  cancelBtn: {
    backgroundColor: colors.col2,
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    alignSelf: 'center',
  },
  cancelBtnTxt: {
    fontSize: 15,
    color: colors.col7,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
