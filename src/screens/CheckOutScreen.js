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
import React, {useState, useEffect} from 'react';
import {Icon} from '@rneui/base';
import {colors} from '../globals/style';
import RadioGroup from 'react-native-radio-buttons-group';
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
  }, [bagData]);
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
  const [radioButtons, setRadioButtons] = useState([
    {
      id: '1',
      label: 'Cash On Delivery',
      value: 'Cash On Delviery',
      image: require('../../assets/images/check_circle.png'),
      borderColor: colors.col2,
      color: colors.col2,
      containerStyle: {...styles.radioButtonStyle},
    },
    {
      id: '2',
      label: 'Cash On Pickup',
      value: 'Cash On Pickup',
      borderColor: colors.col2,
      color: colors.col2,
      containerStyle: {...styles.radioButtonStyle},
    },
    {
      id: '3',
      label: 'G-Cash',
      value: 'G-Cash',
      borderColor: colors.col2,
      color: colors.col2,
      containerStyle: {...styles.radioButtonStyle},
    },
  ]);
  function onPressRadioButton(radioButtonsArray) {
    setRadioButtons(radioButtonsArray);
  }

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
      <ScrollView showsVerticalScrollIndicator={false}>
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

            <Text>Name: {userData?.fullName}</Text>
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
                      <Text>₱ {parseInt(item.data?.price * item.foodQty)}</Text>
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
                            ₱ {parseInt(item.data.addOnPrice * item.addOnQty)}
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
              <Text>Subtotal: ₱ {subtotalCost}</Text>
              <Text>Shipping Fee: ₱ 50</Text>
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
              <RadioGroup
                containerStyle={{
                  width: '100%',
                  alignItems: 'flex-start',
                  backgroundColor: colors.col5,
                }}
                radioButtons={radioButtons}
                onPress={onPressRadioButton}
              />
              <View
                style={{
                  flexDirection: 'row',
                  height: 35,
                  width: '50%',
                  borderWidth: 1,
                  borderColor: colors.col7,
                  marginVertical: 7,
                  marginHorizontal: 10,
                  borderRadius: 10,
                }}>
                <TextInput
                  placeholder="Change for"
                  value={changeFor}
                  placeholderTextColor={'#000'}
                  style={{fontSize: 12, marginLeft: 15}}
                  onChangeText={text => {
                    setChangeFor(text);
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

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
            ₱ {totalCost}
          </Text>
        </View>
        {/*-------------------- Place Order Button --------------------*/}
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity
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
  radioButtonStyle: {
    borderRadius: 10,
    borderColor: colors.col2,
    paddingLeft: 15,
    alignSelf: 'center',
    width: '90%',
    height: 50,
    borderWidth: 1,
  },
});
