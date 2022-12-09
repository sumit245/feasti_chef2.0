import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import { useSelector } from 'react-redux';
import HeaderTwo from '../header/HeaderTwo';
import { styles } from './campaign.styles';
import axios from 'axios';
import ListExpired from './ListExpired';
import { Provider } from 'react-native-paper';
import { GET_COUPON_CHEF } from '../../EndPoints';

export default function TrackPerformance({ route, navigation }) {
  const restaurant = useSelector((state) => state.restaurant);
  const [coupon, setCoupon] = useState({});
  const [pos, setPos] = useState(0);
  const [totalOrders, setPromotedOrders] = useState(0);
  const [totalBaseIncome, setTotalBaseIncome] = useState(0)
  const [totalNetIncome, setTotalNetIncome] = useState(0)
  const [discount, setDiscount] = useState(0);
  const [loaded, setloaded] = useState(false);
  const [unique, setUnique] = useState(0);
  const { restaurant_name, city, locality, state, restaurant_id } = restaurant;
  let address = locality + ', ' + city + ', ' + state;

  const fetchMyCoupon = async (restaurant, pos) => {
    if (pos == 0) {
      const response = await axios.get(`${GET_COUPON_CHEF}${restaurant}/Active`);
      const { coupons, total_order, total_net_income, total_base_income, discount, unique_users } = response.data;
      setPromotedOrders(total_order);
      setCoupon(coupons);
      setTotalBaseIncome(total_base_income)
      setTotalNetIncome(total_net_income)
      setDiscount(discount);
      setUnique(unique_users);
      setloaded(true);
    } else {
      const response = await axios.get(`${GET_COUPON_CHEF}${restaurant}/Inactive`);
      const { coupons, total_order, total_net_income, total_base_income, discount, unique_users } = response.data;
      setPromotedOrders(total_order);
      setCoupon(coupons);
      setTotalBaseIncome(total_base_income)
      setTotalNetIncome(total_net_income)
      setDiscount(discount);
      setUnique(unique_users);
      setloaded(true);
    }
  };

  useEffect(() => {
    fetchMyCoupon(restaurant_id, pos);
  }, [pos]);

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Active' },
    { key: 'second', title: 'Inactive' },
  ]);

  const fetchData = () => {
    if (index == 0) {
      setIndex(1);
      setPos(1);
    } else {
      setIndex(0);
      setPos(0);
    }
  };

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      style={{
        backgroundColor: 'transparent',
        marginVertical: 0,
        paddingVertical: 0
      }}
      activeColor="#ff6600"
      labelStyle={{ fontWeight: 'bold' }}
      inactiveColor="#272727"
      indicatorStyle={{ backgroundColor: '#ff9900', marginHorizontal: 12 }}
    />
  );

  const renderScene = ({ route, index }) => {
    switch (route.key) {
      case 'first':
        return (
          <ListExpired
            restaurant={restaurant_name}
            address={address}
            active={true}
            coupons={coupon}
            total_base_income={totalBaseIncome}
            total_net_income={totalNetIncome}
            discount={discount}
            unique_users={unique}
            total_order={totalOrders}
          />
        );

      case 'second':
        return (
          <ListExpired
            restaurant={restaurant_name}
            address={address}
            active={false}
            coupons={coupon}
            total_base_income={totalBaseIncome}
            total_net_income={totalNetIncome}
            discount={discount}
            unique_users={unique}
            total_order={totalOrders}
          />
        );

      default:
        break;
    }
  };

  if (loaded) {
    return (
      <Provider>
        <SafeAreaView style={styles.container}>
          <HeaderTwo title="History" navigation={navigation}></HeaderTwo>
          <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={fetchData}
            renderTabBar={renderTabBar}
          />
        </SafeAreaView>
      </Provider>
    );
  } else {
    return null;
  }
}
