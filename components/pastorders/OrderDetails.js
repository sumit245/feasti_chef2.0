import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Header from "../header/Header";
import { styles } from "../../styles/itemstyle";
import { useSelector } from "react-redux";
import moment from "moment";
import Download from "../header/Download";
import Icon from "react-native-vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
export default function OrderDetails({ route, navigation }) {
  const { order } = route.params;
  const [address_type, setAddressType] = useState("")
  const [city, setCity] = useState("")
  const [addressLine1, setAddressLine] = useState("")
  const [postal_code, setPostalCode] = useState("")
  const [total, setTotal] = useState(0)
  useEffect(() => {
    const { address_type, city, addressLine1, postal_code } = order.address;
    setAddressType(address_type)
    setCity(city)
    setPostalCode(postal_code)
    setAddressLine(addressLine1)
  }, [order])

  useEffect(() => {
    let totalPrice = parseFloat(order.base_price).toFixed(2)
    let discount = order.promo_id !== "PROMOADMIN" && Number.isNaN(order.discount) ? 0 : parseFloat(order.discount).toFixed(2)
    let delivery_fee = Number.isNaN(order.delivery_fee) ? 0 : parseFloat(order.delivery_fee).toFixed(2)
    totalPrice = parseFloat(totalPrice) + parseFloat(delivery_fee) - parseFloat(discount)
    setTotal(totalPrice)
  }, [total])



  const restaurant = useSelector((state) => state.restaurant);
  const { restaurant_name, restaurant_id } = restaurant;

  function add(accumulator, a) {
    return parseFloat(accumulator) + parseFloat(a);
  }


  const subtotals =
    Array.isArray(order.add_on) && order.add_on.map(item => item.subtotal);
  let price = subtotals.length !== 0 ? subtotals.reduce(add, 0) : 0;

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", backgroundColor: "#fff", width: "100%", paddingHorizontal: 4, alignItems: "center" }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <LinearGradient colors={["#ff9900", "#ff6600"]} style={{
            height: 28,
            width: 28,
            marginHorizontal: 4,
            borderRadius: 14,
          }}>
            <TouchableOpacity
              style={{ alignItems: "center", justifyContent: "center" }}
              onPress={() => navigation.goBack()}
            >
              <Icon name="chevron-back" size={24} color="#ffffff" />
            </TouchableOpacity>
          </LinearGradient>
          <Header
            title={restaurant_name + ", " + restaurant_id}
          />
        </View>
        <Download />
      </View>
      {/* Header */}

      <ScrollView
        contentContainerStyle={{ justifyContent: "flex-start", flex: 1, marginTop: 8, backgroundColor: "#fff" }}
        contentInsetAdjustmentBehavior="automatic"
      >
        <View style={styles.formHeader}>
          <View style={styles.row}>
            <View style={styles.headerRows}>
              <Text style={styles.text}>Order id</Text>
              <Text style={styles.text}>Ordered on</Text>
              <Text style={styles.text}>Status</Text>
            </View>
            <View style={styles.headerRows}>
              <Text>{order.order_id}</Text>
              <Text>
                {moment(order.order_time).format("DD-MMM-YYYY HH:mm a")}
              </Text>
              <Text style={{ textTransform: "uppercase", color: order.status === "accepted" ? "#5ca85c" : order.status === "started" ? "#ffc300" : "#ff4300" }}>{order.status}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.headerRows}>
              <Text style={styles.text}>User id</Text>
              <Text style={styles.text}>Phone</Text>
            </View>
            <View style={styles.headerRows}>
              <Text>{order.user_id}</Text>
              <Text>{order.phone}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.headerRows}>
              <Text style={styles.text}>Email</Text>
              <Text>{order.email_id}</Text>
            </View>
          </View>
          {
            order.isDelivery ? (
              <View style={styles.row}>
                <View style={styles.headerRows}>
                  <Text style={styles.text}>Deliver to</Text>
                  <Text style={{ textTransform: "uppercase", textAlign: "right" }}>
                    {(address_type || "") +
                      ", " +
                      (addressLine1 || "") +
                      "\n " +
                      (city || "") +

                      ", " +
                      (postal_code || "")}
                  </Text>
                </View>
              </View>
            ) : (
              <View style={styles.row}>
                <View style={styles.headerRows}>
                  <Text style={styles.text}>Self Pickup</Text>
                  <Text style={{ textTransform: "uppercase", textAlign: "right" }}>
                    User will pickup this order
                  </Text>
                </View>
              </View>
            )
          }

          <View style={styles.row}>
            <View style={styles.headerRows}>
              <Text style={styles.text}>plan</Text>
              <Text style={styles.text}>Start Date</Text>
              <Text style={styles.text}>End Date</Text>
            </View>
            <View style={styles.headerRows}>
              <Text>{order.plan_name}</Text>
              <Text>{order.start_date}</Text>
              <Text>{order.end_date}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.headerRows}>
              <Text style={styles.text}>Price</Text>
              {order.isDelivery && <Text style={styles.text}>Deliv</Text>}
              <Text style={styles.text}>Dis</Text>
              <Text style={styles.text}>Total</Text>
            </View>
            <View style={styles.headerRows}>
              <Text>{"$" + order.base_price}</Text>
              {order.isDelivery && <Text style={styles.text}>${order.delivery_fee}</Text>}
              <Text>${order.promo_id !== "PROMOADMIN" ? order.discount : 0}</Text>
              <Text>${parseFloat(total).toFixed(2)}
              </Text>
            </View>
          </View>
        </View>

        <View style={[styles.row, { backgroundColor: "#fff" }]}>
          <Text
            style={{
              fontStyle: "italic",
              fontWeight: "bold",
              color: "#777",
              marginLeft: 4,
            }}
          >
            Notes: {order.notes}
          </Text>
        </View>

        <View style={styles.table}>
          <View style={[styles.tableHead, { justifyContent: "flex-end" }]}>
            <Text>Total: ${parseFloat(price).toFixed(2)}</Text>
          </View>
          <View style={styles.tableHead}>
            <Text style={styles.text}>Add on</Text>
            <Text style={styles.text}>Ordered on</Text>
            <Text style={styles.text}>PRICE</Text>
          </View>
          {Array.isArray(order.add_on) &&
            order.add_on.map((extra, key) => (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  borderBottomWidth: 0.5,
                  borderBottomColor: "#777",
                }}
                key={key}
              >
                <View>
                  <Text style={{ padding: 4 }}>{extra.item}</Text>
                  <Text style={{ padding: 4 }}>
                    ${parseFloat(extra.rate).toFixed(2) + " x " + extra.qty}
                  </Text>
                </View>

                <Text style={{ padding: 4 }}>{extra.order_date}</Text>
                <Text style={{ padding: 4 }}>
                  ${parseFloat(extra.subtotal).toFixed(2)}
                </Text>
              </View>
            ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
