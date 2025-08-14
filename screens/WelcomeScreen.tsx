import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Dimensions,
  SafeAreaView,
  Pressable,
  Image,
} from "react-native";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { UserState } from "../reducers/user";
import { addUser } from "../reducers/user";

export default function WelcomeScreen({ navigation }) {
  const lienExpo = process.env.EXPO_PUBLIC_ADDRESS_EXPO;
  const [loadingOver, setLoadingOver] = useState<boolean>(false);
  const userToken = useSelector(
    (state: { user: UserState }) => state.user.value.token
  );
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      if (!userToken) {
        setLoadingOver(true);
        return;
      }
      const response = await fetch(lienExpo + "users/signinToken", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: userToken,
        }),
      });
      const data = await response.json();
      if (!data.result) {
        setLoadingOver(true);
        return;
      }
      dispatch(
        addUser({
          username: data.username,
          token: data.token,
          friendList: data.friendsList,
          avatar: data.avatar,
          description: data.description,
          team: data.team.name,
        })
      );
      navigation.navigate("TabNavigator");
    })();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={{
          uri: "https://res.cloudinary.com/dtaynthro/image/upload/v1755091143/ChatGPT_Image_13_aou%CC%82t_2025_15_18_25_nxdfto.png",
        }}
        // style={[styles.child, { aspectRatio: 1 }]}
        style={styles.image}
      />
      <Text style={styles.text}>
        <Text style={styles.title}>Bienvenue dans IsSalad? !</Text> {"\n"}
        {"\n"}Parce que tout est soit une soupe, soit une salade, soit un
        sandwich… même si vous refusez d’y croire.
      </Text>
      {loadingOver && (
        <TouchableOpacity
          style={styles.welcome}
          onPress={() => {
            navigation.navigate("SignIn");
          }}
        >
          <Text style={styles.textWelcome}>WELCOME</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f1d5a9ff",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 100,
  },
  image: {
    height: 200,
    aspectRatio: 1,
    marginBottom: 15,
    borderRadius: 50,
  },
  title: {
    textAlign: "center",
    fontWeight: 300,
    color: "#ac6139ff",
    // textDecorationLine: "underline",
    // textDecorationColor: "#f39b6d",
    fontSize: 35,
    letterSpacing: 1,
    marginBottom: 15,
  },
  text: {
    fontSize: 18,
    textAlign: "justify",
    color: " #381D2A",
    // borderTopWidth: 2,
    height: 300,
    // borderColor: "#f39b6d",
    paddingTop: 25,
    paddingHorizontal: 20,
  },
  welcome: {
    backgroundColor: "#aabd8c",
    height: 50,
    width: 100,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    bottom: 50,
  },
  textWelcome: {
    color: "#381D2A",
    fontWeight: 300,
    fontSize: 18,
  },
});
