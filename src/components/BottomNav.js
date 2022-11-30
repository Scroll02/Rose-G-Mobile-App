import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {Icon} from '@rneui/base';
import {colors} from '../globals/style';

import HomeScreen from '../screens/HomeScreen';
import MenuScreen from '../screens/MenuScreen';
import FoodDetailsScreen from '../screens/FoodDetailsScreen';
import BagScreen from '../screens/BagScreen';
import CheckOutScreen from '../screens/CheckOutScreen';
import OrderTrackerScreen from '../screens/OrderTrackerScreen';
import UserProfileScreen from '../screens/UserProfileScreen';
import MapViewScreen from './MapViewScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Bag" component={BagScreen} />
      <Stack.Screen name="CheckOut" component={CheckOutScreen} />
    </Stack.Navigator>
  );
};

const MenuStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Menu" component={MenuScreen} />
      <Stack.Screen name="FoodDetails" component={FoodDetailsScreen} />
    </Stack.Navigator>
  );
};

const OrdersStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Orders" component={OrderTrackerScreen} />
    </Stack.Navigator>
  );
};

const ProfileStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="UserProfile" component={UserProfileScreen} />
      <Stack.Screen name="MapView" component={MapViewScreen} />
    </Stack.Navigator>
  );
};

const BottomNav = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarInactiveTintColor: colors.col7,
        tabBarActiveTintColor: colors.col4,
        tabBarStyle: {
          height: 60,
          backgroundColor: colors.col1,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          borderLeftWidth: 1,
          borderRightWidth: 1,
          borderColor: colors.col1,
        },
      }}>
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={({route}) => ({
          tabBarStyle: {
            display: getTabBarVisibility(route),
            backgroundColor: colors.col1,
            height: 60,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            borderLeftWidth: 1,
            borderRightWidth: 1,
            borderColor: colors.col1,
            elevation: 0,
          },
          tabBarIcon: ({focused, color}) => (
            <View>
              <Icon
                name="home-outline"
                type="ionicon"
                color={color}
                style={{paddingTop: 5}}
              />
              <Text
                style={{
                  color: focused ? colors.col4 : colors.col7,
                  fontWeight: '500',
                }}>
                Home
              </Text>
            </View>
          ),
        })}
      />
      <Tab.Screen
        name="MenuTab"
        component={MenuStack}
        options={({route}) => ({
          tabBarStyle: {
            display: getTabBarVisibility(route),
            backgroundColor: colors.col1,
            height: 60,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            borderLeftWidth: 1,
            borderRightWidth: 1,
            borderColor: colors.col1,
            elevation: 0,
          },
          tabBarIcon: ({focused, color}) => (
            <View>
              <Icon
                name="restaurant-outline"
                type="ionicon"
                color={color}
                style={{paddingTop: 5}}
              />
              <Text
                style={{
                  color: focused ? colors.col4 : colors.col7,
                  fontWeight: '500',
                }}>
                Menu
              </Text>
            </View>
          ),
        })}
      />
      <Tab.Screen
        name="OrdersTab"
        component={OrdersStack}
        options={{
          tabBarBadge: 0,
          tabBarBadgeStyle: {backgroundColor: colors.col4},
          tabBarIcon: ({focused, color}) => (
            <View>
              <Icon
                name="shopping-bag"
                type="feather"
                color={color}
                style={{paddingTop: 5}}
              />
              <Text
                style={{
                  color: focused ? colors.col4 : colors.col7,
                  fontWeight: '500',
                }}>
                Orders
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileStack}
        options={{
          tabBarIcon: ({focused, color}) => (
            <View>
              <Icon
                name="profile"
                type="antdesign"
                color={color}
                style={{paddingTop: 5}}
              />
              <Text
                style={{
                  color: focused ? colors.col4 : colors.col7,
                  fontWeight: '500',
                }}>
                Profile
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const getTabBarVisibility = route => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Feed';
  //console.log(routeName);

  if (
    routeName?.includes('FoodDetails') ||
    routeName?.includes('Bag') ||
    routeName?.includes('CheckOut')
  ) {
    return 'none';
  }
  return 'flex';
};

export default BottomNav;

const styles = StyleSheet.create({});
