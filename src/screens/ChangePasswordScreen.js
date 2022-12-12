import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {ScrollView} from 'react-native-virtualized-view';
import React, {useState, useEffect} from 'react';
import {Icon} from '@rneui/base';
import {button1, colors} from '../globals/style';
import {firebase} from '../Firebase/FirebaseConfig';

const ChangePasswordScreen = ({navigation}) => {
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

  /*-------------------- Change Password Function --------------------*/
  const [oldPasswordFocus, setOldPasswordFocus] = useState(false);
  const [newPasswordFocus, setNewPasswordFocus] = useState(false);
  const [confirmNewPasswordFocus, setConfirmNewPasswordFocus] = useState(false);

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const [customError, setCustomError] = useState('');

  const updatePassword = async () => {
    if (newPassword != confirmNewPassword) {
      setCustomError("New Password doesn't match");
      return;
    }
    const reauthenticate = oldpassword => {
      var user = firebase.auth().currentUser;
      var cred = firebase.auth.EmailAuthProvider.credential(
        user.email,
        oldpassword,
      );
      return user.reauthenticateWithCredential(cred);
    };
    let docRef = firebase
      .firestore()
      .collection('UserData')
      .where('uid', '==', userLoggedUid);
    let doc = await docRef.get();
    reauthenticate(oldPassword)
      .then(() => {
        var user = firebase.auth().currentUser;
        user
          .updatePassword(newPassword)
          .then(() => {
            // alert("Password updated!");

            if (!doc.empty) {
              doc.forEach(doc => {
                doc.ref.update({
                  password: newPassword,
                });
              });
              alert('Your password is updated');
              navigation.replace('ChangePassword');
            }
          })
          .catch(error => {
            alert('Server Issue');
          });
      })
      .catch(error => {
        alert('Wrong Old Password');
      });
  };

  /* -------------------- Password Validation -------------------- */
  const [checkValidPassword, setCheckValidPassword] = useState(false);
  const handleCheckPassword = text => {
    let regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,}$/;

    setNewPassword(text);
    if (regex.test(text)) {
      setCheckValidPassword(false);
    } else {
      setCheckValidPassword(true);
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
        <Text style={styles.heading1}>Change Password</Text>
      </View>

      {/*-------------------- Change Password Screen Body --------------------*/}
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.bodyContainer}>
          {/*-------------------- Old Password --------------------*/}
          <Text style={styles.txt1}>Old Password:</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              secureTextEntry={showOldPassword === false ? true : false}
              placeholder="Enter Old Password"
              onFocus={() => {
                setOldPasswordFocus(true);
                setShowOldPassword(false);
                setNewPasswordFocus(false);
                setShowNewPassword(false);
                setConfirmNewPasswordFocus(false);
                setShowConfirmNewPassword(false);
              }}
              onChangeText={e => setOldPassword(e)}
            />

            <Icon
              name={showOldPassword === false ? 'eye-off' : 'eye'}
              type="ionicon"
              style={styles.eyeIcon}
              size={20}
              onPress={() => setShowOldPassword(!showOldPassword)}
            />
          </View>

          {/*-------------------- New Password --------------------*/}
          <Text style={styles.txt1}>New Password:</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={newPassword}
              secureTextEntry={showNewPassword === false ? true : false}
              placeholder="Enter New Password"
              onFocus={() => {
                setOldPasswordFocus(false);
                setShowOldPassword(false);
                setNewPasswordFocus(true);
                setShowNewPassword(false);
                setConfirmNewPasswordFocus(false);
                setShowConfirmNewPassword(false);
              }}
              // onChangeText={e => setNewPassword(e)}
              onChangeText={handleCheckPassword}
            />

            <Icon
              name={showNewPassword === false ? 'eye-off' : 'eye'}
              type="ionicon"
              style={styles.eyeIcon}
              size={20}
              onPress={() => setShowNewPassword(!showNewPassword)}
            />
          </View>
          {checkValidPassword ? (
            <Text style={styles.textFailed}>
              At least 8 characters, 1 numeric character, 1 lowercase letter, 1
              uppercase letter, 1 special character
            </Text>
          ) : (
            <Text style={styles.textFailed}> </Text>
          )}

          {/*-------------------- Confirm New Password --------------------*/}
          <Text style={styles.txt1}>Confirm New Password:</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              secureTextEntry={showConfirmNewPassword === false ? true : false}
              placeholder="Enter Confirm New Password"
              onFocus={() => {
                setOldPasswordFocus(false);
                setShowOldPassword(false);
                setNewPasswordFocus(false);
                setShowNewPassword(false);
                setConfirmNewPasswordFocus(true);
                setShowConfirmNewPassword(false);
              }}
              onChangeText={e => setConfirmNewPassword(e)}
            />

            <Icon
              name={showConfirmNewPassword === false ? 'eye-off' : 'eye'}
              type="ionicon"
              style={styles.eyeIcon}
              size={20}
              onPress={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
            />
          </View>

          {customError !== '' && (
            <Text style={styles.errorMsg}>{customError}</Text>
          )}

          {/*-------------------- Save Button --------------------*/}
          <View style={{alignItems: 'center'}}>
            <TouchableOpacity style={button1.btn1} onPress={updatePassword}>
              <Text style={button1.btn1Txt}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default ChangePasswordScreen;

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
  inputContainer: {
    flexDirection: 'row',
    height: 40,
    width: '90%',
    borderWidth: 1,
    borderColor: colors.col4,
    marginVertical: 7,
    marginHorizontal: 16,
    borderRadius: 10,
  },
  input: {
    fontSize: 15,
    marginLeft: 15,
    width: '85%',
  },
  eyeIcon: {
    paddingTop: 7,
  },
  errorMsg: {
    fontSize: 13,
    color: 'red',
    textAlign: 'center',
  },
  textFailed: {
    fontSize: 13,
    marginHorizontal: 30,
    textAlign: 'justify',
    color: 'red',
  },
});
