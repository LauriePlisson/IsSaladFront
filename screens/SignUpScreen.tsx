import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useState } from "react";

export default function SignUpScreen({ navigation }) {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  const lienExpo = process.env.EXPO_PUBLIC_ADDRESS_EXPO;

  const regexPassword: RegExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  const regexEmail: RegExp =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const handleSignUp = () => {
    if (
      username.length < 3 ||
      !regexPassword.test(password) ||
      !regexEmail.test(email)
    ) {
      setError(true);
      console.log("Invalid input");
      return;
    } else {
      fetch(`${lienExpo}users/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          mail: email,
          password: password,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.result === true) {
            setUsername("");
            setEmail("");
            setPassword("");
            console.log("Sign up successful:", data.message);
            navigation.navigate("SignIn");
          } else {
            console.log("Sign up failed:", data.error);
            setError(true);
          }
        });
    }
  };
  return (
    <View style={styles.container}>
      <Text /*style={styles.title}*/>Sign Up</Text>
      <TextInput
        /*style={styles.input}*/ placeholder="username"
        onChangeText={(value) => setUsername(value)}
        value={username}
      />
      <TextInput
        /*style={styles.input}*/ placeholder="Email"
        onChangeText={(value) => setEmail(value)}
        value={email}
      />
      <TextInput
        /*style={styles.input}*/ placeholder="Password"
        secureTextEntry={true}
        onChangeText={(value) => setPassword(value)}
        value={password}
      />
      <Text /*style={styles.errorText}*/>
        {error ? "Invalid username or mail or password" : ""}
      </Text>
      <TouchableOpacity
        /*style={styles.button}*/
        onPress={() => {
          handleSignUp();
        }}
      >
        <Text /*style={styles.buttonText}*/>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "blue",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
