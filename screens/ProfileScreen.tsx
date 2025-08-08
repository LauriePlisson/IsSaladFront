import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import { useState, useEffect } from "react";
import { UserState } from "../reducers/user";
import { useSelector, useDispatch } from "react-redux";
import { editDescription } from "../reducers/user";

export default function ProfileScreen({ navigation }) {
  const lienExpo = process.env.EXPO_PUBLIC_ADDRESS_EXPO;
  const user = useSelector((state: any) => state.user.value);
  const dispatch = useDispatch();
  // console.log(username);
  const [description, setDescription] = useState<string>("");
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    fetch(`${lienExpo}users/${user.username}`)
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

  const handleChangeDescription = () => {
    fetch(`${lienExpo}users/changeDescription`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: user.username,
        description: description,
        token: user.token,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result === true) {
          console.log("Description changed successfully", data);
          dispatch(editDescription(description));
          setDescription("");
        } else {
          console.log("Failed to change description:", data.error);
        }
      });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
        <Text /*style={styles.title}*/>Go to Settings</Text>
      </TouchableOpacity>
      <Text /*style={styles.title}*/>Profile Screen</Text>
      <TextInput
        /*style={styles.input}*/
        placeholder="Change description"
        onChangeText={(value) => setDescription(value)}
        value={description}
      />
      <TouchableOpacity
        /*style={styles.button}*/
        onPress={() => {
          handleChangeDescription();
        }}
      >
        <Text /*style={styles.buttonText}*/>Save Description</Text>
      </TouchableOpacity>
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
