import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert
} from "react-native";
import { width } from "../../Dimens";
import { DARKGRAY } from "../../Colors";
import Icon from "react-native-vector-icons/Ionicons";
import { IconButton, Provider } from "react-native-paper";
import { useSelector } from "react-redux";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient"
import * as MailComposer from "expo-mail-composer"


export default function DeleteAccount({ navigation }) {
  const [info, setInfo] = useState({
    receipient: "support@feasti.com",
    subject: "Delete Account Permanently",
    restaurant_name: "",
    restaurant_id: "",
    email: "",
    phone: "",
    body: "",
    _id:""
  });
  const restaurant = useSelector((state) => state.restaurant);

  useEffect(() => {
    setInfo({ ...info, ...restaurant });
  }, []);

  const sendEmail = async () => {
    // const mail = {
    //   sender: info.email,
    //   receipient: info.receipient,
    //   subject: info.subject,
    //   body: info.body,
    //   id: info.restaurant_id,
    //   restaurant_name: info.restaurant_name,
    //   sender_name: info.owner_name,
    //   phone: info.phone,
    //   label: "restaurant",
    // };
/*     MailComposer.composeAsync({
      subject: info.subject,
      recipients: ["support@feasti.com"],
      body: info.body
    })
 */
    // const response = await axios.post(
    //   "http://54.146.133.108:5000/api/contacts/",
    //   mail
    // );
    // const { status } = await response.data;
    // if (status === 200) {
      const res=await axios.put("http://54.146.133.108:5000/api/newrest/"+info._id,{status:"unapproved"})
        Alert.alert(
          "Request placed!!!",
          "Your message has been sent to the admin. They will contact you soon!!",
          [
            { text: "OK", onPress: () => navigation.replace('Login') }
          ])
      
  };

  const deleteMsg = () => {
    Alert.alert(
      "Are you Sure?",
      "Your account will be deleted permanently once the running orders and campaign are completed(if any). This can take upto 30 days for complete closing.",
      [{
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      { text: "Delete", onPress: () => sendEmail() }
      ])
  };



  return (
    <Provider>
      <SafeAreaView style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 8,
            elevation: 1,
          }}
        >
          <View style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
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
            <Text style={{ fontWeight: 'bold' }}>Delete your Account</Text>
          </View>
          {/* buttons */}
        </View>

        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.card}>
            <View style={{ marginVertical: 4,marginHorizontal:16 }}>

              <Text style={styles.label}>Sad to see you go!!!</Text>
              <Text style={{textAlign:"justify",lineHeight:16,marginVertical:4}}>This will make your account permanently unusable. You cannot get more interesting orders from customers near you from Feasti. Your dashboard and payouts will be inaccessible.</Text>

              <Text style={[styles.label,{marginVertical:4}]}>Any Trouble? Just change your mind.</Text>
              <Text  style={{textAlign:"justify",lineHeight:16,marginVertical:4}}>1. Not Getting enough orders? <Text style={{color:"#ff6600",textDecorationLine:"underline"}} onPress={()=>navigation.navigate('Growth')} >Promote yourself</Text> </Text>
              <Text  style={{textAlign:"left",lineHeight:16,marginVertical:4}}>2. Payouts and finance related Issues? Write to us at <Text style={{color:"#ff6600",textDecorationLine:"underline"}}  >support@feasti.com</Text> </Text>
              <Text  style={{textAlign:"justify",lineHeight:16,marginVertical:4}}>3. Any other issue? <Text style={{color:"#ff6600",textDecorationLine:"underline"}} onPress={()=>navigation.navigate('contacts')} >Contact us</Text> </Text>
            </View>
            {/* From */}


            <View style={{ marginVertical: 4 }}>
              <View style={styles.labelContainer}>
                <Text style={styles.label}>Why leave us? </Text>
              </View>
              <TextInput
                value={info.body}
                placeholder="Explain briefly the reason to delete your account with us in 250 words"
                placeholderTextColor="#777"
                selectionColor="#ff6600"
                multiline

                textAlignVertical="top"
                style={[
                  styles.inputContainer,
                  {
                    textAlignVertical: "bottom",
                    borderColor: "#777",
                    borderWidth: 0.5,
                    borderRadius: 2,
                    height: 350,
                    padding: 4,
                  },
                ]}
                numberOfLines={10}
                onChangeText={(text) => setInfo({ ...info, body: text })}
              />
            </View>
            {/* Body */}
          </View>
          <View style={{ flexDirection: "row", marginHorizontal: 16, marginVertical: 12, justifyContent: "space-between" }}>
            <TouchableOpacity onPress={()=>navigation.goBack()} style={{ alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderRadius: 8, width: width / 2.4, padding: 4 }}><Text style={{ fontSize: 20, fontWeight: 'bold' }} >Change mind</Text></TouchableOpacity>
            <TouchableOpacity onPress={()=>deleteMsg()} style={{ alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderRadius: 8, width: width / 2.4, padding: 4, borderColor: '#ff0000', backgroundColor: '#ff0000' }} ><Text style={{ fontSize: 20, fontWeight: 'bold', color: "#fff" }}>Delete Anyway</Text></TouchableOpacity>
          </View>

        </ScrollView>
      </SafeAreaView>

    </Provider>
  );
}
const styles = StyleSheet.create({
  card: {
    marginHorizontal: 4,
    borderColor: "#777",
    borderWidth: 0.2,
    marginVertical: 2,
    padding: 4,
    borderRadius: 4,
    backgroundColor: "#fff",
  },
  row: {
    width: "98%",
    marginHorizontal: "1%",
    borderBottomWidth: 0.5,
    flexDirection: "row",
    borderBottomColor: "#ccc",
    backgroundColor: "#FFF",
    padding: 2,
    justifyContent: "space-between",
  },
  restaurant: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  detailsContainer: {
    borderRadius: 5,
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: 4,
  },
  headerImage: {
    width: width - 0.01 * width,
    height: 0.5 * width,
    margin: "0.5%",
  },
  avatarImage: {
    width: 0.3 * width,
    height: 0.3 * width,
    borderRadius: 0.15 * width,
    borderWidth: 2,
    borderColor: "#fff",
    alignSelf: "center",
    justifyContent: "center",
    marginTop: -0.14 * width,
  },
  navLink: {
    fontSize: 18,
    padding: 4,
    color: "#444",
    marginVertical: 5,
    paddingLeft: 10,
  },
  collapsibleButton: {
    justifyContent: "center",
    marginVertical: 2,
    borderLeftWidth: 1,
    borderLeftColor: "#777",
    height: 20,
    alignSelf: "center",
  },
  container: {
    backgroundColor: "#FFF",
    padding: 2,
    flex: 1,
    justifyContent: "space-between",
  },
  inputContainer: {
    borderBottomWidth: 0.2,
    borderBottomColor: DARKGRAY,
    fontSize: 16,
    marginHorizontal: "4%",
  },
  planContainer: {
    flexDirection: "row",
    marginHorizontal: "4%",
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: "4%",
    marginTop: 8,
    marginVertical: 4,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 2,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 3,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
