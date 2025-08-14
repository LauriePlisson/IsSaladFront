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
  Modal,
  Alert,
} from "react-native";
import LogOut from "../components/logOut";
import ButtonLog from "../components/logButton";
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

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [openFrom, setOpenFrom] = useState<string>("");

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

  const changeUsername = () => {
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
          setModalVisible(!modalVisible);
          setUsername("");
          navigation.navigate("TabNavigator", "Profile");
        } else {
          // console.log("Failed to change username:", data.error);
          setErrorUsername(true);
          setUsername("");
          setModalVisible(!modalVisible);
        }
      });
  };

  const changePassword = () => {
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
          // console.log("Password changed successfully", data);
          setPassword("");
          setNewPassword("");
          setErrorPassword(false);
          setModalVisible(!modalVisible);
          navigation.navigate("TabNavigator", "Profile");
        } else {
          setModalVisible(!modalVisible);
          setPassword("");
          setNewPassword("");
          setErrorPassword(true);
          console.log("Failed to change password:", data.error);
        }
      });
  };

  const logout = () => {
    dispatch(logOutUser());
    setModalVisible(!modalVisible);
    navigation.navigate("SignIn");
  };

  const deleteAccount = () => {
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
              dispatch(logOutUser());
              navigation.navigate("SignIn");
              setModalVisible(!modalVisible);
              setErrorDelete(false);
            } else {
              setErrorDelete(true);
              setModalVisible(!modalVisible);
            }
          });
      });
  };

  const handleUsernameButton = () => {
    if (username.length < 3) {
      // console.log("Invalid username");
      setErrorUsername(true);
      setUsername("");
      return;
    } else {
      setModalVisible(true), setOpenFrom("username");
    }
  };

  const handlePasswordButton = () => {
    if (!regexPassword.test(password)) {
      //   console.log("Invalid password");
      setErrorPassword(true);
      setPassword("");
      setNewPassword("");
      setModalVisible(!modalVisible);
      return;
    } else {
      setModalVisible(true), setOpenFrom("password");
    }
  };

  const handlePressYes = () => {
    if (openFrom === "username") {
      changeUsername();
    } else if (openFrom === "password") {
      // console.log("password");
      changePassword();
    } else if (openFrom === "logOut") {
      logout();
    } else if (openFrom === "delete") {
      deleteAccount();
    }
  };

  const handlePressNo = () => {
    setUsername("");
    setPassword("");
    setNewPassword("");
    setModalVisible(!modalVisible);
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Are you sure ?</Text>
            <View style={styles.reponseModal}>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: "#f39b6d" }]}
                onPress={() => handlePressNo()}
              >
                <Text style={styles.textStyle}>No</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  handlePressYes();
                }}
              >
                <Text style={styles.textStyle}>Yes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
          placeholder={user.username}
          secureTextEntry={false}
          onChangeText={(value) => {
            setUsername(value), setErrorUsername(false);
          }}
          value={username}
          onPress={() => {
            handleUsernameButton();
          }}
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
            handlePasswordButton();
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
          setModalVisible(true), setOpenFrom("logOut");
        }}
      />
      <LogOut
        onPress={() => {
          setModalVisible(true), setOpenFrom("delete");
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
    paddingTop: 30,
    backgroundColor: "rgba(248, 235, 213, 0.87)",
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    width: "70%",
    height: "20%",
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#381D2A",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 30,
    color: "#381D2A",
    fontSize: 25,
  },
  reponseModal: {
    flexDirection: "row",
    gap: 20,
  },
  button: {
    backgroundColor: "#aabd8c",
    width: 70,
    height: 40,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  textStyle: {
    color: "#381D2A",
    fontSize: 15,
    fontWeight: "bold",
  },
});
