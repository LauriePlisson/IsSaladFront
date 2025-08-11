import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import LogOut from "../components/logOut";
import SettingsInput from "../components/settingsInput";
import ChangeAvatar from "../components/changeAvatar";
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

  const avatarUrl = user.avatar;

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
    setAvatar(result.assets[0].uri);
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
          console.log("Password changed successfully", data);
          setPassword("");
          setNewPassword("");
          setErrorPassword(false);
        } else {
          setPassword("");
          setNewPassword("");
          setErrorPassword(true);
          console.log("Failed to change password:", data.error);
        }
      });
  };

  const handleLogout = () => {
    dispatch(logOutUser());
    navigation.navigate("SignIn");
  };

  const handleDeleteAccount = () => {
    fetch(`${lienExpo}posts/deleteAllFromOne`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: user.token }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        fetch(`${lienExpo}users/`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: user.token,
          }),
        })
          .then((reponse) => reponse.json())
          .then((dataSuppr) => {
            if (dataSuppr.result === true) {
              // console.log("Account deleted successfully", data);
              dispatch(logOutUser());
              navigation.navigate("SignIn");
              setErrorDelete(false);
            } else {
              // console.log("Failed to delete account:", data.error);
              setErrorDelete(true);
            }
          });
      });
  };

  return (
    <View style={styles.container}>
      <ChangeAvatar
        name="modify"
        onPress={() => {
          handleChangeAvatar();
        }}
        photoPath={avatar || avatarUrl}
        style={{ marginBottom: 15 }}
      />

      <Text style={styles.errorText}>
        {errorAvatar ? "Error changing avatar" : ""}
      </Text>
      <KeyboardAvoidingView
        style={styles.infoContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <SettingsInput
          placeholder="Username"
          secureTextEntry={false}
          onChangeText={(value) => {
            setUsername(value), setErrorUsername(false);
          }}
          value={username}
          onPress={() => handleChangeUsername()}
        />
        <Text style={styles.errorText}>
          {errorUsername ? "Invalid Username or Empty Field" : ""}
        </Text>
        <SettingsInput
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(value) => {
            setErrorPassword(false), setPassword(value);
          }}
          value={password}
          confirm={true}
          style={{
            width: "89%",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        />

        <SettingsInput
          placeholder="New Password"
          secureTextEntry={true}
          onChangeText={(value) => setNewPassword(value)}
          value={newpassword}
          onPress={() => {
            handleChangePassword();
          }}
        />

        <Text style={styles.errorText}>
          {errorPassword
            ? "Wrong Password, Invalid Newpassword or Empty Field"
            : ""}{" "}
        </Text>
      </KeyboardAvoidingView>

      <LogOut
        children="Log Out"
        onPress={() => {
          handleLogout();
        }}
      />
      <LogOut
        onPress={() => {
          handleDeleteAccount();
        }}
        children="Delete Account"
      />
      <Text style={styles.errorText}>
        {errorDelete ? "Error deleting account" : ""}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 30,
  },
  infoContainer: {
    alignItems: "center",
    marginBottom: 15,
  },

  errorText: {
    color: "#f39b6d",
  },
  avatar: {
    // flex: 1,
    borderRadius: 100,
    resizeMode: "cover",
    aspectRatio: 1,
  },
});
