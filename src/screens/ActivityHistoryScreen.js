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
            onPress={() => navigation.navigate('UserProfile')}
          />
        </View>

        <Text style={styles.heading1}>Activity History</Text>
      </View>

      {/*-------------------- Activity History Screen Body --------------------*/}
      {/* {orders.orderStatus === 'Delivered' && (
        <View>
          <Text>{orders.orderId}</Text>
        </View>
      )} */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {orders.length == 0 ||
        orders.orderStatus == 'Pending' ||
        orders.orderStatus == 'Prepared' ||
        orders.orderStatus == 'Confirmed' ||
        orders.orderStatus == 'Delivery' ? (
          <View>
            <Text>No activity history yet.</Text>
          </View>
        ) : (
          <View>
            {orders.map((order, index) => {
              return (
                <View>
                  {order.orderStatus == 'Delivered' && (
                    <View style={styles.activityContainer}>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.replace('ActivityHistoryDetails')
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
                            Order Date:&nbsp;{convertDate(order.orderDate)}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  )}
                  {/* {order.orderStatus == 'Cancelled' && (
                    <View>
                      <Text>{order.orderStatus}</Text>
                    </View>
                  )} */}
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
