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

const UserProfileScreen = ({navigation}) => {
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

  const logoutUser = async () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
        alert('You are logged out');
        navigation.replace('LoginScreen');
      })
      .catch(error => {
        // An error happened.
        alert('Server Issue');
      });
  };
  return (
    <View style={styles.mainContainer}>
      <Text>UserProfileScreen</Text>
      <Text>Full Name: {userData?.fullName}</Text>
      <Text>Email: {userData?.email}</Text>
      <TouchableOpacity
        style={button1.btn1}
        onPress={() => {
          logoutUser();
        }}>
        <Text style={button1.btn1Txt}>Sign Out</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={button1.btn1}
        onPress={() => {
          navigation.navigate('MapView');
        }}>
        <Text style={button1.btn1Txt}>Map View</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UserProfileScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.col6,
  },
});
