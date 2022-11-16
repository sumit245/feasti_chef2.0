import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { styles } from "./account.styles";

export default function DeleteRow({ navigation }) {
  return (
    <>
      <TouchableOpacity
        style={styles.row}
        onPress={() => navigation.navigate("delete")}
      >
        <View>
          <Text style={{ fontSize: 18, color: "#ff0000", margin: 8, paddingVertical: 2 }}>
            <Icon name="trash-outline" color="#ff0000" size={24} style={{ paddingVertical: 2 }} />  Delete Account
          </Text>
        </View>
      </TouchableOpacity>
    </>
  );
}
