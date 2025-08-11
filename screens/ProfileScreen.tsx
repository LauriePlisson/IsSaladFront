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
  const [edit, setEdit] = useState<boolean>(false);
  const [delet, setDelet] = useState(false);
  const [errorDesc, setErrorDesc] = useState(false);

  useEffect(() => {
    fetch(`${lienExpo}users/${user.username}`)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setPosts(data.postsList);
      });
  }, [delet]);

  const handleX = (url: string) => {
    const toDelete = {
      token: user.token,
      photoUrl: url,
    };

    fetch(`${lienExpo}posts/deletePost`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(toDelete),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data), setDelet(!delet);
      });
  };

  const postDisplay = posts.map((post, i) => {
    return (
      <View key={i} style={styles.postContainer}>
        <TouchableOpacity
          onPress={() => {
            handleX(post.photoUrl);
          }}
        >
          <Text>X</Text>
        </TouchableOpacity>
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
          // console.log("Description changed successfully", data);
          dispatch(editDescription(description));
          setDescription("");
          setEdit(false);
        } else {
          setErrorDesc(true);
          // console.log("Failed to change description:", data.error);
        }
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.User}>
        <Image
          source={{ uri: user.avatar }}
          style={{ width: 100, aspectRatio: 1, borderRadius: 100 }}
        />
        <View style={styles.userInfo}>
          <View>
            <Text>{user.username}</Text>
            <Text>{user.description}</Text>
            <TouchableOpacity onPress={() => setEdit(!edit)}>
              <Text>edit description</Text>
            </TouchableOpacity>
            {edit && (
              <>
                <TextInput
                  placeholder="Change description"
                  onChangeText={(value) => setDescription(value)}
                  value={description}
                />
                <TouchableOpacity
                  onPress={() => {
                    handleChangeDescription();
                  }}
                >
                  <Text /*style={styles.buttonText}*/>Save Description</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
          <View style={styles.userNumber}>
            <View style={styles.stats}>
              <Text>Posts: </Text>
              <Text>{posts.length}</Text>
            </View>
            <View style={styles.stats}>
              <Text>Friends: </Text>
              <Text>{user.friendList.length}</Text>
            </View>
          </View>
        </View>
      </View>
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
  User: {
    flexDirection: "row",
    marginTop: 25,
    width: "90%",
  },
  userInfo: {
    flexDirection: "row",
    marginLeft: 15,
  },
  userNumber: {
    // borderWidth: 2,
    flexDirection: "row",
    marginLeft: 15,
    gap: 15,
  },
  stats: {
    alignItems: "center",
  },
  postContainer: {
    alignItems: "flex-end",
  },
});
