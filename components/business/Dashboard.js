import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  useWindowDimensions,
  ScrollView,
  RefreshControl,
  Platform,
  StatusBar,
} from 'react-native';
import Header from '../header/Header';
import { useSelector } from 'react-redux';
import { WHITE } from '../../Colors';
import { styles } from '../campaign/campaign.styles';
import Ants from 'react-native-vector-icons/FontAwesome5';
import StatCards from './StatCards';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import { BASE_URL, DASHBOARD_URL, GET_DISPATCH_ORDER, GET_USER_BY_TYPES, ORDERS } from '../../EndPoints';

export default function Dashboard({ navigation }) {
  const restaurant = useSelector((state) => state.restaurant);
  const { restaurant_name, city, restaurant_id } = restaurant;
  const [revenue, setRevenue] = useState([])
  const [totalSales, setTotalSales] = useState(0)
  const [totalOrders, setTotalOrders] = useState(0)
  const [activecount, setActiveCount] = useState(0);
  const [completecount, setCompleteCount] = useState(0);
  const [cancelledcount, setCancelledCount] = useState(0);
  const [notstarted, setNotStarted] = useState(0);
  const [rejected, setRejected] = useState(0);
  const [menuvisits, setMenuVisit] = useState(0);
  const [commission, setCommission] = useState('');
  const [cartconversion, setCartConversion] = useState(0);
  const [visits, setvisits] = useState(0);
  const [acceptanceRate, setAcceptanceRate] = useState(0);
  const [rejectedRate, setRejectedRate] = useState(0);
  const [totalAddOnRevenue, setTotalAddOnRevenue] = useState(0);
  const [totalAddOns, setTotalAddOns] = useState(0);
  const [campaignDue, setCampaignDue] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  const [newUser, setnewUser] = useState(0);
  const [repeatedUser, setrepeatedUser] = useState(0);

  const fetchCommission = async () => {
    const resp = await axios.get(`${BASE_URL}/api/checkout`);
    const { commission } = resp.data.data[0];
    if (commission !== null) {
      setCommission(commission);
    }
  };


  const getuserByType = async (restaurant) => {
    const response = await axios.get(`${GET_USER_BY_TYPES}${restaurant}`);
    const { newusers, repeatedUsers } = response.data;
    if (newusers !== null && repeatedUsers !== null) {
      setnewUser(newusers);
      setrepeatedUser(repeatedUsers);
    }
  };

  const fetchRevenue = async (id) => {
    const response = await axios.get(`${DASHBOARD_URL}${id}`)
    const {
      totalSales,
      allRevenue,
      totalorders,
      acceptedCount,
      startedCount,
      completedCount,
      cancelledCount,
      rejectedCount,
      acceptanceRate,
      rejectanceRate } = response.data
    setTotalSales(totalSales)
    setRevenue(allRevenue)
    setTotalOrders(totalorders)
    setAcceptanceRate(acceptanceRate)
    setActiveCount(startedCount)
    setCompleteCount(completedCount)
    setNotStarted(acceptedCount)
    setCancelledCount(cancelledCount)
    setRejected(rejectedCount)
    setRejectedRate(rejectanceRate)

  }


  useEffect(() => {
    fetchCommission();
    getuserByType(restaurant_name);
    fetchRevenue(restaurant_id)
  }, [
    restaurant_name,
    restaurant_id,
    acceptanceRate,
    rejectedRate,
    activecount,
    commission,
    completecount,
  ]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchCommission();
    getuserByType(restaurant_name);
    fetchRevenue(restaurant_id)
    setRefreshing(false);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      }}
    >
      <Header title={restaurant_name + ', ' + city} />
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#f00', '#0f0', '#00f']}
          />
        }
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 8,
            backgroundColor: '#fff',
            marginTop: 8,
          }}
        >
          <View style={{ alignItems: 'center' }}>
            <LinearGradient
              colors={['#ff9900', '#ff6600']}
              style={{
                height: 60,
                width: 60,
                borderRadius: 15,
                backgroundColor: '#226ccf',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <TouchableOpacity
                onPress={() => navigation.navigate('review_order')}
              >
                <Ants name="star" size={34} color="#FFF" />
              </TouchableOpacity>
            </LinearGradient>
            <Text style={styles.smallText}>Customer Rating</Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <LinearGradient
              colors={['#ff9900', '#ff6600']}
              style={{
                height: 60,
                width: 60,
                borderRadius: 15,
                backgroundColor: '#226ccfcc',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('payouts', {
                    commission: commission,
                    totalAddOns: totalAddOns,
                    totalAddOnRevenue: totalAddOnRevenue,
                  })
                }
              >
                <Ants name="wallet" size={28} color="#fff" />
              </TouchableOpacity>
            </LinearGradient>
            <Text style={styles.smallText}>Payouts & Finance</Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <LinearGradient
              colors={['#ff9900', '#ff6600']}
              style={{
                height: 60,
                width: 60,
                borderRadius: 15,
                backgroundColor: '#226ccf',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <TouchableOpacity onPress={() => navigation.navigate('myOrders')}>
                <Ants name="history" size={28} color="#fff" />
              </TouchableOpacity>
            </LinearGradient>
            <Text style={styles.smallText}>Past Orders</Text>
          </View>
        </View>

        <View style={{ marginHorizontal: 4, padding: 4, marginVertical: 4 }}>
          <Text style={{ color: '#000', fontWeight: 'bold' }}>
            Business Overview
          </Text>
          <Text style={{ color: '#000', fontSize: 12 }}>
            Aggregated view of your business across all orders{' '}
          </Text>
        </View>

        <View style={{ height: 10 }} />
        <StatCards
          totalSales={totalSales}
          revenue={revenue}
          totalOrders={totalOrders}
          active={activecount}
          complete={completecount}
          cancel={cancelledcount}
          notstarted={notstarted}
          menuvisits={menuvisits}
          commission={commission}
          rejected={rejected}
          newUser={newUser}
          repeatedUser={repeatedUser}
          cartconversion={cartconversion}
          visits={visits}
          campaignDue={campaignDue}
          addOnCounts={totalAddOns}
          addOnRevenue={totalAddOnRevenue}
        />

        <View
          style={{
            backgroundColor: WHITE,
            marginVertical: 4,
            borderRadius: 4,
            marginHorizontal: 2,
            padding: 2,
          }}
        >
          <Text
            style={{
              textTransform: 'uppercase',
              fontWeight: 'bold',
              fontSize: 16,
              padding: 6,
            }}
          >
            Performance this month
          </Text>
          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              justifyContent: 'space-between',
              backgroundColor: WHITE,
              padding: 2,
            }}
          >
            <View style={{ backgroundColor: '#fff', paddingHorizontal: 20 }}>
              <Text
                style={{
                  textTransform: 'uppercase',
                  fontWeight: 'bold',
                  fontSize: 22,
                  textAlign: 'center',
                }}
              >
                {parseFloat(acceptanceRate).toFixed(2) || 0}%
              </Text>
              <Text style={{ fontWeight: 'bold', fontSize: 14 }}>
                accept rate
              </Text>
            </View>
            <View style={{ backgroundColor: '#fff', paddingHorizontal: 20 }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 22,
                  textAlign: 'center',
                }}
              >
                {parseFloat(rejectedRate).toFixed(2) || 0}%
              </Text>
              <Text style={{ fontWeight: 'bold', fontSize: 14 }}>
                reject rate
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
