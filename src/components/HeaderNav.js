import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Icon} from '@rneui/base';
import {
  colors,
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveScreenFontSize,
} from '../globals/style';

const HeaderNav = ({navigation, data}) => {
  // console.log(JSON.parse(data)?.bag.length);
  return (
    <View>
      <View style={styles.headerContainer}>
        <Image
          source={require('../../assets/images/roseGLogoName.png')}
          style={styles.roseGLogo}
        />
        {/* <Text style={styles.heading1}>Rose G</Text> */}
        <TouchableOpacity onPress={() => navigation.navigate('Bag')}>
          <Icon
            name="shopping-bag"
            type="feather"
            color={colors.col4}
            style={styles.bagIcon}
            size={30}
          />

          <View
            style={{
              position: 'absolute',
              right: 17,
              height: 20,
              width: 20,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 30,
              backgroundColor: colors.col4,
            }}>
            {JSON.parse(data) == 0 || data == null ? (
              <Text style={{color: colors.col6, fontSize: 11}}>0</Text>
            ) : (
              <Text style={{color: colors.col6, fontSize: 11}}>
                {JSON.parse(data)?.bag.length}
              </Text>
            )}
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HeaderNav;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    width: responsiveScreenWidth(100),
    // height: 50,
    height: responsiveScreenHeight(8),
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.col1,
    elevation: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  roseGLogo: {
    width: responsiveScreenWidth(40),
    // height: 45,
    height: responsiveScreenHeight(6),
    resizeMode: 'contain',
  },
  heading1: {
    color: colors.col7,
    // fontSize: 20,
    fontSize: responsiveScreenFontSize(1.5),
    fontWeight: 'bold',
    marginLeft: 20,
  },
  bagIcon: {
    marginRight: 20,
    borderRadius: 10,
    padding: 5,
  },
});
