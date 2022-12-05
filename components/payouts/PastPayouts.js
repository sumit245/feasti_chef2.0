import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import axios from "axios";
import { useSelector } from "react-redux";
import moment from "moment";
import { PAYOUTS } from "../../EndPoints";

const Item = ({ item, commission, navigation }) => {
  const [netcommission, setNetCommission] = useState(0);
  const [revenue, setRevenue] = useState(0);
  useEffect(() => {
    let tbre = parseFloat(item.totalBaseIncome) * 0.01 * parseFloat(commission);
    let tbc =
      parseFloat(item.totalAddOnRevenue) * 0.01 * parseFloat(commission);
    let amt =
      parseFloat(item.totalBaseIncome) + parseFloat(item.totalAddOnRevenue);
    let adminCommission = parseFloat(tbre) + parseFloat(tbc);
    setNetCommission(adminCommission);
    setRevenue(
      parseFloat(amt) -
      parseFloat(adminCommission) -
      parseFloat(item.totalDiscount) -
      parseFloat(item.due)
    );
  }, [commission]);
  return (
    <View style={styles.card}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 12,
        }}
      >
        <View>
          <Text style={styles.smallText}>
            {moment(item.payout_start_date).format("Do MMM").toString() +
              " - " +
              moment(item.payout_end_date).format("Do MMM").toString()}
          </Text>
          <Text style={[styles.bigText, { fontSize: 24, color: "#205000" }]}>
            $ {item.chefBalance}
          </Text>
        </View>
        <View style={{ alignItems: "flex-end" }}>

          <Text style={styles.smallText}>
            {" "}
            <Icon
              name={
                item.status === "Paid"
                  ? "checkmark-circle"
                  : "information-circle"
              }
              size={18}
              color={
                item.status === "Paid"
                  ? "green"
                  : "red"
              }
            />
            {item.status || "Unpaid"}
          </Text>
          <Text style={styles.smallText}>{moment(item.deposit_date).isValid() ? moment(item.deposit_date).format("Do MMM, hh:mm A") : ""}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={{
          alignSelf: "center",
          paddingVertical: 4,
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() =>
          navigation.navigate("commission_tracking", {
            revenue: revenue,
            orders: item.orders,
            numOrders: item.numOrders,
            totalAddOns: item.totalAddOns,
            totalOrderRevenue: item.totalBaseIncome,
            totalAddOnReveneue: item.totalAddOnRevenue,
            totalDiscount: item.totalDiscount,
            commission: commission,
            netCommission: netcommission,
            due: item.due,
            navigation: navigation,
          })
        }
      >
        <Text style={[styles.btnText, { color: "#ff6600", textAlign: "center", fontWeight: "bold", fontSize: 14, textTransform: "capitalize" }]}>
          View
        </Text>
      </TouchableOpacity>


    </View>
  );
};

export default function PastPayouts({ navigation, commission }) {
  const [payouts, setPayouts] = useState([]);
  const restaurant = useSelector((state) => state.restaurant);
  const { restaurant_id } = restaurant;
  const fetchPastPayouts = async (id) => {
    const response = await axios.get(`${PAYOUTS}${id}`);
    setPayouts(response.data);
  };
  useEffect(() => {
    fetchPastPayouts(restaurant_id);
  }, [payouts]);
  const ListEmptyContent = () => (
    <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
      <Text>No orders to display</Text>
    </View>
  );
  const renderItem = ({ item }) => {
    return (
      <Item
        item={item}
        key={item._id}
        navigation={navigation}
        commission={commission}
      />
    );
  };
  return (
    <FlatList
      contentContainerStyle={{ marginTop: 4 }}
      data={payouts}
      renderItem={renderItem}
      extraData={navigation}
      keyExtractor={(item) => item._id}
      ListEmptyComponent={ListEmptyContent}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    padding: 20,
    marginVertical: 12,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  card: {
    backgroundColor: "#fff",
    padding: 12,
    margin: 4,
    borderRadius: 8,
  },
  bigText: {
    fontWeight: "bold",
    fontSize: 16,
    marginVertical: 2,
  },
  smallText: {
    fontWeight: "bold",
    color: "#777",
    lineHeight: 20,
    fontSize: 14,
    marginVertical: 2,
  },
  btnText: {
    fontSize: 16,
    textTransform: "uppercase",
    padding: 6,
    fontWeight: "bold",
    letterSpacing: 1.1,
  },
});
