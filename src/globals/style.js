// For Responsive Layout
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveScreenFontSize,
} from 'react-native-responsive-dimensions';

module.exports = {
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveScreenFontSize,
  colors: {
    col1: '#e8b0af',
    col2: '#bcc998', //green
    col3: '#e3686b', //dark pink
    col4: '#c26522', //brown
    col5: '#f4ede5', //dirty white
    col6: 'white', //white
    col7: 'black', //black
    col8: 'grey', //grey
    col9: '#ff0000', //red
    // col10: '#e8b0af', //light pink
  },
  button1: {
    btn1: {
      // width: responsiveScreenWidth(90),
      // color: '#000',
      // height: responsiveScreenHeight(5),
      // backgroundColor: '#bcc998',
      // borderRadius: 10,
      // marginTop: 10,
      // // display: 'flex',
      // fontWeight: 'bold',
      // fontSize: responsiveScreenFontSize(1.5),
      width: responsiveScreenWidth(90),
      color: '#000',
      height: responsiveScreenHeight(5),
      backgroundColor: '#bcc998',
      borderRadius: 10,
      marginTop: 15,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    btn1Txt: {
      // textAlign: 'center',
      // fontSize: responsiveScreenFontSize(1.5),
      // fontWeight: 'bold',
      // color: '#000',
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: responsiveScreenFontSize(2),
      width: responsiveScreenWidth(60),
      color: '#000',
    },
  },
};
