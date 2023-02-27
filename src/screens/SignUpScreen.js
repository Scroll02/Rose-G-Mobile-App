import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {colors, button1} from '../globals/style';
import {Icon} from '@rneui/base';
import React, {useState, useEffect} from 'react';
import {firebase} from '../Firebase/FirebaseConfig';

// Responsive Layout
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveScreenFontSize,
} from '../globals/style';

const SignUpScreen = ({navigation}) => {
  const [firstNameFocus, setFirstNameFocus] = useState(false);
  const [lastNameFocus, setLastNameFocus] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPasswordFocus, setConfirmPasswordFocus] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isSelected, setSelection] = useState(false);

  /* -------------------- Taking Form Data -------------------- */
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  // console.log(fullName, email, password, confirmPassword);

  const [customError, setCustomError] = useState('');
  const [successMsg, setSuccessMsg] = useState(null);

  /* -------------------- Sign Up Button Function -------------------- */
  const handleSignup = () => {
    const FormData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      // confirmPassword: confirmPassword,
    };

    if (password != confirmPassword) {
      setCustomError("Password doesn't match");
      return;
    }
    if (
      checkFirstName == true ||
      checkLastName == true ||
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
        //Email Verification
        // .then(() => {
        //   firebase.auth().currentUser.sendEmailVerification({
        //     handleCodeInApp: true,
        //     url: 'https://rose-g-2537e.firebaseapp.com',
        //   });
        // })
        .then(userCredentials => {
          console.log('user created');
          if (userCredentials?.user.uid) {
            const userRef = firebase.firestore().collection('UserData');
            userRef
              .add({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
                // cpassword: cpassword,
                uid: userCredentials?.user.uid,
              })

              .then(() => {
                console.log('Data added to firestore');
                setSuccessMsg(
                  'Your account has been created, Verification email sent.',
                );
              })
              .catch(error => {
                console.log('firestore error', error);
              });
          }
        })
        .catch(error => {
          console.log('Sign up firebase error', error.message);
          if (
            firstName.length == 0 &&
            lastName.length == 0 &&
            email.length == 0 &&
            password.length == 0 &&
            confirmPassword.length == 0
          ) {
            setCustomError('Fill out the form');
          } else if (
            (firstName.length == 0 &&
              lastName.length == 0 &&
              email.length == 0) ||
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

  /* -------------------- First Name Validation -------------------- */
  const [checkFirstName, setCheckFirstName] = useState(false);
  const handleFirstName = text => {
    setFirstName(text);
    // setFullName(text.replace(/^[A-Za-z ]+$/));

    let reg = /^[A-Za-z ]+$/; // valid alphabet with space

    if (reg.test(text)) {
      setCheckFirstName(false);
    } else {
      setCheckFirstName(true);
    }
  };

  /* -------------------- Last Name Validation -------------------- */
  const [checkLastName, setCheckLastName] = useState(false);
  const handleLastName = text => {
    setLastName(text);
    // setFullName(text.replace(/^[A-Za-z ]+$/));

    let reg = /^[A-Za-z ]+$/; // valid alphabet with space

    if (reg.test(text)) {
      setCheckLastName(false);
    } else {
      setCheckLastName(true);
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
      {/*-------------------- Top View Part -------------------- */}
      <View style={styles.topView}>
        <Image
          source={require('../../assets/images/roseGLogoFooter.png')}
          style={styles.roseGLogo}
        />
      </View>

      {/*-------------------- Bottom View Part -------------------- */}
      {successMsg == null ? (
        <View style={styles.bottomView}>
          <Text numberOfLines={1} style={styles.heading}>
            Create an Account!
          </Text>
          {customError !== '' && (
            <Text style={styles.errorMsg}>{customError}</Text>
          )}

          {/*-------------------- First Name Text Input -------------------- */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="First Name"
              value={firstName}
              placeholderTextColor={'#000'}
              onFocus={() => {
                setFirstNameFocus(true);
                setLastNameFocus(true);
                setEmailFocus(false);
                setPasswordFocus(false);
                setShowPassword(false);
                setConfirmPasswordFocus(false);
                setShowConfirmPassword(false);
              }}
              // onChangeText={text => setFullName(text)}
              onChangeText={text => handleFirstName(text)}
            />
          </View>
          {/*-------------------- First Name Validate -------------------- */}
          {checkFirstName ? (
            <Text style={styles.textFailed}>
              It should only contain alphabet
            </Text>
          ) : (
            <Text style={styles.textFailed}></Text>
          )}

          {/*-------------------- Last Name Text Input -------------------- */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Last Name"
              value={lastName}
              placeholderTextColor={'#000'}
              onFocus={() => {
                setFirstNameFocus(false);
                setLastNameFocus(true);
                setEmailFocus(false);
                setPasswordFocus(false);
                setShowPassword(false);
                setConfirmPasswordFocus(false);
                setShowConfirmPassword(false);
              }}
              // onChangeText={text => setFullName(text)}
              onChangeText={text => handleLastName(text)}
            />
          </View>
          {/*-------------------- Last Name Validate -------------------- */}
          {checkLastName ? (
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
                setFirstNameFocus(false);
                setLastNameFocus(false);
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
                setFirstNameFocus(false);
                setLastNameFocus(false);
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
                setFirstNameFocus(false);
                setLastNameFocus(false);
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
            <Text numberOfLines={1} style={button1.btn1Txt}>
              Sign Up
            </Text>
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
    // height: height_screen,
    // width: width_screen,
    height: responsiveScreenHeight(100),
    width: responsiveScreenWidth(100),
  },
  topView: {
    width: responsiveScreenWidth(100),
    height: responsiveScreenHeight(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomView: {
    width: responsiveScreenWidth(100),
    height: responsiveScreenHeight(70),
    backgroundColor: '#e8b0af',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignItems: 'center',
  },
  roseGLogo: {
    marginTop: responsiveScreenHeight(5),
    width: responsiveScreenWidth(55),
    resizeMode: 'contain',
  },
  heading: {
    color: '#000',
    fontSize: responsiveScreenFontSize(2.5),
    width: responsiveScreenWidth(50),
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  errorMsg: {
    fontSize: responsiveScreenFontSize(1.7),
    color: 'red',
  },
  // Text Fields
  inputContainer: {
    flexDirection: 'row',
    display: 'flex',
    height: responsiveScreenHeight(5),
    width: responsiveScreenWidth(90),
    borderWidth: 1,
    borderColor: '#fff',
    marginVertical: responsiveScreenHeight(0.2),
    // marginHorizontal: 10,
    borderRadius: 10,
  },
  input: {
    padding: responsiveScreenHeight(1),
    fontSize: responsiveScreenFontSize(2),
    marginLeft: 15,
    width: responsiveScreenWidth(75),
  },
  eyeIcon: {
    flex: 1,
    // padding: responsiveScreenWidth(2),
    width: responsiveScreenWidth(5),
    justifyContent: 'center',
    alignContent: 'center',
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
    fontSize: responsiveScreenFontSize(1.5),
    color: '#000',
    textAlign: 'center',
  },
  termsCondition: {
    color: colors.col4,
    textDecorationLine: 'underline',
  },
  alreadyTxt: {
    color: '#000',
    fontSize: responsiveScreenFontSize(1.5),
    marginTop: 10,
  },
  signInTxt: {
    color: colors.col4,
    textDecorationLine: 'underline',
  },
  successMessage: {
    color: 'green',
    fontSize: responsiveScreenFontSize(2.3),
    width: responsiveScreenWidth(90),
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
    fontSize: responsiveScreenFontSize(1.5),
    marginHorizontal: 30,
    marginVertical: 1,
    alignSelf: 'flex-start',
    color: 'red',
  },
});
