import moment from "moment";
import React, { useState, useEffect } from "react";
import { View, Text, Alert } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { DARKGRAY } from "../../Colors";
import { Button } from "react-native-paper";
import { styles } from "./campaign.styles";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import { COUPON_URL, } from "../../EndPoints";

function TrackPerfContent({
  coupon,
  total_order,
  total_base_income,
  total_net_income,
  discount,
  unique_users,
  active,
}) {

  const [cancel, setCancel] = useState(false);
  const [pulled, setPulled] = useState(false);
  let remaining = moment(coupon.end_date).diff(moment(), "Days");
  const updateCoupon = () => {
    Alert.alert("Are you sure?", "Your active coupon will be set to inactive. Inactive coupons are not visible by users", [
      {
        text: "Cancel", onPress: () => console.log("Cancelld")
      },
      { text: "Ok", onPress: () => setInactive(coupon._id) }
    ])
  };

  const setInactive = async (id) => {
    const couponresponse = await axios.put(`${COUPON_URL}${id}`, { status: "Inactive" });
    const { status } = couponresponse.data
    if (status === 200) {
      setCancel(false);
    }
  };


  const pullToView = (id) => {
    setPulled(true);
  };


  return (
    <View style={styles.bannerCard}>
      <View>
        <LinearGradient colors={["#ff9900", "#ff6600"]} >
          <View style={styles.trackHead}>
            <View>
              <Text style={[styles.bannerHeadTexts, { fontSize: 16 }]}>
                {coupon.promo_code} (
                {coupon.discount_type === "$"
                  ? "$" + coupon.discount
                  : coupon.discount + "%"}{" "}
                OFF)
              </Text>
              <Text style={styles.bannerHeadTexts}>
                {coupon.plan_name}({coupon.category})
              </Text>
              <Text style={styles.bannerHeadTexts}>
                Duration:
                {coupon.start_date + "-" + coupon.end_date}
              </Text>
              <Text style={styles.bannerHeadTexts}>ID:{coupon.promo_id}</Text>
            </View>

            <View style={[styles.progressCounter, { zIndex: 1000 }]}>
              <Text
                style={[
                  styles.bannerHeadTexts,
                  { marginTop: 32, marginBottom: 4 },
                ]}
              >
                {coupon.duration}
              </Text>

            </View>
          </View>
        </LinearGradient>
        <View style={{ position: "absolute", top: 60, right: 8 }}>
          <View style={styles.progressDonught}>
            <Text style={{ fontWeight: "bold", fontSize: 14, color: "#ff6600" }}>
              {remaining > 0 ? parseInt(remaining) + 1 : 0}
            </Text>
          </View>
          <Text style={styles.smallText}>Days Left</Text>
        </View>


      </View>
      {/* bannercard top area */}

      {!active && (
        <View style={{ alignItems: "flex-start", marginVertical: 16 }}>
          <Button
            mode="text"
            style={{ backgroundColor: "#fff" }}
            color="#22ccff"
            onPress={() => pullToView(coupon._id)}
          >
            View
          </Button>
        </View>
      )}

      {active || pulled ? (
        <View>
          <View style={{ alignItems: "flex-start", marginTop: 16 }}>
            {!pulled ? (
              <Button
                mode="text"
                style={{ backgroundColor: "#fff" }}
                color="#f00"
                onPress={() => updateCoupon()}
              >
                CANCEL
              </Button>
            ) : (
              <Button
                mode="text"
                style={{ backgroundColor: "#fff" }}
                color="#f00"
                onPress={() => setPulled(false)}
              >
                Close
              </Button>
            )}
          </View>

          <View style={styles.bannerRow}>
            <Icon name="cart-outline" size={24} color={DARKGRAY} />
            <View style={{ marginLeft: 8 }}>
              <Text style={styles.bigText}>{total_order}</Text>
              <Text style={[styles.smallText, { color: DARKGRAY }]}> Total Orders</Text>
            </View>
          </View>

          <View style={styles.bannerRow}>
            <Icon name="cash-outline" size={24} color={DARKGRAY} />
            <View style={{ marginLeft: 8 }}>
              <Text style={styles.bigText}> ${parseFloat(total_net_income).toFixed(2)}</Text>
              <Text style={[styles.smallText, { color: DARKGRAY }]}> Total Net Income</Text>
            </View>
          </View>


          <View style={styles.bannerRow}>
            <Icon name="cash-outline" size={24} color={DARKGRAY} />
            <View style={{ marginLeft: 8 }}>
              <Text style={styles.bigText}> ${parseFloat(total_base_income).toFixed(2)}</Text>
              <Text style={[styles.smallText, { color: DARKGRAY }]}> Total Base Income</Text>
            </View>
          </View>

          <View style={styles.bannerRow}>
            <Icon name="analytics-outline" size={24} color={DARKGRAY} />
            <View style={{ marginLeft: 8 }}>
              <Text style={styles.bigText}> ${parseFloat(discount).toFixed(2)}</Text>
              <Text style={[styles.smallText, { color: DARKGRAY }]}> Total Discount Paid</Text>
            </View>
          </View>

          <View style={[styles.bannerRow, { borderBottomWidth: 0 }]}>
            <Icon name="person-outline" size={24} color={DARKGRAY} />
            <View style={{ marginLeft: 8 }}>
              <Text style={styles.bigText}>
                {unique_users}
              </Text>
              <Text style={[styles.smallText, { color: DARKGRAY }]}> Total Users</Text>
            </View>
          </View>
        </View>
      ) : null}

    </View>
  );

}
export default React.memo(TrackPerfContent);
