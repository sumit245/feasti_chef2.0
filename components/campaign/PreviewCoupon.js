import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Text, TouchableOpacity, Alert } from "react-native";
import HeaderTwo from "../header/HeaderTwo";
import { styles } from "./campaign.styles";
import { useSelector } from "react-redux";
import Loader from "../../helpers/Loader";
import axios from "axios";
import { Checkbox, Divider } from "react-native-paper";
import moment from "moment";
import { LinearGradient } from "expo-linear-gradient";
import { DARKGRAY } from "../../Colors";
import { COUPON_URL, RESTAURANT_URL } from "../../EndPoints";
export default function PreviewCoupon({ navigation, route }) {
  const {
    type,
    plan,
    code,
    discount,
    lunch,
    dinner,
    start_date,
    end_date,
  } = route.params;
  let diff = moment(end_date).diff(moment(start_date), "days");
  diff = diff + 1;
  const restaurant = useSelector((state) => state.restaurant);
  const { promo } = restaurant;
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(true);


  const submit = async () => {
    if (promo.length !== 0) {
      alert(
        "You already have an active coupon. Either wait for expiry or cancel it manually!!!"
      );
    } else {
      setLoading(false);
      const { _id, restaurant_id, } = await restaurant;
      let discountType = type === "net" ? "$" : "%";
      let diff = moment(end_date).diff(moment(start_date), "days");
      diff = diff + 1;
      let promo = {
        restaurant_id: restaurant_id,
        category: [lunch, dinner],
        plan_name: plan + " Meals",
        promo_code: code,
        discount_type: discountType,
        start_date: start_date,
        end_date: end_date,
        discount: discount,
        duration: diff + " Days",
        isAdmin: false
      };
      const response = await axios.post(`${COUPON_URL}`, promo);
      const coupon = await response.data;
      promo.status = await coupon.data.status;

      setLoading(true);
      navigation.navigate("submit_coupon", {
        promo,
        promo_name: "promo coupon"
      });
    }
  };

  const showDelete = () => {
    Alert.alert("Are you sure?",
      "Discarding a coupon will remove all saved details",
      [
        { text: "OK", onPress: () => navigation.navigate("Growth") },
      ],
      { cancelable: true, onDismiss: () => navigation.navigate("Growth") })
  }
  useEffect(() => {
    console.log('====================================');
    console.log(promo);
    console.log('====================================');
  }, [])

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <HeaderTwo title="Preview" navigation={navigation}>
          <TouchableOpacity
            style={{ paddingHorizontal: 4 }}
            onPress={() => showDelete()}
          >
            <Text style={{ color: "#ff6600", fontWeight: "bold" }}>
              Discard
            </Text>
          </TouchableOpacity>
        </HeaderTwo>
        <View style={{ flex: 1, backgroundColor: "#FFF" }}>
          <View style={styles.card}>
            <View style={styles.cardBody}>
              <Text style={[styles.bigText, { fontSize: 18 }]}>
                {type === "net" ? "$" + discount : discount + "% "} OFF
              </Text>
            </View>

            <View style={styles.cardBody}>
              <Text
                style={[
                  styles.bigText,
                  { color: DARKGRAY, fontSize: 14, marginVertical: 10 },
                ]}
              >
                Applicable on:{" "}
                <Text style={[styles.smallText, { color: DARKGRAY }]}>{plan} Meals</Text>
              </Text>
              <Divider />
              <Text
                style={[
                  styles.bigText,
                  { color: DARKGRAY, fontSize: 14, marginVertical: 10 },
                ]}
              >
                Applicable on:{" "}
                <Text style={[styles.smallText, { color: DARKGRAY }]}>
                  {lunch} {dinner}
                </Text>
              </Text>
              <Divider />
            </View>
            <View style={styles.cardBody}>
              <Text
                style={[
                  styles.bigText,
                  { color: DARKGRAY, fontSize: 14, marginVertical: 10 },
                ]}
              >
                Valid from:
                <Text style={[styles.smallText, { color: DARKGRAY }]}>
                  {" "}
                  {start_date} to {end_date}
                </Text>
              </Text>
              <Divider />
              <Text
                style={[
                  styles.bigText,
                  { color: DARKGRAY, fontSize: 14, marginVertical: 10 },
                ]}
              >
                Valid for:
                <Text style={[styles.smallText, { color: DARKGRAY }]}> {diff} Days</Text>
              </Text>
              <Divider />
            </View>
            <View style={styles.cardBody}>
              <Text style={[styles.bigText, { color: DARKGRAY, fontSize: 14 }]}>
                PROMO CODE:{" "}
                <Text style={[styles.bigText, { color: DARKGRAY, fontSize: 16 }]}>
                  {code}
                </Text>
              </Text>
              {/* <Divider /> */}
            </View>

            <View style={styles.cardBody}>
              <View style={{ flexDirection: "row" }}>
                <Checkbox.Android
                  status={checked ? "checked" : "unchecked"}
                  onPress={() => {
                    setChecked(!checked);
                  }}
                  color="#ff6600"
                />
                <Text>
                  By clicking "CONFIRM".I undertake that I have read and
                  understood the{" "}
                  <Text
                    style={{
                      color: "#226ccf",
                      textDecorationLine: "underline",
                    }}
                    onPress={() => navigation.navigate("policies")}
                  >
                    terms and conditions
                  </Text>{" "}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.bottomButtonGroup}>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: "#FFF" }]}
            onPress={() => navigation.goBack()}
          >
            <Text style={[styles.btnText, { color: "#000" }]}>EDIT</Text>
          </TouchableOpacity>
          <LinearGradient colors={["#ff9900", "#ff6600"]} style={styles.actionButton}>
            <TouchableOpacity
              onPress={() => submit()}
              disabled={!checked}
            >
              <Text style={[styles.btnText, { color: "#FFF" }]}>Confirm</Text>
            </TouchableOpacity>
          </LinearGradient>

        </View>
      </SafeAreaView>
    );
  } else {
    return <Loader />;
  }
}
