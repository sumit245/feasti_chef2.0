import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { DARKGRAY, WHITE } from '../../Colors';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import Collapsible from 'react-native-collapsible';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import { width } from '../../Dimens';
import { GET_SLOTS } from '../../EndPoints';

export default function Menu({
  meal_name,
  type,
  slot,
  count,
  add_ons,
  add_on_count,
}) {
  const restaurant = useSelector((state) => state.restaurant);

  const [lunch, setlunch] = useState('');
  const [dinner, setDinner] = useState('');

  const fetchSlotTime = async () => {
    const slots = await axios.get(`${GET_SLOTS}`);
    const { lunchSlots, dinnerSlots } = await slots.data[0];
    let first = lunchSlots[0];
    let startlunch = first.slot_time;
    startlunch = startlunch.split('-')[0];
    let last = lunchSlots[lunchSlots.length - 1];
    let endlunch = last.slot_time;
    endlunch = endlunch.split('-')[1];
    let completelunchSlot = startlunch + '-' + endlunch;
    setlunch(completelunchSlot);
    let firstdinner = dinnerSlots[0];
    let startdinner = firstdinner.slot_time;
    startdinner = startdinner.split('-')[0];
    let laslastdinnert = dinnerSlots[dinnerSlots.length - 1];
    let enddinner = laslastdinnert.slot_time;
    enddinner = enddinner.split('-')[1];
    let completedinnerSlot = startdinner + '-' + enddinner;
    setDinner(completedinnerSlot);
  };

  useEffect(() => {
    fetchSlotTime();
  }, []);

  const [isCollapse, setCollapse] = useState(true);

  const RenderAddon = ({ add_on }) => {
    return (
      <View style={{ backgroundColor: WHITE, padding: 6 }}>
        {add_on &&
          add_on.map((add_on, key) => (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginHorizontal: 6,
                marginVertical: 4,
                borderTopColor: '#777',
                borderTopWidth: 0.2,
              }}
              key={key}
            >
              <Text style={styles.mealTitle}>{add_on}</Text>
              <Text style={styles.mealTitle}>
                X 0
              </Text>
            </View>
          ))}
      </View>
    );
  };

  const RenderHeader = ({ title }) => {
    return (
      <View
        style={{ flexDirection: 'row', padding: 4, backgroundColor: WHITE }}
      >
        <Text style={styles.headerMenuTitle}>
          {title} <Text style={{ fontWeight: 'normal', fontSize: 12 }}>All Slots</Text>{' '}
        </Text>
      </View>
    );
  };

  const RenderContent = ({ meal_name, type, count }) => (
    <View
      style={{
        backgroundColor: WHITE,
        padding: 6,
        marginBottom: 8,
        height: 80,
        borderBottomWidth: 0.5,
        borderBottomColor: '#777',
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: 6,
          marginVertical: 4,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 4,
            maxWidth: (3 * width) / 4,
          }}
        >
          <Icon
            name="md-stop-circle-outline"
            size={16}
            color={type === "veg" ? "green" : "red"}
          />
          <Text style={styles.mealTitle}>{meal_name}</Text>
        </View>
        <Text style={{ fontWeight: 'bold' }}>
          X {count}
        </Text>
      </View>
    </View>
  );

  return (
    <View>
      <LinearGradient colors={['#ff9900', '#ff6600']} style={styles.headerMenu}>
        <View>
          <Text style={styles.headerText}>{slot}</Text>
          <Text style={[styles.headerText, { fontSize: 14, textTransform: 'none' }]}>
            {slot === 'Lunch' ? lunch : dinner}
          </Text>
        </View>
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center' }}
          onPress={() => setCollapse(!isCollapse)}
        >
          <View>
            <Text style={styles.headerCount}>
              {count} Meals
            </Text>
            <Text style={styles.headerCount}>
              {0} Add ons
            </Text>
          </View>
          <Icon
            name={isCollapse ? 'chevron-up-sharp' : 'chevron-down-sharp'}
            size={22}
            color={WHITE}
          />
        </TouchableOpacity>
      </LinearGradient>
      <Collapsible collapsed={isCollapse}>
        <RenderHeader title={'Meals'} />
        <RenderContent meal_name={meal_name} type={type} count={count} />
        <RenderHeader title={'Add ons'} count={3} />
        <RenderAddon add_on={add_ons} />
      </Collapsible>
    </View>
  );
}
const styles = StyleSheet.create({
  menu: {
    marginHorizontal: 2,
    marginVertical: 4,
  },
  mealTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    padding: 4,
  },
  mealDescription: {
    fontWeight: 'bold',
    fontSize: 14,
    paddingHorizontal: 4,
    color: DARKGRAY,
  },
  headerMenu: {
    padding: 6,
    marginTop: -8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: WHITE,
    textTransform: 'uppercase',
  },
  headerCount: {
    fontSize: 14,
    color: WHITE,
    fontWeight: 'bold',
  },
  headerMenuTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    padding: 2,
  },
});
