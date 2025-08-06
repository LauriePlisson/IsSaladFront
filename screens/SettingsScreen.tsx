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
import {
  editAvatar,
  editDescription,
  editUsername,
  logOutUser,
} from "../reducers/user";

export default function SettingsScreen({ navigation }) {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [newpassword, setNewPassword] = useState<string>("");
  const [avatar, setAvatar] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [errorPassword, setErrorPassword] = useState<boolean>(false);

  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user.value);
  const lienExpo = process.env.EXPO_PUBLIC_ADDRESS_EXPO;
  const regexPassword: RegExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  const handleChangePassword = () => {
    if (!regexPassword.test(password)) {
      //   console.log("Invalid password");
      setErrorPassword(true);
      return;
    }
    fetch(`${lienExpo}users/changePassword`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        username: user.username,
        password: password,
        newpassword: newpassword,
        token: user.token,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result === true) {
          //   console.log("Password changed successfully", data);
          setPassword("");
          setNewPassword("");
        } else {
          setErrorPassword(true);
          //   console.log("Failed to change password:", data.error);
        }
      });
  };

  const handleLogout = () => {
    dispatch(logOutUser());
    navigation.navigate("SignIn");
  };

  const handleDeleteAccount = () => {
    console.log("Delete account functionality not implemented yet");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate("TabNavigator", "Profile")}
      >
        <Text>Go to Profil</Text>
      </TouchableOpacity>
      <Text /*style={styles.title}*/>Settings Screen</Text>
      <TextInput
        /*style={styles.input}*/
        placeholder="Change avatar URL"
        onChangeText={(value) => setAvatar(value)}
        value={avatar}
      />
      <TouchableOpacity
        /*style={styles.button}*/
        onPress={() => {}}
      >
        <Text /*style={styles.buttonText}*/>Save Avatar</Text>
      </TouchableOpacity>
      <TextInput
        /*style={styles.input}*/
        placeholder="Change username"
        onChangeText={(value) => setUsername(value)}
        value={username}
      />
      <TouchableOpacity
        /*style={styles.button}*/
        onPress={() => {}}
      >
        <Text /*style={styles.buttonText}*/>Save Username</Text>
      </TouchableOpacity>

      <TextInput
        /*style={styles.input}*/
        placeholder="Change description"
        onChangeText={(value) => setDescription(value)}
        value={description}
      />
      <TouchableOpacity
        /*style={styles.button}*/
        onPress={() => {}}
      >
        <Text /*style={styles.buttonText}*/>Save Description</Text>
      </TouchableOpacity>
      <TextInput
        /*style={styles.input}*/
        placeholder="enter password"
        secureTextEntry={true}
        onChangeText={(value) => setPassword(value)}
        value={password}
      />
      <TextInput
        /*style={styles.input}*/
        placeholder="enter new password"
        secureTextEntry={true}
        onChangeText={(value) => setNewPassword(value)}
        value={newpassword}
      />
      <Text /*style={styles.errorText}*/>
        {errorPassword
          ? "Wrong Password, Invalid Newpassword or Empty Field"
          : ""}{" "}
      </Text>
      <TouchableOpacity
        /*style={styles.button}*/
        onPress={() => {
          handleChangePassword();
        }}
      >
        <Text /*style={styles.buttonText}*/>Save Password</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          handleLogout();
        }}
      >
        <Text /*style={styles.buttonText}*/>Log Out</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          handleDeleteAccount();
        }}
      >
        <Text /*style={styles.buttonText}*/>Delete Account</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "violet",
    alignItems: "center",
    justifyContent: "center",
  },
});
