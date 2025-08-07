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
import { editAvatar, editUsername, logOutUser } from "../reducers/user";
import * as ImagePicker from "expo-image-picker";

export default function SettingsScreen({ navigation }) {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [newpassword, setNewPassword] = useState<string>("");

  const [avatar, setAvatar] = useState<string | null>(null);
  const [errorPassword, setErrorPassword] = useState<boolean>(false);
  const [errorUsername, setErrorUsername] = useState<boolean>(false);
  const [errorAvatar, setErrorAvatar] = useState<boolean>(false);

  const [errorDelete, setErrorDelete] = useState<boolean>(false);

  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user.value);
  const lienExpo = process.env.EXPO_PUBLIC_ADDRESS_EXPO;
  const regexPassword: RegExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  const avatarUrl = avatar || user.avatar;

  const handleChangeAvatar = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.2,
    });
    // console.log(result.assets[0].uri);
    const formData = new FormData();
    formData.append("avatar", {
      uri: result.assets[0].uri,
      type: "image/jpeg",
      name: "avatar.jpg",
    });
    formData.append("token", user.token);

    fetch(`${lienExpo}users/changeAvatar`, {
      method: "PUT",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        if (data.result === true) {
          dispatch(editAvatar(data.avatarUrl));
          setAvatar(data.avatarUrl);
        } else {
          // console.log("Failed to change avatar:", data.error);
          setErrorAvatar(true);
        }
      });
  };

  const handleChangeUsername = () => {
    if (username.length < 3) {
      // console.log("Invalid username");
      setErrorUsername(true);
      setUsername("");
      return;
    }
    fetch(`${lienExpo}users/changeUsername/${username}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: user.token,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result === true) {
          // console.log("Username changed successfully", data);
          dispatch(editUsername(username));
          setUsername("");
        } else {
          // console.log("Failed to change username:", data.error);
          setErrorUsername(true);
          setUsername("");
        }
      });
  };

  const handleChangePassword = () => {
    if (!regexPassword.test(password)) {
      //   console.log("Invalid password");
      setErrorPassword(true);
      setPassword("");
      setNewPassword("");
      return;
    }
    fetch(`${lienExpo}users/changePassword`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
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
          setErrorPassword(false);
        } else {
          setPassword("");
          setNewPassword("");
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
    fetch(`${lienExpo}users/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: user.token,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result === true) {
          // console.log("Account deleted successfully", data);
          dispatch(logOutUser());
          navigation.navigate("SignIn");
          setErrorDelete(false);
        } else {
          // console.log("Failed to delete account:", data.error);
          setErrorDelete(true);
        }
      });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate("TabNavigator", "Profile")}
      >
        <Text>Go to Profil</Text>
        <Text /*style={styles.title}*/>
          {errorAvatar ? "Error changing avatar" : ""}
        </Text>
      </TouchableOpacity>
      <Text /*style={styles.title}*/>Settings Screen</Text>

      <TouchableOpacity
        /*style={styles.button}*/
        onPress={() => {
          handleChangeAvatar();
        }}
      >
        <Text /*style={styles.buttonText}*/>Change Avatar</Text>
      </TouchableOpacity>
      <TextInput
        /*style={styles.input}*/
        placeholder="Change username"
        onChangeText={(value) => {
          setUsername(value), setErrorUsername(false);
        }}
        value={username}
      />
      <Text /*style={styles.errorText}*/>
        {errorUsername ? "Invalid Username or Empty Field" : ""}
      </Text>
      <TouchableOpacity
        /*style={styles.button}*/
        onPress={() => {
          handleChangeUsername();
        }}
      >
        <Text /*style={styles.buttonText}*/>Save Username</Text>
      </TouchableOpacity>

      <TextInput
        /*style={styles.input}*/
        placeholder="enter password"
        secureTextEntry={true}
        onChangeText={(value) => {
          setPassword(value), setErrorPassword(false);
        }}
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
      <Text /*style={styles.errorText}*/>
        {errorDelete ? "Error deleting account" : ""}
      </Text>
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
