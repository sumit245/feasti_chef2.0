import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Platform,
  StatusBar,
} from 'react-native';
import Profile from '../components/account/profile.component';
import BankAccount from '../components/account/bankaccount.component';
import ContactUs from '../components/account/contact.component';
import Plans from '../components/account/plan.component';
import Logout from '../components/account/logout.component';
import Addmeals from '../components/account/Addmeals';
import Skipped from '../components/account/skipped.component';
import AddDocument from '../components/account/adddocument.component';
import NotificationRow from '../components/account/NotificationRow';
import DeleteRow from '../components/account/delete.component';

export default function AccountSettings({ navigation }) {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      }}
    >
      <ScrollView
        contentContainerStyle={{
          backgroundColor: '#fff',
          flexGrow: 1,
          justifyContent: 'space-between',
        }}
      >
        <View>
          <Profile />
          <BankAccount navigation={navigation} />
          <Plans />
          <Addmeals navigation={navigation} />
          <AddDocument navigation={navigation} />
          <Skipped navigation={navigation} />
          <NotificationRow navigation={navigation} />
          <ContactUs navigation={navigation} />
          <DeleteRow navigation={navigation}/>
        </View>

        <Logout navigation={navigation} />
      </ScrollView>
    </SafeAreaView>
  );
}
