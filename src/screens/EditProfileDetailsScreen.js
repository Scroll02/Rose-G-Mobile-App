import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {ScrollView} from 'react-native-virtualized-view';
import React, {useState, useEffect} from 'react';
import {Icon} from '@rneui/base';
import {colors, button1} from '../globals/style';
import {firebase} from '../Firebase/FirebaseConfig';

const EditProfileDetailsScreen = ({navigation, route}) => {
  /*-------------------- Retrieving User Data --------------------*/
  const [userLoggedUid, setUserLoggedUid] = useState(null);
  const [userData, setUserData] = useState(null);
  //   console.log(userData);

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

  /*-------------------- Updating User Data --------------------*/
  const [newFullName, setNewFullName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newContactNum, setNewContactNum] = useState('');
  const [newAddress, setNewAddress] = useState('');
  const updateUser = async () => {
    const docRef = firebase
      .firestore()
      .collection('UserData')
      .where('uid', '==', userLoggedUid);
    const doc = await docRef.get();
    if (!doc.empty) {
      if (newFullName !== '') {
        doc.forEach(doc => {
          doc.ref.update({
            fullName: newFullName,
          });
        });
      }

      if (newEmail !== '') {
        doc.forEach(doc => {
          doc.ref.update({
            email: newEmail,
          });
        });
      }

      if (newContactNum !== '') {
        doc.forEach(doc => {
          doc.ref.update({
            contactNumber: newContactNum,
          });
        });
      }

      if (newAddress !== '') {
        doc.forEach(doc => {
          doc.ref.update({
            address: newAddress,
          });
        });
      }
      alert('your user data is updated');
      getUserData();
      navigation.replace('UserProfile');
    } else {
      console.log('no user data');
    }
  };
  return (
    <View style={styles.mainContainer}>
      {/*-------------------- Header Navigation --------------------*/}
      <View style={styles.headerContainer}>
        <View style={styles.goBackIcon}>
          <Icon
            name="arrow-back"
            type="material"
            size={30}
            onPress={() => navigation.replace('UserProfile')}
          />
        </View>

        <Text style={styles.heading1}>Edit Profile Details</Text>
      </View>

      {/*-------------------- Edit Profile Details Screen Body --------------------*/}
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.bodyContainer}>
          <Text style={styles.profileDetailsTxt}>Profile Details</Text>
          <Text style={styles.txt1}>Full Name: {userData?.fullName}</Text>
          <TextInput
            style={styles.txtInput}
            placeholder="Enter New Full Name"
            onChangeText={e => setNewFullName(e)}
          />
          <Text style={styles.txt1}>Email: {userData?.email}</Text>
          <TextInput
            style={styles.txtInput}
            placeholder="Enter New Full Name"
            onChangeText={e => setNewEmail(e)}
          />
          <Text style={styles.txt1}>
            Contact Number:{userData?.contactNumber}
          </Text>
          <TextInput
            style={styles.txtInput}
            placeholder="Enter New Contact Number"
            onChangeText={e => setNewContactNum(e)}
          />
          <Text style={styles.txt1}>Address: {userData?.address}</Text>
          <TextInput
            style={styles.txtInput}
            placeholder="Enter New Address"
            onChangeText={e => setNewAddress(e)}
          />
          <View style={{alignItems: 'center'}}>
            <TouchableOpacity style={button1.btn1} onPress={() => updateUser()}>
              <Text style={button1.btn1Txt}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default EditProfileDetailsScreen;

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

  //-------------------- Edit Profile Details Screen Body --------------------//
  bodyContainer: {
    marginVertical: 50,
    marginHorizontal: 10,
    padding: 20,
    borderRadius: 10,
    backgroundColor: colors.col5,
  },
  profileDetailsTxt: {
    fontWeight: 'bold',
    color: colors.col7,
    alignSelf: 'center',
    fontSize: 17,
    marginBottom: 15,
  },
  txt1: {
    fontWeight: 'bold',
    color: colors.col7,
    fontSize: 15,
    marginBottom: 10,
  },
  txtInput: {
    width: '90%',
    fontSize: 15,
    height: 40,
    borderWidth: 1,
    borderColor: colors.col4,
    marginBottom: 10,
    alignSelf: 'center',
    paddingLeft: 10,
  },
});
