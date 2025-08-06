import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
} from "react-native";
import { useState, useEffect } from "react";
import { UserState } from "../reducers/user";

import { useSelector } from "react-redux";

export default function ProfileScreen({ navigation }) {
  const lienExpo = process.env.EXPO_PUBLIC_ADDRESS_EXPO;
  const username = useSelector((state: any) => state.user.value.username);
  // console.log(username);
  const [posts, setPosts] = useState<any[]>([]);
  useEffect(() => {
    fetch(`${lienExpo}users/${username}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPosts(data.postsList);
      });
  }, []);

  // console.log(posts);

  const postDisplay = posts.map((post, i) => {
    return (
      <View key={i} style={styles.postContainer}>
        <Image
          source={{ uri: post.photoUrl }}
          style={{ width: 100, height: 100 }}
        />
      </View>
    );
  });
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
        <Text /*style={styles.title}*/>Go to Settings</Text>
      </TouchableOpacity>
      <Text /*style={styles.title}*/>Profile Screen</Text>
      {postDisplay}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
  },
  postContainer: {
    backgroundColor: "white",
  },
});
