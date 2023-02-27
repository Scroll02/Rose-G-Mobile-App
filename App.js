import {StyleSheet, Text, View, StatusBar} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {colors} from './src/globals/style';
import LoginScreen from './src/screens/LoginScreen';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import TermsConditionScreen from './src/screens/TermsConditionScreen';
import BottomNav from './src/components/BottomNav';
import PrivacyPolicyScreen from './src/screens/PrivacyPolicyScreen';
import {firebase} from './src/Firebase/FirebaseConfig';
const App = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer initialRouteName="LoginScreen">
      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor={colors.col1}
        translucent={false}
      />
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        <Stack.Screen name="HomeScreen" component={BottomNav} />
        <Stack.Screen
          name="TermsConditionScreen"
          component={TermsConditionScreen}
        />
        <Stack.Screen
          name="PrivacyPolicyScreen"
          component={PrivacyPolicyScreen}
        />
        <Stack.Screen
          name="ForgotPasswordScreen"
          component={ForgotPasswordScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
