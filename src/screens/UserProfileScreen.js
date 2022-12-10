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

const UserProfileScreen = ({navigation, route}) => {
  /*-------------------- Retrieving User Data Function --------------------*/
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

  /*-------------------- Sign Out Function --------------------*/
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
      {/*-------------------- Header Navigation --------------------*/}
      <View style={styles.headerContainer}>
        <Text style={styles.heading1}>Profile</Text>
      </View>

      {/*-------------------- Profile Screen Body --------------------*/}
      <View>
        <Text style={styles.profileDetailsTxt}>Profile Details</Text>
        <View
          style={{
            width: '90%',
            backgroundColor: colors.col5,
            marginHorizontal: 20,
            padding: 10,
            borderRadius: 10,
          }}>
          {/*-------------------- Full Name Text --------------------*/}
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.txt1}>Full Name: </Text>
            <Text style={styles.txt2}>{userData?.fullName}</Text>
          </View>

          {/*-------------------- Email Text --------------------*/}
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.txt1}>Email: </Text>
            <Text style={styles.txt2}>{userData?.email}</Text>
          </View>

          {/*-------------------- Contact Number Text --------------------*/}
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.txt1}>Contact Number: </Text>
            <Text style={styles.txt2}>{userData?.contactNumber}</Text>
          </View>

          {/*-------------------- Address Text --------------------*/}
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.txt1}>Address: </Text>
            <Text style={styles.txt2}>{userData?.address}</Text>
          </View>
        </View>

        {/*-------------------- Edit Profile Button --------------------*/}
        <TouchableOpacity
          style={{alignSelf: 'center', ...button1.btn1}}
          onPress={() => navigation.replace('EditProfileDetails')}>
          <Text style={button1.btn1Txt}>Edit Profile</Text>
        </TouchableOpacity>

        {/*-------------------- Activity History Button --------------------*/}
        <TouchableOpacity
          style={{alignSelf: 'center', ...button1.btn1}}
          onPress={() => navigation.replace('ActivityHistory')}>
          <Text style={button1.btn1Txt}>Activity History</Text>
        </TouchableOpacity>

        {/*-------------------- Change Password Button --------------------*/}
        <TouchableOpacity
          style={{alignSelf: 'center', ...button1.btn1}}
          onPress={() => navigation.replace('ChangePassword')}>
          <Text style={button1.btn1Txt}>Change Password</Text>
        </TouchableOpacity>

        {/*-------------------- Sign Out Button --------------------*/}
        <TouchableOpacity
          style={{alignSelf: 'center', ...button1.btn1}}
          onPress={() => {
            logoutUser();
          }}>
          <Text style={button1.btn1Txt}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UserProfileScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.col6,
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
  heading1: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    color: colors.col7,
  },

  //-------------------- User Profile Screen Body --------------------//
  profileDetailsTxt: {
    fontWeight: 'bold',
    color: colors.col7,
    alignSelf: 'center',
    fontSize: 20,
    marginVertical: 20,
  },
  txt1: {
    fontWeight: 'bold',
    color: colors.col7,
    fontSize: 17,
    marginBottom: 10,
  },
  txt2: {
    fontSize: 17,
    color: colors.col7,
    fontWeight: '400',
    marginBottom: 10,
  },
});
