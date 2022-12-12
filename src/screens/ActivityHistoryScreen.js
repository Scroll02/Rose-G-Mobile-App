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

const ActivityHistoryScreen = ({navigation}) => {
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

  // console.log(orders.orderId);

  return (
    <View style={styles.mainContainer}>
      {/*-------------------- Header Navigation --------------------*/}
      <View style={styles.headerContainer}>
        <View style={styles.goBackIcon}>
          <Icon
            name="arrow-back"
            type="material"
            size={30}
            onPress={() => navigation.navigate('UserProfile')}
          />
        </View>

        <Text style={styles.heading1}>Activity History</Text>
      </View>

      {/*-------------------- Activity History Screen Body --------------------*/}
      <ScrollView showsVerticalScrollIndicator={false}>
        {orders.length == 0 ||
        orders.orderStatus == 'Pending' ||
        orders.orderStatus == 'Prepared' ||
        orders.orderStatus == 'Confirmed' ||
        orders.orderStatus == 'Delivery' ? (
          /* Activity History is empty */
          <View style={{flex: 1, alignItems: 'center'}}>
            <View style={{marginVertical: 50}}>
              <Image
                source={require('../../assets/images/no-history.png')}
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
              Nothing's happened yet.
            </Text>
            <Text style={{fontWeight: 'bold', fontSize: 15, margin: 10}}>
              When an activity is over, it'll appear here.
            </Text>
          </View>
        ) : (
          /* Activity History is not empty */
          <View>
            {orders.map((order, index) => {
              return (
                <View>
                  {order.orderStatus == 'Delivered' && (
                    <View style={styles.activityContainer}>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.replace('ActivityHistoryDetails', {
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
                        <View style={styles.rowContainer}>
                          <View style={styles.left}>
                            <View style={styles.imgContainer}>
                              <Image
                                style={styles.foodLogo}
                                source={require('../../assets/images/healthy-eating.png')}
                              />
                            </View>
                            <Text style={styles.txt1}>{order.orderId}</Text>
                          </View>

                          <View style={styles.right}>
                            <Text style={styles.txt2}>
                              ₱&nbsp;
                              {parseFloat(order.orderTotalCost).toFixed(2)}
                            </Text>
                          </View>
                        </View>

                        <View style={{alignItems: 'center'}}>
                          <Text>
                            Order Status:&nbsp;
                            <Text style={{color: 'green'}}>
                              {order.orderStatus}
                            </Text>
                          </Text>
                          <Text>
                            Order Date:&nbsp;
                            {moment(order.orderDate.toDate()).format(
                              'MMM D, YYYY h:mm A',
                            )}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  )}
                  {order.orderStatus == 'Cancelled' && (
                    <View style={styles.activityContainer}>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.replace('ActivityHistoryDetails', {
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
                        <View style={styles.rowContainer}>
                          <View style={styles.left}>
                            <View style={styles.imgContainer}>
                              <Image
                                style={styles.foodLogo}
                                source={require('../../assets/images/healthy-eating.png')}
                              />
                            </View>
                            <Text style={styles.txt1}>{order.orderId}</Text>
                          </View>

                          <View style={styles.right}>
                            <Text style={styles.txt2}>
                              ₱&nbsp;
                              {parseFloat(order.orderTotalCost).toFixed(2)}
                            </Text>
                          </View>
                        </View>

                        <View style={{alignItems: 'center'}}>
                          <Text>
                            Order Status:&nbsp;
                            <Text style={{color: 'red'}}>
                              {order.orderStatus}
                            </Text>
                          </Text>
                          <Text>
                            Order Date:&nbsp;
                            {moment(order.orderDate.toDate()).format(
                              'MMM D, YYYY h:mm A',
                            )}
                          </Text>
                        </View>
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

export default ActivityHistoryScreen;

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

  //-------------------- Activity History Screen Body --------------------//
  activityContainer: {
    backgroundColor: colors.col5,
    width: '90%',
    height: 130,
    marginHorizontal: 20,
    margin: 10,
    borderRadius: 10,
    padding: 20,
    elevation: 5,
    borderColor: colors.col7,
    marginTop: 20,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imgContainer: {
    width: 50,
    height: 50,
    marginHorizontal: 10,
  },
  foodLogo: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  txt1: {
    fontWeight: '400',
    color: colors.col7,
    fontSize: 17,
  },
  txt2: {
    fontWeight: 'bold',
    color: colors.col7,
    fontSize: 17,
  },
});
