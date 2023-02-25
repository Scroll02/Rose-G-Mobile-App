import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../globals/style';
import {Icon} from '@rneui/base';
import {firebase} from '../Firebase/FirebaseConfig';

// For Responsive Layout
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveScreenFontSize,
} from 'react-native-responsive-dimensions';

const LoginScreen = ({navigation}) => {
  const [emailFocus, setEmailFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [customError, setcustomError] = useState('');
  // console.log(email, password);

  /* -------------------- Login Button Function -------------------- */
  const handleLogin = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(userCredential => {
        //Signed In
        var user = userCredential.user;
        console.log('Logged in successfully!');
        //console.log(user);
        navigation.navigate('HomeScreen');
      })
      .catch(error => {
        var errorMessage = error.message;
        console.log(errorMessage);
        if (email.length == 0 && password.length == 0) {
          setcustomError('Please enter email address and password');
        } else if (
          errorMessage ===
          'Firebase: The email address is badly formatted. (auth/invalid-email).'
        ) {
          setcustomError('Please enter a valid email address');
        } else {
          setcustomError('Incorrect email or password');
        }
      });
  };

  return (
    <View style={styles.mainView}>
      {/* -------------------- Top View of the Screen -------------------- */}
      <View style={styles.topView}>
        <Image
          source={require('../../assets/images/roseGLogoFooter.png')}
          style={styles.roseGLogo}
        />
      </View>

      {/* -------------------- Bottom View of the Screen -------------------- */}

      <View style={styles.bottomView}>
        <Text style={styles.heading}>Welcome to Rose G!</Text>

        {/* -------------------- Error Message -------------------- */}
        {customError !== '' && (
          <Text style={styles.errorMsg}>{customError}</Text>
        )}

        {/* -------------------- Email Text Input -------------------- */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            placeholderTextColor={'#000'}
            onFocus={() => {
              setEmailFocus(true);
              setPasswordFocus(false);
              setShowPassword(false);
            }}
            onChangeText={text => {
              setEmail(text);
            }}
          />
        </View>

        {/* -------------------- Password Text Input -------------------- */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            secureTextEntry={showPassword === false ? true : false}
            placeholder="Password"
            value={password}
            placeholderTextColor={'#000'}
            onFocus={() => {
              setEmailFocus(false);
              setPasswordFocus(true);
            }}
            onChangeText={text => {
              setPassword(text);
            }}
          />
          <Icon
            name={showPassword === false ? 'eye-off' : 'eye'}
            type="ionicon"
            style={styles.eyeIcon}
            size={20}
            onPress={() => setShowPassword(!showPassword)}
          />
        </View>

        {/* -------------------- Forgot Password -------------------- */}
        <Text
          style={styles.forgotTxt}
          onPress={() => navigation.navigate('ForgotPasswordScreen')}>
          Forgot Password?
        </Text>

        {/* -------------------- Sign In Button -------------------- */}
        <TouchableOpacity
          style={styles.signInBtn}
          onPress={() => handleLogin()}>
          <Text style={styles.signInBtnTxt}>Sign In</Text>
        </TouchableOpacity>

        {/* -------------------- Dont' have an account? -------------------- */}
        <Text style={styles.signInWithTxt}>Don't have an account?</Text>

        {/* -------------------- Create an account Button -------------------- */}
        <TouchableOpacity
          style={styles.signInWithBtn}
          onPress={() => navigation.navigate('SignUpScreen')}>
          <Text style={styles.loginInWithBtnTxt}>Create an Account</Text>
        </TouchableOpacity>

        {/* -------------------- Connect With Google Button -------------------- */}
        <TouchableOpacity>
          <View style={styles.signInWithBtn}>
            <Image
              source={require('../../assets/images/googleLogo.png')}
              style={{
                height: responsiveScreenHeight(3),
                width: responsiveScreenWidth(5),
                padding: responsiveScreenHeight(1),
                resizeMode: 'contain',
              }}
            />
            <Text style={styles.loginInWithBtnTxt}>Connect with Google</Text>
          </View>
        </TouchableOpacity>

        <Text style={styles.byContinuing}>
          By continuing, you agree to our{' '}
          <Text
            style={styles.agree}
            onPress={() => navigation.navigate('TermsConditionScreen')}>
            Terms & Conditions
          </Text>{' '}
          and{' '}
          <Text
            style={styles.agree}
            onPress={() => navigation.navigate('PrivacyPolicyScreen')}>
            Privacy Policy
          </Text>
        </Text>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.orLine} />
          <Text style={styles.orTxt}>OR</Text>
          <View style={styles.orLine} />
        </View>

        {/* -------------------- Order as Guest Button -------------------- */}
        <TouchableOpacity>
          <View style={styles.signInWithBtn}>
            <Icon name="user" type="font-awesome" />
            <Text style={styles.loginInWithBtnTxt}>Order as Guest</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    // height: windowHeight - 100,
    height: responsiveScreenHeight(100),
    width: responsiveScreenWidth(100),
    // width: '100%',
  },
  topView: {
    width: responsiveScreenWidth(100),
    // height: '28%',
    height: responsiveScreenHeight(28),
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomView: {
    width: responsiveScreenWidth(100),
    // height: '72%',
    height: responsiveScreenHeight(72),
    backgroundColor: colors.col1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignItems: 'center',
  },
  roseGLogo: {
    marginTop: responsiveScreenHeight(5),
    width: responsiveScreenWidth(50),
    // width: '55%',
    resizeMode: 'contain',
  },
  heading: {
    color: '#000',
    // fontSize: 25,
    fontSize: responsiveScreenFontSize(2.5),
    width: responsiveScreenWidth(50),
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 10,
  },
  errorMsg: {
    color: 'red',
    fontSize: responsiveScreenFontSize(1.5),
  },
  inputContainer: {
    flexDirection: 'row',
    display: 'flex',
    // height: 40,
    // width: '90%',
    height: responsiveScreenHeight(6),
    width: responsiveScreenWidth(90),
    borderWidth: 1,
    borderColor: '#fff',
    marginVertical: 3,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  input: {
    fontSize: responsiveScreenFontSize(2),
    padding: responsiveScreenWidth(1),
    marginLeft: 15,
    // width: '85%',
    width: responsiveScreenWidth(75),
  },
  eyeIcon: {
    // padding: responsiveScreenWidth(2),
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signInBtn: {
    // width: '90%',
    width: responsiveScreenWidth(90),
    color: '#000',
    height: responsiveScreenHeight(5),
    backgroundColor: colors.col2,
    borderRadius: 10,
    marginTop: 15,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signInBtnTxt: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: responsiveScreenFontSize(2),
    width: responsiveScreenWidth(60),
    color: '#000',
  },
  forgotTxt: {
    fontSize: responsiveScreenFontSize(1.5),
    color: colors.col4,
    marginTop: 5,
    marginRight: 25,
    alignSelf: 'flex-end',
  },
  byContinuing: {
    marginHorizontal: 20,
    color: '#000',
    textAlign: 'center',
    fontSize: responsiveScreenFontSize(1.5),
    marginTop: 5,
  },
  agree: {
    color: colors.col4,
    textDecorationLine: 'underline',
  },
  orTxt: {
    marginTop: 5,
    color: '#000',
    fontWeight: 'bold',
    alignContent: 'center',
    width: responsiveScreenWidth(10),
    fontSize: responsiveScreenFontSize(1.5),
    textAlign: 'center',
  },
  orLine: {
    marginVertical: 15,
    marginHorizontal: 20,
    backgroundColor: '#000',
    height: 1,
    flex: 1,
    alignSelf: 'center',
  },
  signInWithTxt: {
    color: '#000',
    marginVertical: 10,
    // fontSize: 15,
    fontSize: responsiveScreenFontSize(1.5),
    textAlign: 'center',
  },
  signInWithBtn: {
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    // width: 300,
    // height: 35,
    height: responsiveScreenHeight(5),
    width: responsiveScreenWidth(80),
    margin: responsiveScreenHeight(0.6),
    borderRadius: 10,
    padding: responsiveScreenHeight(1),
  },
  loginInWithBtnTxt: {
    // fontSize: 15,
    fontSize: responsiveScreenFontSize(1.6),
    marginLeft: 10,
    color: '#000',
    fontWeight: '500',
  },
  signUpTxt: {
    color: 'red',
  },
});
