import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Collapsible from "react-native-collapsible";
import Icon from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useSelector, useDispatch } from "react-redux";
import { styles } from "./account.styles";
import { editBankInfo } from "../../actions/actions";
import ToggleLunchDinner from "../header/ToggleLunchDinner";

export default function Plans() {
  const profile = useSelector((state) => state.restaurant);

  const [isCollapsed, setIsCollapsed] = useState(true);
  const [editable, setEditable] = useState(false);
  const [slot, setSlot] = useState("Lunch")
  const [loaded, setLoaded] = useState(false)


  const [plans, setPlans] = useState([])

  const { _id } = profile;

  const dispatch = useDispatch()



  const editHandler = () => {
    setEditable(!editable);
    if (editable) {
      let restaurant = {
        base_2price: twoPlan,
        base_15price: fifteenPlan,
        base_30price: thirtyPlan
      }
      dispatch(editBankInfo(_id, restaurant))

    }
  };

  useEffect(() => {
    let componentMounted = true
    if (componentMounted) {
      setLoaded(false)
      let { price_plans } = profile
      const { plans } = price_plans.filter((price) => price.category === slot)
      console.log('====================================');
      console.log(plans);
      console.log('====================================');
      setPlans(plans)
      setLoaded(true)
    }
  }, [profile, plans])

  return (
    <>
      <View style={styles.row}>
        <Text style={{ fontSize: 18, color: "#444", margin: 8, paddingVertical: 2 }}>
          <Icon name="calendar-sharp" color="#444" size={24} />  Subscription Plan
        </Text>

        <TouchableOpacity
          onPress={() => setIsCollapsed(!isCollapsed)}
          style={styles.collapsibleButton}
        >
          <Icon
            name={isCollapsed ? "chevron-down-sharp" : "chevron-up-sharp"}
            color="#ff6600"
            size={30}
          />
        </TouchableOpacity>
      </View>
      <Collapsible collapsed={isCollapsed}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <ToggleLunchDinner handleToggle={(value) => setSlot(value)} />
          <TouchableOpacity
            style={{ alignSelf: "flex-end" }}
            onPress={editHandler}
          >
            <FontAwesome name={editable ? "save" : "pencil"} size={20} color={editable ? "#ff6600" : "#000"} />
          </TouchableOpacity>
          {/* {loaded &&
            plans.map((plan, index) => (
              <View key={index}>
                <View style={styles.labelContainer}>
                  <Text style={styles.label}>{plan.plan_name}</Text>
                </View>
                <View style={styles.planContainer}>
                  <Icon name="ios-logo-usd" size={16} color="#000" />
                  <TextInput
                    value={plan.base_price}
                    editable={editable}
                    selectionColor="#ff6600"
                    style={[styles.inputContainer, { marginHorizontal: 0, marginVertical: 0, flex: 1 }]}
                    // onChangeText={(e) => setTwoPlan(e)}
                    keyboardType="numeric"
                  />
                </View>
              </View>
            ))
          } */}
        </KeyboardAvoidingView>
      </Collapsible>
    </>
  );
}
