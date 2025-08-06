import {
  StyleSheet,
  Text,
  View,
} from "react-native";
// import {ButtonLog, FormContainer, CheckButton} from "../components";
import FormContainer from "../components/formContainer";
import CheckButton from "../components/checkBtn";
// Importing React and useState for managing state in the component
import React, { useState } from "react";

export default function SignInScreen({ navigation }) {
  const [bip, setBip] = useState(false);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <FormContainer text="Username" placeholder="Username" secureTextEntry={false} onChangeText={() => {setBip(!bip)}} hover={bip} />
      <FormContainer text="Password" placeholder="Password" secureTextEntry={true} onChangeText={() => {}} />
      <CheckButton onPress={() => navigation.navigate("TabNavigator")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    color: "#381D2A",
  },
});
