import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {colors} from '../globals/style';
import {menuCategoryData} from '../globals/sampleData';

const CardSlider1 = ({cardTitle, viewTitle, navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.cardTitle}>{cardTitle}</Text>
        <Text
          style={styles.viewTitle}
          onPress={() => navigation.navigate('Menu')}>
          {viewTitle}
        </Text>
      </View>

      <FlatList
        style={styles.menuContainer}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={menuCategoryData}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('MenuTab', {title: item.title})
              }>
              <View style={styles.cardContainer}>
                <Image source={item.image} style={styles.cardImg} />
                <Text style={styles.menuTitle}>{item.title}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default CardSlider1;

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  cardTitle: {
    color: colors.col7,
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 20,
  },
  viewTitle: {
    color: colors.col4,
    fontSize: 15,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    marginHorizontal: 20,
    marginVertical: 5,
  },
  menuContainer: {
    width: '100%',
    //backgroundColor: 'red',
  },
  cardContainer: {
    width: 100,
    height: 110,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.col5,
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    alignItems: 'center',
    backgroundColor: colors.col5,
  },
  cardImg: {
    marginTop: 5,
    width: '70%',
    height: '70%',
    resizeMode: 'contain',
  },
  menuTitle: {
    color: colors.col7,
    marginTop: 5,
    fontWeight: '500',
  },
});
