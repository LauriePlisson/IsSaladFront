import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../reducers/user";

export default function SignInScreen({ navigation }) {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  const dispatch = useDispatch();
  const lienExpo = process.env.EXPO_PUBLIC_ADDRESS_EXPO;
  // console.log("Lien Expo:", lienExpo);
  // const user = useSelector((state: any) => state.user.value);
  // console.log("Current user state:", user);

  const onPressSignIn = () => {
    fetch(`${lienExpo}users/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Response data:", data);
        if (data.result === true && data.token) {
          console.log("Sign in successful", data);
          dispatch(
            addUser({
              username: data.username,
              token: data.token,
              friendList: data.friendsList,
              avatar: data.avatar,
              description: data.description,
              team: data.team,
            })
          );
          console.log("User added to Redux store:", data.username);
          navigation.navigate("TabNavigator", "Home");
          setUsername("");
          setPassword("");
        } else {
          setError(true);
          // console.log("Sign in failed");
        }
      });
  };

  // console.log(error);

  return (
    <View style={styles.container}>
      <Text /*style={styles.title}*/>Sign In</Text>
      <TextInput
        /*style={styles.input}*/ placeholder="username"
        onChangeText={(value) => setUsername(value)}
        value={username}
      />
      <TextInput
        /*style={styles.input}*/ placeholder="Password"
        secureTextEntry={true}
        onChangeText={(value) => setPassword(value)}
        value={password}
      />

      <Text /*style={styles.errorText}*/>
        {error ? "Invalid username or password" : ""}
      </Text>

      <TouchableOpacity
        /*style={styles.button}*/
        onPress={() => {
          onPressSignIn();
        }}
      >
        <Text /*style={styles.buttonText}*/>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity
        /*style={styles.button}*/
        onPress={() => navigation.navigate("SignUp")}
      >
        <Text /*style={styles.buttonText}*/>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "yellow",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
