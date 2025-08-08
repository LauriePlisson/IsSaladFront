import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { useState, useEffect } from "react";
import { UserState } from "../reducers/user";
import { useSelector, useDispatch } from "react-redux";
import { editDescription } from "../reducers/user";

export default function ProfileScreen({ navigation }) {
  const lienExpo = process.env.EXPO_PUBLIC_ADDRESS_EXPO;
  const user = useSelector((state: any) => state.user.value);
  const dispatch = useDispatch();
  const [description, setDescription] = useState<string>("");
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    fetch(`${lienExpo}users/${user.username}`)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setPosts(data.postsList);
      });
  }, []);

  // console.log(posts);

  const postDisplay = posts.map((post, i) => {
    return (
      <View key={i}>
        <Image
          source={{ uri: post.photoUrl }}
          style={{ width: 150, aspectRatio: 1 }}
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
  console.log("userfriendlist reducer:", user.friendList);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.infoUser}>
        <Image
          source={{ uri: user.avatar }}
          style={{ width: 100, aspectRatio: 1, borderRadius: 100 }}
        />
        <Text>{user.username}</Text>
        <Text>{user.description}</Text>
        <Text>Nombre de poste: {posts.length}</Text>
        <Text>Nombre d'ami: {user.friendList.length}</Text>
      </View>
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
      <ScrollView
        contentContainerStyle={{
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 10,
          justifyContent: "center",
          alignItems: "center",
        }}
        style={styles.display}
      >
        {postDisplay}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  display: {
    margin: 10,
  },
});
