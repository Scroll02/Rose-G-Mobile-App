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
import {CheckBox} from '@rneui/base';
import RadioButtonRN from 'radio-buttons-react-native';
import React, {useState, useEffect} from 'react';
import {Icon} from '@rneui/base';
import {colors} from '../globals/style';
import {useColorScheme} from 'react-native';

const CheckOutScreen = ({navigation}) => {
  //-------------------- Checkbox Selection --------------------//
  const [isSelected, setSelection] = useState(false);
  const [radioBtn, setSelectedRadioBtn] = useState('');
  const [changeFor, setChangeFor] = useState('');

  const data = [
    {
      label: 'Cash On Delivery',
    },
    {
      label: 'Cash On Pickup',
    },
    {
      label: 'G-Cash',
    },
  ];

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
            <Text style={{fontWeight: 'bold', color: colors.col7}}>
              Recipient Details
            </Text>
            <Text>Name: </Text>
            <Text>Contact No.: </Text>
            <Text>Delivery Address: </Text>
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
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text>Food Quantity</Text>
              <Text>Food Name</Text>
              <Text>Food Price</Text>
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
              <RadioButtonRN
                data={data}
                boxActiveBgColor="#03a9f4"
                selectedBtn={e => console.log(e)}
                boxStyle={{
                  borderRadius: 10,
                  borderColor: colors.col2,
                  backgroundColor: colors.col5,
                  width: '90%',
                  height: 50,
                }}
                icon={
                  <Icon name="check-circle" size={25} color={colors.col2} />
                }
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
            ₱ 123.00
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
});
