import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import { useSelector } from 'react-redux';
import HeaderTwo from '../header/HeaderTwo';
import { styles } from './campaign.styles';
import axios from 'axios';
import Loader from '../../helpers/Loader';
import ListExpireBanners from './ListExpireBanners';
import { DASHBOARD_URL, PROMO_URL } from '../../EndPoints';

export default function TrackCampaign({ route, navigation }) {
  const restaurant = useSelector((state) => state.restaurant);
  const [banner, setBanner] = useState([]);
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
    const { data } = response;
    setBanner(data);
    setLoaded(true);
  };


  useEffect(() => {
    fetchMyBanner(restaurant_id, "active");
  }, [restaurant_id, index]);

  const fetchData = () => {
    if (index == 0) {
      setIndex(1);
      setPos(1);
      fetchMyBanner(restaurant_id, 'active');
    } else {
      setIndex(0);
      setPos(0);
      fetchMyBanner(restaurant_id, 'Inactive');
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
            index={index}
            loaded={loaded}
            restaurant={restaurant_name}
            address={address}
            banners={banner}
            title={title}
            orders={orders}
            revenue={revenue}
            discount={discount}
            users={users}
          />
        );

      case 'second':
        return (
          <ListExpireBanners
            index={index}
            loaded={loaded}
            restaurant={restaurant_name}
            address={address}
            banners={banner}
            title={title}
            discount={discount}
            orders={orders}
            revenue={revenue}
            users={users}
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
