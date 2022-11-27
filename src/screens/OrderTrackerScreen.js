import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {ScrollView} from 'react-native-virtualized-view';
import React, {useState} from 'react';
import {Icon} from '@rneui/base';
import {colors} from '../globals/style';
import {track_order_status} from '../globals/constant';
const OrderTracker = ({navigation}) => {
  const [currentStep, setCurrentStep] = useState(1);
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

        <Text style={styles.heading1}>Order Tracker</Text>
      </View>

      {/*-------------------- Header Title --------------------*/}

      {/*-------------------- Order Tracker --------------------*/}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            marginTop: 10,
            marginHorizontal: 10,
            paddingVertical: 10,
            borderRadius: 10,
            borderWidth: 2,
            borderColor: colors.col7,
            backgroundColor: colors.col5,
          }}>
          {/* Estimated Order Arrival Time */}
          <View
            style={{marginTop: 10, marginBottom: 10, paddingHorizontal: 10}}>
            <Text
              style={{
                color: colors.col7,
                fontSize: 14,
              }}>
              Estimated Order Arrival Time:
            </Text>
            <Text
              style={{
                color: colors.col7,
                fontSize: 14,
                fontWeight: 'bold',
              }}>
              5:50 PM - 6:00 PM
            </Text>
          </View>

          {/* Track Order */}
          <View
            style={{
              flexDirection: 'row',
              alignItem: 'center',
              justifyContent: 'space-between',
              marginBottom: 20,
              paddingHorizontal: 10,
            }}>
            <Text style={{fontWeight: 'bold', color: colors.col7}}>
              Tracker Order:
            </Text>
            <Text style={{}}>XYZ012345</Text>
          </View>

          {/* Status */}
          {track_order_status.map((item, index) => {
            return (
              <View key={`StatusList-${index}`}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: -5,
                    marginHorizontal: 60,
                  }}>
                  <Image
                    source={require('../../assets/images/check_circle.png')}
                    style={{
                      width: 40,
                      height: 40,
                      tintColor:
                        index <= currentStep ? colors.col2 : colors.col8,
                    }}
                  />
                  <View style={{marginLeft: 10}}>
                    <Text style={{fontWeight: 'bold', color: colors.col7}}>
                      {item.title}
                    </Text>
                    <Text>{item.sub_title}</Text>
                  </View>
                </View>

                {index < track_order_status.length - 1 && (
                  <View style={{marginHorizontal: 60}}>
                    {index < currentStep && (
                      <View
                        style={{
                          height: 40,
                          width: 3,
                          marginLeft: 18,
                          backgroundColor: colors.col2,
                          zIndex: -1,
                        }}></View>
                    )}
                    {index >= currentStep && (
                      <Image
                        source={require('../../assets/images/dotted_line.png')}
                        resizeMode="cover"
                        style={{
                          width: 4,
                          height: 40,
                          marginLeft: 17,
                          zIndex: -1,
                        }}
                      />
                    )}
                  </View>
                )}
              </View>
            );
          })}
        </View>
      </ScrollView>

      {/* -------------------- Footer Component -------------------- */}
      <View style={{marginTop: 10, marginBottom: 10, alignItems: 'center'}}>
        {currentStep < track_order_status.length - 1 && (
          <View
            style={{
              width: '70%',
            }}>
            {/* Cancel Order Button */}
            <TouchableOpacity
              style={{
                borderRadius: 10,
                backgroundColor: colors.col2,
                height: 45,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => navigation.navigate('Menu')}>
              <Text
                style={{fontWeight: 'bold', color: colors.col7, fontSize: 20}}>
                Cancel Order
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

export default OrderTracker;

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
