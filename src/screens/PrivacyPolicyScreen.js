import {StyleSheet, Text, View} from 'react-native';
import {ScrollView} from 'react-native-virtualized-view';
import React from 'react';
import {Icon} from '@rneui/base';
import {colors} from '../globals/style';

const PrivacyPolicyScreen = ({navigation}) => {
  return (
    <View style={styles.mainContainer}>
      {/*-------------------- Header Navigation --------------------*/}
      <View style={styles.headerContainer}>
        <View style={styles.goBackIcon}>
          <Icon
            name="arrow-back"
            type="material"
            size={30}
            onPress={() => navigation.goBack()}
          />
        </View>

        <Text style={styles.heading1}>Privacy Policy</Text>
      </View>

      {/*-------------------- Privacy Policy --------------------*/}
      <ScrollView>
        <View
          style={{
            width: '90%',
            marginHorizontal: 20,
            marginVertical: 20,
            alignSelf: 'center',
          }}>
          <Text style={{fontSize: 14, textAlign: 'justify'}}>
            Rose Garden Special appreciates Your use of the Services and
            respects Your privacy. You can review the Privacy Policy for a list
            of the Services.
          </Text>
          {/*-------------------- Modifications --------------------*/}
          <Text style={{fontSize: 14, fontWeight: 'bold', marginTop: 20}}>
            Modifications
          </Text>
          <Text style={{fontSize: 14, textAlign: 'justify'}}>
            Rose Garden Special Palabok may revise these Terms on occasion and
            will post the most current version with the Services. If a revision
            meaningfully reduces Your rights, we will notify You (by, for
            example, posting a notice with the Services or sending a notice to
            an e-mail address that You agree to provide). By continuing to use
            or access the Services after the revisions come into effect, You
            agree to be bound by the revised Terms.
          </Text>

          {/*-------------------- Miscellaneous --------------------*/}
          <Text style={{fontSize: 14, fontWeight: 'bold', marginTop: 20}}>
            Miscellaneous
          </Text>
          <Text style={{fontSize: 14, textAlign: 'justify'}}>
            These Terms constitute the entire agreement of the parties and
            supersede all previous written or oral agreements between the
            parties with respect to the Services. These Terms will be governed
            by the laws of the Quezon city , Phillipines not with standing any
            conflicts of laws principles. Rose Garden's failure to enforce a
            provision is not a waiver of its right to do so later. No waiver by
            either party of any breach or default hereunder shall be deemed to
            be a waiver of any preceding or subsequent breach or default. If a
            provision is found unenforceable, the remaining provisions of the
            Terms will remain in full effect. You may not assign any of Your
            rights under these Terms, and any such attempt will be void. Rose
            Garden may assign its rights to any of its affiliates or
            subsidiaries, or to any successor in interest of any business
            associated with the Services. Nothing contained in this agreement
            shall create any association, partnership, or agency or joint
            venture between Rose Garden Special Palabok and You.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default PrivacyPolicyScreen;

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
  //-------------------- Privacy Policy --------------------//
});
