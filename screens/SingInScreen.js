import { StyleSheet, Text, View, Image } from "react-native";
import FormContainer from "../components/formContainer";
import CheckButton from "../components/checkBtn";
import SettingsInput from "../components/settingsInput";
import LogOut from "../components/logOut";
import React, { useState } from "react";
import ChangeAvatar from "../components/changeAvatar";

export default function SignInScreen({ navigation }) {
  const [bip, setBip] = useState("");
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <ChangeAvatar
        name="modify"
        source={{ uri: require("../assets/img/sandwich_string.png") }}
      >
        <Image
          source={require("../assets/img/sandwich_string.png")}
          style={styles.avatar}
        />
      </ChangeAvatar>
      <ChangeAvatar>
        <Image
          source={require("../assets/img/sandwich_string.png")}
          style={styles.avatar}
        />
      </ChangeAvatar>
      <FormContainer
        text="Username"
        placeholder="Username"
        secureTextEntry={false}
        onChangeText={() => {
          setBip(!bip);
        }}
        hover={bip}
      />
      <FormContainer
        text="Password"
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={() => {}}
      />
      <SettingsInput
        placeholder="Username"
        secureTextEntry={false}
        onChangeText={(value) => {
          setBip(value);
        }}
        value={bip}
      />
      <CheckButton onPress={() => navigation.navigate("TabNavigator")} />
      <LogOut onPress={() => {}} children="Log Out" />
      <LogOut onPress={() => {}} children="Delete Account" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
  avatar: {
    flex: 1,
    borderRadius: 100,
    resizeMode: "cover",
    aspectRatio: 1,
  },
});
