import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {colors, button1} from '../globals/style';
import {Icon} from '@rneui/base';
import React, {useState, useEffect} from 'react';
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

  /* -------------------- Sign Up Button Function -------------------- */
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
    if (
      checkFullName == true ||
      checkValidEmail == true ||
      checkValidPassword == true
    ) {
      setCustomError('Follow the required format');
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
            fullName.length == 0 &&
            email.length == 0 &&
            password.length == 0 &&
            confirmPassword.length == 0
          ) {
            setCustomError('Fill out the form');
          } else if (
            fullName.length == 0 ||
            email.length == 0 ||
            password.length == 0 ||
            confirmPassword.length == 0
          ) {
            setCustomError('Fill out the form');
          } else if (
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
            setCustomError('Password should be at least 8 characters');
          } else {
            setCustomError(error.message);
          }
        });
    } catch (error) {
      console.log('Sign up system error', error.message);
    }
  };

  /* -------------------- Full Name Validation -------------------- */
  const [checkFullName, setCheckFullName] = useState(false);
  const handleFullName = text => {
    setFullName(text);
    // setFullName(text.replace(/^[A-Za-z ]+$/));

    let reg = /^[A-Za-z ]+$/; // valid alphabet with space

    if (reg.test(text)) {
      setCheckFullName(false);
    } else {
      setCheckFullName(true);
    }
  };

  /* -------------------- Email Validation -------------------- */
  const [checkValidEmail, setCheckValidEmail] = useState(false);
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

  /* -------------------- Password Validation -------------------- */
  const [checkValidPassword, setCheckValidPassword] = useState(false);
  const handleCheckPassword = text => {
    let regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,}$/;

    setPassword(text);
    if (regex.test(text)) {
      setCheckValidPassword(false);
    } else {
      setCheckValidPassword(true);
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
              // onChangeText={text => setFullName(text)}
              onChangeText={text => handleFullName(text)}
            />
          </View>
          {/*-------------------- Full Name Validate -------------------- */}
          {checkFullName ? (
            <Text style={styles.textFailed}>
              It should only contain alphabet
            </Text>
          ) : (
            <Text style={styles.textFailed}></Text>
          )}

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
              // onChangeText={text => setEmail(text)}
              onChangeText={text => handleCheckEmail(text)}
            />
          </View>
          {/*-------------------- Email Validate -------------------- */}
          {checkValidEmail ? (
            <Text style={styles.textFailed}>Wrong format email</Text>
          ) : (
            <Text style={styles.textFailed}> </Text>
          )}

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
              // onChangeText={text => setPassword(text)}
              onChangeText={text => handleCheckPassword(text)}
            />
            <Icon
              name={showPassword === false ? 'eye-off' : 'eye'}
              type="ionicon"
              style={styles.eyeIcon}
              size={20}
              onPress={() => setShowPassword(!showPassword)}
            />
          </View>
          {/*-------------------- Password Validate -------------------- */}
          {checkValidPassword ? (
            <Text style={styles.textFailed}>
              At least 8 characters, 1 numeric character, 1 lowercase letter, 1
              uppercase letter, 1 special character
            </Text>
          ) : (
            <Text style={styles.textFailed}> </Text>
          )}

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
    height: '28%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomView: {
    width: '100%',
    height: '72%',
    backgroundColor: '#e8b0af',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignItems: 'center',
  },
  roseGLogo: {
    width: '55%',
    resizeMode: 'contain',
  },
  heading: {
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
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
  textFailed: {
    fontSize: 13,
    marginHorizontal: 30,
    alignSelf: 'flex-start',
    color: 'red',
  },
});
