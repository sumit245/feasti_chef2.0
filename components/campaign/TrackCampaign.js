import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import { useSelector } from 'react-redux';
import HeaderTwo from '../header/HeaderTwo';
import { styles } from './campaign.styles';
import axios from 'axios';
import Loader from '../../helpers/Loader';
import ListExpireBanners from './ListExpireBanners';
import { PROMO_URL } from '../../EndPoints';

export default function TrackCampaign({ route, navigation }) {
  const restaurant = useSelector((state) => state.restaurant);
  const [banner, setBanner] = useState([]);
  const [totalOrders, setTotalOrders] = useState(0)
  const [totalBaseIncome, setTotalBaseIncome] = useState(0)
  const [totalNetIncome, setTotalNetIncome] = useState(0)
  const [loaded, setLoaded] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [orders, setOrder] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [users, setUsers] = useState(0);
  const [pos, setPos] = useState(0);
  const { restaurant_name, city, locality, state, restaurant_id } = restaurant;

  const { title } = route.params;
  let address = locality + ', ' + city + ', ' + state;

  const fetchMyBanner = async (restaurant_id, status) => {
    const response = await axios.get(`${PROMO_URL}${restaurant_id}/${status}`);
    const { coupons, total_order, total_net_income, total_base_income, discount, unique_users } = response.data;
    setBanner(coupons);
    setTotalOrders(total_order)
    setTotalBaseIncome(total_base_income)
    setTotalNetIncome(total_net_income)
    setDiscount(discount)
    setUsers(unique_users)
    setLoaded(true);
  };


  useEffect(() => {
    fetchMyBanner(restaurant_id, "active");
  }, [restaurant_id, index]);

  const fetchData = () => {
    if (index == 0) {
      setIndex(1);
      setPos(1);
      fetchMyBanner(restaurant_id, 'Inactive');
    } else {
      setIndex(0);
      setPos(0);
      fetchMyBanner(restaurant_id, 'active');

    }
  };
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'active' },
    { key: 'second', title: 'inactive' },
  ]);

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      style={{
        backgroundColor: 'transparent',
        marginVertical: 0,
      }}
      activeColor="#ff6600"
      labelStyle={{ fontWeight: 'bold' }}
      inactiveColor="#272727"
      indicatorStyle={{ backgroundColor: '#ff9900', marginHorizontal: 12 }}
    />
  );

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'first':
        return (
          <ListExpireBanners
            banners={banner}
            loaded={loaded}
            restaurant={restaurant_name}
            address={address}
            title={title}
            users={users}
            index={index}
            totalOrders={totalOrders}
            totalBaseIncome={totalBaseIncome}
            totalDiscount={discount}
            totalNetIncome={totalNetIncome}
          />
        );

      case 'second':
        return (
          <ListExpireBanners
            banners={banner}
            loaded={loaded}
            restaurant={restaurant_name}
            address={address}
            title={title}
            users={users}
            index={index}
            totalOrders={totalOrders}
            totalBaseIncome={totalBaseIncome}
            totalDiscount={discount}
            totalNetIncome={totalNetIncome}
          />
        );

      default:
        break;
    }
  };

  if (loaded) {
    return (
      <SafeAreaView style={styles.container}>
        <HeaderTwo title="History" navigation={navigation}></HeaderTwo>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={fetchData}
          renderTabBar={renderTabBar}
        />
      </SafeAreaView>
    );
  } else {
    return <Loader />;
  }
}
