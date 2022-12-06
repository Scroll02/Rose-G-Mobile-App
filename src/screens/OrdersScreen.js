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

const OrdersScreen = () => {
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

  const convertDate = date => {
    const newDate = new Date(date && date.toDate && date.toDate().getTime());
    return newDate.toDateString();
  };

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
      <ScrollView>
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
            {orders.map((order, index) => {
              return (
                <View key={index} style={styles.orderContainer}>
                  {/*-------------------- Order Id, Order Date, Order Status --------------------*/}
                  <Text style={styles.orderIndex}>{index + 1}</Text>
                  <Text style={styles.orderTxt2}>
                    Order ID: {order.orderId}
                  </Text>
                  <Text style={styles.orderTxt2}>
                    Order Date: {convertDate(order.orderDate)}
                  </Text>
                  {order.orderStatus == 'Pending' && (
                    <Text style={styles.orderPending}>
                      Your order is pending{' '}
                    </Text>
                  )}
                  {order.orderStatus == 'Confirmed' && (
                    <Text style={styles.orderConfirmed}>
                      Your order is confirmed{' '}
                    </Text>
                  )}
                  {order.orderStatus == 'Prepared' && (
                    <Text style={styles.orderPrepared}>
                      Your order is being prepared{' '}
                    </Text>
                  )}
                  {order.orderStatus == 'Delivery' && (
                    <Text style={styles.orderDelivery}>
                      Delivery on its way{' '}
                    </Text>
                  )}
                  {order.orderStatus == 'Delivered' && (
                    <Text style={styles.orderDelivered}>
                      Your order is delivered{' '}
                    </Text>
                  )}
                  {order.orderStatus == 'Cancelled' && (
                    <Text style={styles.orderCancelled}>
                      Your order is cancelled{' '}
                    </Text>
                  )}

                  {/*-------------------- Delivery Rider Details --------------------*/}
                  <View style={styles.row1}>
                    <Text style={styles.orderTxt1}>
                      Delivery Rider Name & Contact:
                    </Text>
                    {order.deliveryRiderName ? (
                      <Text style={{marginBottom: 15, ...styles.orderTxt2}}>
                        {order.deliveryRiderName} : {order.deliveryRiderContact}
                      </Text>
                    ) : (
                      <Text style={{marginBottom: 15, ...styles.orderTxt2}}>
                        Not Assigned
                      </Text>
                    )}
                    {order.deliveryRiderContact ? (
                      <Text style={{marginBottom: 15, ...styles.orderTxt2}}>
                        {order.deliveryRiderContact}
                      </Text>
                    ) : null}
                  </View>

                  {/*-------------------- Order Summary --------------------*/}
                  {order.orderData.map(item => {
                    return (
                      <View style={styles.rowOutContainer}>
                        {/*-------------------- Food Details --------------------*/}
                        <View style={styles.rowContainer}>
                          <View style={styles.left}>
                            <Text style={styles.qty}>{item.foodQty}x</Text>
                            <Text style={styles.title}>
                              {item.data.foodName}
                            </Text>
                            <Text style={styles.price}>
                              ₱ {item.data.price}/each
                            </Text>
                          </View>

                          <View style={styles.right}>
                            <Text style={styles.totalPrice}>
                              ₱ {parseInt(item.data.price * item.foodQty)}
                            </Text>
                          </View>
                        </View>

                        {/*-------------------- Food Add Ons Details --------------------*/}
                        {item.addOnQty != 0 && (
                          <View style={styles.rowContainer}>
                            <View style={styles.left}>
                              <Text style={styles.qty}>{item.addOnQty}x</Text>
                              <Text style={styles.title}>
                                {item.data.addOn}
                              </Text>
                              <Text style={styles.price}>
                                ₱ {item.data.addOnPrice}/each
                              </Text>
                            </View>

                            <View styles={styles.right}>
                              <Text style={styles.totalPrice}>
                                ₱
                                {parseInt(item.data.addOnPrice * item.addOnQty)}
                              </Text>
                            </View>
                          </View>
                        )}
                      </View>
                    );
                  })}

                  <Text style={styles.grandTotalCost}>
                    Total: ₱{order.orderTotalCost}
                  </Text>
                  {order.orderStatus === 'Delivered' ? (
                    <Text style={styles.orderTxt3}>
                      Thank you for ordering with us
                    </Text>
                  ) : null}
                  {order.orderStatus === 'Cancelled' ? (
                    <Text style={styles.orderTxt3}>
                      Sorry for the inconvenience
                    </Text>
                  ) : null}
                  {order.orderStatus != 'Cancelled' &&
                  order.orderStatus != 'Delivered' ? (
                    <TouchableOpacity
                      style={styles.cancelBtn}
                      onPress={() => cancelOrder(order)}>
                      <Text style={styles.cancelBtnTxt}>Cancel Order</Text>
                    </TouchableOpacity>
                  ) : null}
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
    fontWeight: 'bold',
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
    fontSize: 15,
    backgroundColor: 'yellow',
    color: 'grey',
    textAlign: 'center',
    borderRadius: 10,
    padding: 5,
    marginVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'center',
  },
  orderConfirmed: {
    fontSize: 15,
    backgroundColor: 'orange',
    color: 'white',
    textAlign: 'center',
    borderRadius: 10,
    padding: 5,
    marginVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'center',
  },
  orderPrepared: {
    fontSize: 15,
    backgroundColor: 'orange',
    color: 'white',
    textAlign: 'center',
    borderRadius: 10,
    padding: 5,
    marginVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'center',
  },
  orderDelivery: {
    fontSize: 15,
    backgroundColor: 'green',
    color: 'white',
    textAlign: 'center',
    borderRadius: 10,
    padding: 5,
    marginVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'center',
  },
  orderDelivered: {
    fontSize: 15,
    backgroundColor: 'green',
    color: 'white',
    textAlign: 'center',
    borderRadius: 10,
    padding: 5,
    marginVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'center',
  },
  orderCancelled: {
    fontSize: 15,
    backgroundColor: 'red',
    color: 'white',
    textAlign: 'center',
    borderRadius: 10,
    padding: 5,
    marginVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'center',
  },

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
  grandTotalCost: {
    fontSize: 15,
    color: colors.col7,
    textAlign: 'right',
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
