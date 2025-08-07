import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import FormContainer from "../components/formContainer";
import ButtonLog from "../components/logButton";
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
    console.log("Sign Up button pressed");

    //}
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.SignUpContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <FormContainer
          text="Email"
          placeholder="Email"
          secureTextEntry={false}
          onChangeText={(value) => setEmail(value)}
          value={email}
        />
        <FormContainer
          text="Username"
          placeholder="Username"
          secureTextEntry={false}
          onChangeText={(value) => setUsername(value)}
          value={username}
        />
        <FormContainer
          text="Password"
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(value) => setPassword(value)}
          value={password}
        />

        <Text style={styles.errorText}>
          {error ? "Invalid username or mail or password" : ""}
        </Text>
        <ButtonLog
          children="Singn Up"
          onPress={() => {
            handleSignUp();
          }}
        />
      </KeyboardAvoidingView>
      <ButtonLog
        children="Log In"
        onPress={() => {
          navigation.navigate("SignIn");
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  errorText: {
    color: "#f39b6d",
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
  SignUpContainer: {
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 2,
    borderColor: "#f39b6d",
    width: "80%",
  },
});
