import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Divider } from "react-native-paper";
import {
  DARKGRAY,
  WHITE,
} from "../../Colors";
import Icon from "react-native-vector-icons/Ionicons";
import Percentage from "react-native-vector-icons/Fontisto";

export default function PromoCard({
  title,
  icon,
  head,
  subhead,
  content,
  cancel,
  ok,
  okHandler,
  cancelHandler,
}) {
  return (
    <View style={styles.promocontainer}>
      <Text style={styles.promotitle}>{title}</Text>
      <View style={styles.promocard}>
        <View
          style={{ flexDirection: "row", padding: 16, alignItems: "center" }}
        >
          {icon === "shopping-sale" ? (
            <Percentage name="shopping-sale" size={30} color="#ff6600" />
          ) : (
            <Icon name={icon} size={30} color="#ff6600" />
          )}
          <View style={{ marginLeft: 8, marginBottom: 12, flexShrink: 1 }}>
            <Text style={{ fontWeight: "bold", fontSize: 16, padding: 2 }}>
              {head}
            </Text>
            <View style={styles.actionContainer}>
              <Text style={styles.subheadText}>{subhead} days</Text>
              {content && <Text style={styles.rateText}> ${content} /click</Text>}
            </View>
          </View>
        </View>
        <Divider />
        <View style={styles.actionContainer}>
          {cancel ? (
            <TouchableOpacity style={styles.cancelButton}>
              <Text
                style={[styles.promoaction, { color: "#000" }]}
                onPress={cancelHandler}>
                {cancel}
              </Text>
            </TouchableOpacity>
          ) : (
            <View />
          )}

          <Text style={styles.promoaction} onPress={okHandler}>{ok}</Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  promocontainer: {
    marginTop: 12,
  },
  promotitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
    textAlign: "left",
    marginHorizontal: 4,
    marginVertical: 10,
  },
  promocard: {
    backgroundColor: WHITE,
    borderRadius: 4,
    elevation: 1,
    padding: 8,
    marginHorizontal: 4,
  },
  promoaction: {
    textAlign: "right",
    color: "#000",
    fontWeight: "bold",
    padding: 4,
  },
  cancelButton: {
    borderRightWidth: 0.5,
    borderRightColor: "#777",
    paddingHorizontal: 10,
    marginVertical: 4,
    height: 24,
  },
  actionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rateText: {
    fontWeight: "bold",
    color: "#ff6600",
    fontSize: 12,
    textAlign: "right",
    marginLeft: "50%",
  },
  subheadText: {
    fontWeight: "bold",
    color: DARKGRAY,
    fontSize: 12,
    marginLeft: 4,
  }
});
