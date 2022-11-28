import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  RefreshControl,
  Platform,
  StatusBar,
} from 'react-native';
import CalTab from '../CalTab';
import ToggleLunchDinner from '../header/ToggleLunchDinner';
import Header from '../header/Header';
import { useSelector } from 'react-redux';
import Menu from './Menu';
import Notification from '../header/Notification';
import { sendPushNotification } from '../../helpers/NotificationServices';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CHEF_HOME_URL } from '../../EndPoints';

export default function TopPage({ navigation }) {
  const restaurant = useSelector((state) => state.restaurant);
  const [meal, setMeal] = useState('');
  const [mealcount, setMealCount] = useState(0);
  const [addOn, setAddOn] = useState('');
  const [add_ons, setAddOns] = useState([]);
  const [add_on_count, setTotalAdOnCount] = useState(0);
  const [slot, setSlot] = useState('Lunch');
  const [thisDay, setDay] = useState('Today')
  const { restaurant_name, restaurant_id } = restaurant;
  const [refreshing, setRefreshing] = useState(false);
  const [type, setType] = useState('');

  const fetchMeal = async (restaurant_id, day, category) => {
    const response = await axios.get(`${CHEF_HOME_URL}${restaurant_id}/${day}/${category}`);
    const { data } = response;
    const { meal_name, count, add_ons, type } = data;
    setMeal(meal_name);
    setMealCount(count);
    setType(type);
    setAddOns(add_ons);
  };
  const fetchNotification = async () => {
    const token = await AsyncStorage.getItem('notificationToken');
    sendPushNotification(token, 'New Order', 'You have a new order');
  };
  useEffect(() => {
    let component = true;
    if (component) {
      fetchNotification();
    }
    return () => {
      component = false;
    };
  }, []);

  useEffect(() => {
    fetchMeal(restaurant_id, thisDay, slot);
  }, [slot]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchMeal(restaurant_id, 'Today', slot);
    setRefreshing(false);
  };

  const onDayChanged = (day, slot) => {
    setDay(day)
    fetchMeal(restaurant_id, day, slot);
  };
  const onSlotChanged = (e) => {
    setSlot(e)
    fetchMeal(restaurant_id, thisDay, e)
  }

  return (
    <SafeAreaView style={styles.mainPage}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#f00', '#0f0', '#00f']}
          />
        }
      >
        <Header title={restaurant_name + ', ' + restaurant_id}>
          <View style={styles.switch}>
            <ToggleLunchDinner handleToggle={(e) => onSlotChanged(e)} />
            <Notification navigation={navigation} />
          </View>
        </Header>
        <CalTab onDayChanged={(day) => onDayChanged(day, slot)} />
        <Menu
          meal_name={meal}
          type={type}
          slot={slot}
          count={mealcount}
          add_ons={add_ons}
          add_on_name={addOn}
          add_on_count={add_on_count}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainPage: {
    flex: 1,
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  switch: {
    position: 'absolute',
    right: 4,
    bottom: 2,
    color: '#dfdfdf',
    flexDirection: 'row',
    padding: 4,
    alignItems: 'center',
  },
});
