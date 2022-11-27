import {StyleSheet, Text, View} from 'react-native';
import {ScrollView} from 'react-native-virtualized-view';
import React from 'react';
import {Icon} from '@rneui/base';
import {colors} from '../globals/style';
const TermsConditionScreen = ({navigation}) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <View style={styles.goBackIcon}>
          <Icon
            name="arrow-back"
            type="material"
            size={30}
            onPress={() => navigation.goBack()}
          />
        </View>

        <Text style={styles.heading1}>Terms & Condition</Text>
      </View>
      <ScrollView>
        <View
          style={{
            width: '90%',
            marginHorizontal: 20,
            marginVertical: 20,
            alignSelf: 'center',
          }}>
          <Text style={{fontSize: 14, textAlign: 'justify'}}>
            These Terms of Use (“Terms”) apply to any website, mobile or tablet
            application, or other on-line service or platform (“Services”)
            controlled and operated by Rose Garden Special Palabok. Rose Garden
            requires that all users of the Services agree to the terms and
            conditions below. By accessing and using the Services, you and any
            entity you represent (“You”) signify Your agreement with these
            Terms. If You do not agree with the Terms, You should not use the
            Services. These Terms also govern our interactions with You on third
            party platforms.
          </Text>

          {/* -------------------- Use of the Services -------------------- */}
          <Text style={{fontSize: 14, fontWeight: 'bold'}}>
            Use of the Services
          </Text>
          <Text style={{fontSize: 14, textAlign: 'justify'}}>
            The main purpose of the Services is to provide You with information
            about Rose Garden Special Palabok and to provide information about
            Rose Garden products and services. You shall use the Website for
            lawful purposes only. Any User conduct that in the sole discretion
            Rose Garden special palabok’s restricts or inhibits any other user
            from using or enjoying the Services will not be permitted. You shall
            not use the Services to advertise or perform any commercial
            solicitation or promotion. By using the Services, You confirm that
            You are legally permitted to use the Services.
          </Text>
          <Text style={{fontSize: 14, textAlign: 'justify', marginTop: 10}}>
            All content on the Services, including but not limited to text,
            images, graphics, and sound files (“Content”), is subject to
            intellectual property rights and other rights owned or controlled by
            Rose Garden Special Palabok. You may not use, reproduce, transmit,
            modify, amend, create derivative works, distribute, republish,
            upload, download, or post the Content without the prior written
            consent of Rose Garden Special palabok. Such action violates Rose
            Garden's intellectual property and any other rights under the
            applicable laws. Rose Garden does not transfer any property rights
            or issue any license by allowing use of the Services.
          </Text>
          <Text style={{fontSize: 14, textAlign: 'justify', marginTop: 10}}>
            You are responsible for any devices, software, and services needed
            to use the Services. Rose Garden does not guarantee the Services
            will properly function on any particular device or software. You are
            responsible for any charges You incur on Your computer, tablet,
            mobile device, or other device You utilize to use and interface with
            the Services. You are responsible for all activity You conduct for
            any account You create or open in association with the Services.
          </Text>
          <Text style={{fontSize: 14, textAlign: 'justify', marginTop: 10}}>
            You must be age 18 to use the Services without supervision. The
            Services are not to be used by children younger than age 13. Persons
            who are age 13 or older but younger than age 18 (or the age of
            majority in their jurisdiction of residence) may only use the
            Services with the permission and under the supervision of a parent
            or guardian who has reviewed and agreed to these Terms. Please see
            our Privacy Policy for more information relating to children’s
            privacy as it relates to the Services.
          </Text>

          {/* -------------------- Warranty Disclaimer and Limitation of Liability -------------------- */}
          <Text style={{fontSize: 14, fontWeight: 'bold', marginTop: 20}}>
            Warranty Disclaimer and Limitation of Liability
          </Text>
          <Text style={{fontSize: 14, textAlign: 'justify'}}>
            The Services are provided on an “as is” basis without warranties of
            any kind, express or implied. Rose Garden Special Palabok disclaims
            all warranties as to merchantability and fitness for a particular
            purpose. Rose Garden does not warrant that: the Services will be
            uninterrupted or error-free; defects will be corrected; or the
            Services and server that make the Services available are free from
            viruses or other harmful components. Rose Garden Special Palabok
            further does not make any warranty or representation as to the
            accuracy, reliability, content, or completeness of search results or
            other information or services provided through the Services. These
            warranty disclaimers may not apply to You to the extent that
            applicable law does not allow the exclusion of such warranties. Rose
            Garden Special Palabok may make changes or improvements to the
            Services at any time.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default TermsConditionScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: '100%',
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
  //-------------------- Terms & Condition --------------------//
});
