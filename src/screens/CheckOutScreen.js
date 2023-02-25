import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {ScrollView} from 'react-native-virtualized-view';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import React, {useState, useEffect} from 'react';
import {Icon} from '@rneui/base';
import {colors} from '../globals/style';
import {RadioButton} from 'react-native-paper';
import {firebase} from '../Firebase/FirebaseConfig';

const CheckOutScreen = ({navigation, route}) => {
  /*-------------------- Retrieving User Profile Data --------------------*/
  const [userLoggedUid, setUserLoggedUid] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const checklogin = () => {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          //console.log(user);
          setUserLoggedUid(user.uid);
        } else {
          setUserLoggedUid(null);
        }
      });
    };
    checklogin();
  }, []);

  const getUserData = async () => {
    const docRef = firebase
      .firestore()
      .collection('UserData')
      .where('uid', '==', userLoggedUid);
    const doc = await docRef.get();
    if (!doc.empty) {
      doc.forEach(doc => {
        setUserData(doc.data());
      });
    } else {
      //navigation.navigate("Login");
      console.log('No such document!');
    }
  };
  useEffect(() => {
    getUserData();
  }, [userLoggedUid]);

  /*-------------------- Retrieving Bag Data --------------------*/
  const {bagData} = route.params;
  // console.log(bagData);

  const [orderData, setOrderData] = useState([]);
  useEffect(() => {
    setOrderData(JSON.parse(bagData));
  }, []);
  // console.log(orderData);

  /*-------------------- Computing the Sub Total Cost & Total Cost --------------------*/
  const [subtotalCost, setSubTotalCost] = useState('0');
  const [totalCost, setTotalCost] = useState('0');

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

  /*-------------------- Payment Method (Radio Button) --------------------*/
  const [changeFor, setChangeFor] = useState('');
  const [checked, setChecked] = useState('Cash On Delivery');

  /*-------------------- Place Order Function --------------------*/
  const placeOrder = () => {
    const docRef = firebase
      .firestore()
      .collection('UserOrders')
      .doc(new Date().getTime().toString());

    docRef
      .set({
        orderId: docRef.id,
        orderData: orderData.bag,
        orderStatus: 'Pending',
        orderTotalCost: totalCost,
        orderDate: firebase.firestore.FieldValue.serverTimestamp(),
        orderAddress: userData.address,
        orderContactNumber: userData.contactNumber,
        orderFirstName: userData.firstName,
        orderLastName: userData.lastName,
        orderUserUid: userLoggedUid,
        orderPayment: checked,
        changeFor: changeFor,
      })
      .then(() => {
        alert('Order placed');
        navigation.replace('Home');
      });

    // Delete the document to reset the bag
    const docRef2 = firebase
      .firestore()
      .collection('UserBag')
      .doc(firebase.auth().currentUser.uid)
      .delete();
  };

  /*-------------------- Error Message --------------------*/
  const [customError, setcustomError] = useState('');

  return (
    <View style={styles.mainContainer}>
      {/*-------------------- Header Navigation --------------------*/}
      <View style={styles.headerContainer}>
        <View style={styles.goBackIcon}>
          <Icon
            name="arrow-back"
            type="material"
            size={30}
            onPress={() => navigation.navigate('Bag', {bagData})}
          />
        </View>

        <Text style={styles.heading1}>Checkout</Text>
      </View>

      {/*-------------------- Check Out Screen Body --------------------*/}
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            marginVertical: 10,
          }}>
          {/*-------------------- Receipt Details --------------------*/}
          <View
            style={{
              backgroundColor: colors.col5,
              width: '90%',
              marginTop: 20,
              borderRadius: 10,
              padding: 10,
            }}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={{fontWeight: 'bold', color: colors.col7}}>
                Recipient Details
              </Text>
              <TouchableOpacity
                style={{
                  backgroundColor: colors.col2,
                  width: 50,
                  borderRadius: 10,
                  alignItems: 'center',
                }}
                onPress={() => {
                  navigation.replace('EditRecipientDetails', {bagData});
                }}>
                <Text style={{fontWeight: 'bold', color: colors.col7}}>
                  Edit
                </Text>
              </TouchableOpacity>
            </View>

            <Text>
              Name:&nbsp;{userData?.firstName}&nbsp;{userData?.lastName}
            </Text>
            <Text>Contact No.: {userData?.contactNumber}</Text>
            <Text>Delivery Address: {userData?.address}</Text>
          </View>

          {/*-------------------- Order Summary --------------------*/}
          <View
            style={{
              backgroundColor: colors.col5,
              width: '90%',
              marginTop: 20,
              borderRadius: 10,
              padding: 10,
            }}>
            <Text style={{fontWeight: 'bold', color: colors.col7}}>
              Order Summary
            </Text>

            <FlatList
              data={orderData.bag}
              renderItem={({item}) => {
                return (
                  <View>
                    {/*-------------------- Food Details Row --------------------*/}
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text>{item.foodQty}x</Text>
                      <Text>{item.data?.foodName}</Text>
                      <Text>
                        ₱{' '}
                        {parseFloat(item.data?.price * item.foodQty).toFixed(2)}
                      </Text>
                    </View>

                    {/*-------------------- Add Ons Details Row --------------------*/}
                    {item.addOnQty != 0 && (
                      <View>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}>
                          <Text>{item.addOnQty}x</Text>
                          <Text>{item.data.addOn}</Text>
                          <Text>
                            ₱{' '}
                            {parseFloat(
                              item.data.addOnPrice * item.addOnQty,
                            ).toFixed(2)}
                          </Text>
                        </View>
                      </View>
                    )}
                  </View>
                );
              }}
            />

            {/*-------------------- Sub Total & Shipping Fee --------------------*/}
            <View style={{marginVertical: 10}}>
              <Text>Subtotal: ₱ {parseFloat(subtotalCost).toFixed(2)}</Text>
              <Text>Shipping Fee: ₱ 50.00</Text>
            </View>
          </View>

          {/*-------------------- Choose Payment Method --------------------*/}
          <View
            style={{
              backgroundColor: colors.col5,
              width: '90%',
              marginTop: 20,
              borderRadius: 10,
              padding: 10,
            }}>
            <Text style={{fontWeight: 'bold', color: colors.col7}}>
              Choose Payment Method
            </Text>

            {/*-------------------- Payment Methods --------------------*/}
            <View style={{alignItems: 'center'}}>
              <View style={styles.radioBtnContainer}>
                <RadioButton
                  value="Cash On Delivery"
                  color={colors.col2}
                  status={
                    checked === 'Cash On Delivery' ? 'checked' : 'unchecked'
                  } //if the value of checked is Apple, then select this button
                  onPress={() => setChecked('Cash On Delivery')} //when pressed, set the value of the checked Hook to 'Apple'
                />
                <Text>Cash On Delivery</Text>
              </View>

              <View style={styles.radioBtnContainer}>
                <RadioButton
                  value="Cash On Pickup"
                  color={colors.col2}
                  status={
                    checked === 'Cash On Pickup' ? 'checked' : 'unchecked'
                  }
                  onPress={() => setChecked('Cash On Pickup')}
                />
                <Text>Cash On Pickup</Text>
              </View>

              <View style={styles.radioBtnContainer}>
                <RadioButton
                  value="GCash"
                  color={colors.col2}
                  status={checked === 'GCash' ? 'checked' : 'unchecked'}
                  onPress={() => setChecked('GCash')}
                />
                <Text>GCash</Text>
              </View>

              <View style={{marginVertical: 5}}>
                <Text>You selected "{checked}"</Text>
              </View>

              {/* Change for if COD */}
              {checked === 'Cash On Delivery' && (
                <View style={{width: '90%', alignItems: 'center'}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      height: 35,
                      width: '50%',
                      borderWidth: 1,
                      borderColor: colors.col7,
                      marginVertical: 7,
                      marginHorizontal: 10,
                      paddingLeft: 10,
                      borderRadius: 10,
                    }}>
                    <TextInput
                      placeholder="Change for"
                      value={changeFor}
                      placeholderTextColor={'#000'}
                      style={{fontSize: 12}}
                      onChangeText={text => {
                        setChangeFor(text);
                      }}
                    />
                  </View>

                  {changeFor >= totalCost || changeFor == totalCost ? (
                    <View></View>
                  ) : (
                    <View>
                      <Text style={{color: 'red', fontSize: 12}}>
                        Invalid Amount
                      </Text>
                    </View>
                  )}
                </View>
              )}
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>

      {/*-------------------- Footer --------------------*/}
      <View
        style={{
          backgroundColor: colors.col1,
          height: 100,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}>
        {/*-------------------- Total Text Row--------------------*/}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: 10,
            marginHorizontal: 20,
          }}>
          <Text style={{fontWeight: 'bold', fontSize: 18, color: colors.col7}}>
            Total:
          </Text>
          <Text style={{fontWeight: 'bold', fontSize: 18, color: colors.col7}}>
            ₱ {parseFloat(totalCost).toFixed(2)}
          </Text>
        </View>
        {/*-------------------- Place Order Button --------------------*/}
        {userData?.contactNumber == '' ||
        userData?.address == '' ||
        userData?.firstName == '' ||
        userData?.lastName == '' ||
        userData?.contactNumber == undefined ||
        userData?.address == undefined ||
        userData?.firstName == undefined ||
        userData?.lastName == undefined ? (
          /*-------------------- Disabled Place Order Button --------------------*/
          <View style={{alignItems: 'center'}}>
            <TouchableOpacity
              disabled={true}
              onPress={placeOrder}
              style={{
                width: '90%',
                color: '#000',
                height: 40,
                marginTop: 5,
                backgroundColor: '#bcc998',
                borderRadius: 10,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontWeight: 'bold',
                fontSize: 18,
                opacity: 0.6,
              }}>
              <Text style={{fontSize: 18, fontWeight: 'bold', color: '#000'}}>
                Place Order
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          /*-------------------- Enabled Place Order Button --------------------*/
          <View style={{alignItems: 'center'}}>
            <TouchableOpacity
              onPress={placeOrder}
              style={{
                width: '90%',
                color: '#000',
                height: 40,
                marginTop: 5,
                backgroundColor: '#bcc998',
                borderRadius: 10,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontWeight: 'bold',
                fontSize: 18,
              }}>
              <Text style={{fontSize: 18, fontWeight: 'bold', color: '#000'}}>
                Place Order
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

export default CheckOutScreen;

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

  //-------------------- CheckOut Screen Body --------------------//

  //-------------------- Choose Payment Method --------------------//
  radioBtnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    borderWidth: 2,
    borderColor: colors.col2,
    borderRadius: 10,
    marginVertical: 5,
    paddingLeft: 10,
  },
});
