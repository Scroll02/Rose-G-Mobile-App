import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import Swiper from 'react-native-swiper';
import {colors} from '../globals/style';
const OfferSlider = () => {
  return (
    <View>
      <View style={styles.offerSliderContainer}>
        <Swiper
          autoplay={true}
          autoplayTimeout={6}
          showsButtons={true}
          dotColor={colors.col6}
          activeDotColor={colors.col1}
          nextButton={<Text style={styles.buttonText}>›</Text>}
          prevButton={<Text style={styles.buttonText}>‹</Text>}>
          <View style={styles.slide}>
            <Image
              source={require('../../assets/images/foodBanner1.png')}
              style={styles.image}
            />
          </View>
          <View style={styles.slide}>
            <Image
              source={require('../../assets/images/foodBanner2.png')}
              style={styles.image}
            />
          </View>
          <View style={styles.slide}>
            <Image
              source={require('../../assets/images/foodBanner3.png')}
              style={styles.image}
            />
          </View>
        </Swiper>
      </View>
    </View>
  );
};

export default OfferSlider;

const styles = StyleSheet.create({
  offerSliderContainer: {
    width: '100%',
    height: 200,
    backgroundColor: colors.col6,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  slide: {
    width: '100%',
    height: 200,
    backgroundColor: colors.col6,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
    resizeMode: 'contain',
  },
  buttonText: {
    color: colors.col7,
    fontSize: 40,
    fontWeight: '500',
    backgroundColor: colors.col2,
    borderRadius: 20,
    width: 40,
    height: 40,
    textAlign: 'center',
    lineHeight: 40,
  },
});
