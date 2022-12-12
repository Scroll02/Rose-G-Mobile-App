import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Image,
  TextInput,
} from 'react-native';
import {ScrollView} from 'react-native-virtualized-view';
import React, {useState, useEffect} from 'react';
import {Icon} from '@rneui/base';
import {colors, button1} from '../globals/style';
import {firebase} from '../Firebase/FirebaseConfig';
import {getAuth, sendPasswordResetEmail} from 'firebase/auth';

const ForgotPasswordScreen = ({navigation}) => {
  const [email, setEmail] = useState('');

  /* -------------------- Email Validation -------------------- */
  const [checkValidEmail, setCheckValidEmail] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const handleCheckEmail = text => {
    let re = /\S+@\S+\.\S+/;
    let regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

    setEmail(text);
    if (re.test(text) || regex.test(text)) {
      setCheckValidEmail(false);
    } else {
      setCheckValidEmail(true);
    }
  };

  /* -------------------- Submit Button Function -------------------- */
  const handleSubmit = () => {
    const auth = getAuth();
    if (!email == '') {
      sendPasswordResetEmail(auth, email)
        .then(() => {
          alert('Password reset email has been sent successfully');
          setSuccessMsg(
            'Password reset email has been sent successfully. Check it on spam section',
          );
        })
        .catch(error => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert(error.message);
        });
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
            onPress={() => navigation.replace('LoginScreen')}
          />
        </View>

        <Text style={styles.heading1}>Forgot Password</Text>
      </View>

      {/*-------------------- Forgot Password Screen Body --------------------*/}
      {/*-------------------- Top View --------------------*/}
      <View style={styles.topView}>
        <View style={{marginVertical: 50}}>
          <Image
            source={require('../../assets/images/forgot-password.png')}
            style={{width: 150, height: 150}}
          />
        </View>
      </View>

      {/*-------------------- Bottom View --------------------*/}
      <View style={styles.bottomView}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 20,
            margin: 10,
            textAlign: 'center',
            color: colors.col7,
          }}>
          Reset Password
        </Text>
        <Text
          style={{
            width: '80%',
            fontSize: 15,
            margin: 10,
            textAlign: 'center',
            color: colors.col7,
          }}>
          Enter the email associated with your account and we'll send an email
          with instructions to reset your password
        </Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={email}
            placeholder="Email"
            placeholderTextColor={'#000'}
            onChangeText={text => handleCheckEmail(text)}
          />
        </View>

        {/*-------------------- Email Validate -------------------- */}
        {checkValidEmail ? (
          <Text style={styles.textFailed}>Invalid Email</Text>
        ) : (
          <Text style={styles.textFailed}> </Text>
        )}

        <TouchableOpacity
          style={{alignSelf: 'center', ...button1.btn1}}
          onPress={() => handleSubmit()}>
          <Text style={button1.btn1Txt}>Submit</Text>
        </TouchableOpacity>

        {/* -------------------- Success Message -------------------- */}
        {successMsg !== '' && (
          <Text style={styles.successMsg}>{successMsg}</Text>
        )}
      </View>
    </View>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: colors.col6,
    // alignItems: 'center',
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

  //-------------------- Forgot Password Screen Body --------------------//
  topView: {
    width: '100%',
    height: '35%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomView: {
    width: '100%',
    height: '65%',
    backgroundColor: colors.col1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignItems: 'center',
  },

  inputContainer: {
    flexDirection: 'row',
    height: 40,
    width: '80%',
    borderWidth: 1,
    borderColor: '#fff',
    marginVertical: 7,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  input: {
    fontSize: 15,
    marginLeft: 15,
    width: '75%',
  },
  textFailed: {
    fontSize: 13,
    alignSelf: 'center',
    color: 'red',
  },
  successMsg: {
    marginTop: 20,
    width: '80%',
    fontSize: 15,
    alignItems: 'center',
    textAlign: 'center',
    color: 'green',
  },
});
