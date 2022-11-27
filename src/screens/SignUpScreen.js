import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {colors, button1} from '../globals/style';
import {Icon} from '@rneui/base';
import React, {useState} from 'react';
import {firebase} from '../Firebase/FirebaseConfig';

const SignUpScreen = ({navigation}) => {
  const [fullNameFocus, setFullNameFocus] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPasswordFocus, setConfirmPasswordFocus] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isSelected, setSelection] = useState(false);

  /* -------------------- Taking Form Data -------------------- */
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  // console.log(fullName, email, password, confirmPassword);

  const [customError, setCustomError] = useState('');
  const [successMsg, setSuccessMsg] = useState(null);

  const handleSignup = () => {
    const FormData = {
      fullName: fullName,
      email: email,
      password: password,
      // confirmPassword: confirmPassword,
    };

    if (password != confirmPassword) {
      setCustomError("Password doesn't match");
      return;
    }
    try {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(userCredentials => {
          console.log('user created');
          if (userCredentials?.user.uid) {
            const userRef = firebase.firestore().collection('UserData');
            userRef
              .add({
                fullName: fullName,
                email: email,
                password: password,
                // cpassword: cpassword,
                uid: userCredentials?.user.uid,
              })
              .then(() => {
                console.log('Data added to firestore');
                setSuccessMsg('Your account has been created');
              })
              .catch(error => {
                console.log('firestore error', error);
              });
          }
        })
        .catch(error => {
          console.log('Sign up firebase error', error.message);
          if (
            error.message ===
            'Firebase: The email address is already in use by another account. (auth/email-already-in-use).'
          ) {
            setCustomError('Email already exists');
          } else if (
            error.message ===
            'Firebase: The email address is badly formatted. (auth/invalid-email).'
          ) {
            setCustomError('Invalid Email');
          } else if (
            error.message ===
            'Firebase: Password should be at least 6 characters (auth/weak-password).'
          ) {
            setCustomError('Password should be at least 6 characters');
          } else {
            setCustomError(error.message);
          }
        });
    } catch (error) {
      console.log('Sign up system error', error.message);
    }
  };

  return (
    <View style={styles.mainView}>
      <View style={styles.topView}>
        <Image
          source={require('../../assets/images/roseG_Logo.png')}
          style={styles.roseGLogo}
        />
      </View>
      {successMsg == null ? (
        <View style={styles.bottomView}>
          <Text style={styles.heading}>Create an Account!</Text>
          {customError !== '' && (
            <Text style={styles.errorMsg}>{customError}</Text>
          )}
          {/*-------------------- Full Name Text Input -------------------- */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              value={fullName}
              placeholderTextColor={'#000'}
              onFocus={() => {
                setFullNameFocus(true);
                setEmailFocus(false);
                setPasswordFocus(false);
                setShowPassword(false);
                setConfirmPasswordFocus(false);
                setShowConfirmPassword(false);
              }}
              onChangeText={text => setFullName(text)}
            />
          </View>

          {/*-------------------- Email Text Input -------------------- */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              placeholderTextColor={'#000'}
              onFocus={() => {
                setFullNameFocus(false);
                setEmailFocus(true);
                setPasswordFocus(false);
                setShowPassword(false);
                setConfirmPasswordFocus(false);
                setShowConfirmPassword(false);
              }}
              onChangeText={text => setEmail(text)}
            />
          </View>

          {/*-------------------- Password Text Input -------------------- */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              secureTextEntry={showPassword === false ? true : false}
              placeholder="Password"
              value={password}
              placeholderTextColor={'#000'}
              onFocus={() => {
                setFullNameFocus(false);
                setEmailFocus(false);
                setPasswordFocus(true);
                setShowPassword(false);
                setConfirmPasswordFocus(false);
                setShowConfirmPassword(false);
              }}
              onChangeText={text => setPassword(text)}
            />
            <Icon
              name={showPassword === false ? 'eye-off' : 'eye'}
              type="ionicon"
              style={styles.eyeIcon}
              size={20}
              onPress={() => setShowPassword(!showPassword)}
            />
          </View>

          {/*-------------------- Confirm Password Text Input -------------------- */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              secureTextEntry={showConfirmPassword === false ? true : false}
              placeholder="Confirm Password"
              value={confirmPassword}
              placeholderTextColor={'#000'}
              onFocus={() => {
                setFullNameFocus(false);
                setEmailFocus(false);
                setPasswordFocus(false);
                setShowPassword(false);
                setConfirmPasswordFocus(true);
                setShowConfirmPassword(false);
              }}
              onChangeText={text => setConfirmPassword(text)}
            />
            <Icon
              name={showConfirmPassword === false ? 'eye-off' : 'eye'}
              type="ionicon"
              style={styles.eyeIcon}
              size={20}
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            />
          </View>

          {/*-------------------- Terms & Condition and Privacy Policy -------------------- */}
          <View style={styles.checkBoxContainer}>
            <Text style={styles.iAgreeTxt}>
              By registering, you confirm that you accept our{' '}
              <Text
                style={styles.termsCondition}
                onPress={() => navigation.navigate('TermsConditionScreen')}>
                Terms & Conditions
              </Text>{' '}
              and{' '}
              <Text
                style={styles.termsCondition}
                onPress={() => navigation.navigate('PrivacyPolicyScreen')}>
                Privacy Policy
              </Text>
            </Text>
          </View>

          {/*-------------------- Sign Up Button -------------------- */}
          <TouchableOpacity style={button1.btn1} onPress={() => handleSignup()}>
            <Text style={button1.btn1Txt}>Sign Up</Text>
          </TouchableOpacity>

          {/*-------------------- Already Have An Account? -------------------- */}
          <Text style={styles.alreadyTxt}>
            Already have an account?{' '}
            <Text
              style={styles.signInTxt}
              onPress={() => navigation.replace('LoginScreen')}>
              Sign In
            </Text>
          </Text>
        </View>
      ) : (
        /* -------------------- Success Message Screen -------------------- */
        <View style={styles.bottomView}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              height: '60%',
            }}>
            <Image
              source={require('../../assets/images/success.png')}
              style={{width: 200, height: 200}}
            />
          </View>
          <Text style={styles.successMessage}>{successMsg}</Text>

          <TouchableOpacity
            style={{
              width: '70%',
              color: '#000',
              height: 40,
              backgroundColor: '#bcc998',
              borderRadius: 10,
              marginTop: 10,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontWeight: 'bold',
              fontSize: 18,
              marginTop: 30,
            }}
            onPress={() => navigation.navigate('LoginScreen')}>
            <Text style={button1.btn1Txt}>Continue</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  topView: {
    width: '100%',
    height: '30%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomView: {
    width: '100%',
    height: '70%',
    backgroundColor: '#e8b0af',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignItems: 'center',
  },
  roseGLogo: {
    width: '60%',
    resizeMode: 'contain',
  },
  heading: {
    color: '#000',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
  },
  errorMsg: {
    color: 'red',
  },
  inputContainer: {
    flexDirection: 'row',
    height: 40,
    width: '90%',
    borderWidth: 1,
    borderColor: '#fff',
    marginVertical: 7,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  input: {
    fontSize: 15,
    marginLeft: 15,
    width: '85%',
  },
  eyeIcon: {
    padding: 8,
  },
  checkBoxContainer: {
    flexDirection: 'row',
  },
  checkbox: {
    alignSelf: 'center',
    color: colors.col4,
  },
  iAgreeTxt: {
    margin: 8,
    fontSize: 13,
    color: '#000',
    textAlign: 'center',
  },
  termsCondition: {
    color: colors.col4,
    textDecorationLine: 'underline',
  },
  alreadyTxt: {
    color: '#000',
    fontSize: 15,
    marginTop: 10,
  },
  signInTxt: {
    color: colors.col4,
    textDecorationLine: 'underline',
  },
  successMessage: {
    color: 'green',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
    borderColor: 'green',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    backgroundColor: colors.col5,
  },
});
