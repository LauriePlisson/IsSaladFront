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
  Image,
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

            navigation.navigate("SignIn");
          } else {
            setError(true);
          }
        });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.SignUpContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Image
          source={{
            uri: "https://res.cloudinary.com/dtaynthro/image/upload/v1755091143/ChatGPT_Image_13_aou%CC%82t_2025_15_18_25_nxdfto.png",
          }}
          style={{
            width: 150,
            aspectRatio: 1,
            borderRadius: 50,
            // borderColor: "#ac6139ff",
            // borderWidth: 1,
            marginBottom: 20,
          }}
        />
        <Text style={styles.appName}>IsSalad?</Text>

        <FormContainer
          text="Email"
          placeholder="Email"
          secureTextEntry={false}
          onChangeText={(value) => setEmail(value)}
          value={email}
          keyboardType="email-address"
        />
        <FormContainer
          text="Username"
          placeholder="Username"
          secureTextEntry={false}
          onChangeText={(value) => setUsername(value)}
          value={username}
        />
        <Text style={styles.info}>at least 3 letters</Text>
        <FormContainer
          text="Password"
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(value) => setPassword(value)}
          value={password}
        />
        <Text style={styles.info}>
          8 characters needed & at least one number
        </Text>

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
    backgroundColor: "#f1d5a9ff",
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
  info: {
    color: "#381d2a5a",
  },
  appName: {
    color: "#ac6139ff",
    fontWeight: "400",
    fontSize: 35,
    marginBottom: 20,
    letterSpacing: 2,
  },
});
