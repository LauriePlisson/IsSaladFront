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
import { useFocusEffect } from "@react-navigation/native";
import FormContainer from "../components/formContainer";
import ButtonLog from "../components/logButton";
import { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../reducers/user";

export default function SignInScreen({ navigation }) {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  const dispatch = useDispatch();
  const lienExpo: string = process.env.EXPO_PUBLIC_ADDRESS_EXPO;

  // const user = useSelector((state: any) => state.user.value);

  type logInState = {
    username: string;
    password: string;
  };

  const onPressSignIn = () => {
    const userlogin: logInState = {
      username: username,
      password: password,
    };

    fetch(`${lienExpo}users/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userlogin),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result === true && data.token) {
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

          navigation.navigate("TabNavigator", "Home");
          setUsername("");
          setPassword("");
        } else {
          setError(true);
        }
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.signInContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <FormContainer
          text="Username"
          placeholder="Username"
          secureTextEntry={false}
          onChangeText={(value) => {
            setError(false), setUsername(value);
          }}
          value={username}
        />
        <FormContainer
          text="Password"
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(value) => {
            setError(false), setPassword(value);
          }}
          value={password}
        />
        <Text style={styles.errorText}>
          {error ? "Invalid username or password" : ""}
        </Text>
        <ButtonLog
          children="Log In"
          onPress={() => {
            onPressSignIn();
          }}
        />
      </KeyboardAvoidingView>

      <ButtonLog
        children="Sign Up"
        onPress={() => {
          setError(false);
          setUsername("");
          setPassword("");
          navigation.navigate("SignUp");
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
  signInContainer: {
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 2,
    borderColor: "#f39b6d",
    width: "80%",
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
  errorText: {
    color: "#f39b6d",
  },
});
