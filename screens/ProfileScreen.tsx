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
import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { editDescription, UserState } from "../reducers/user";
import MiniPost from "../components/miniPost";

export type PostState = {
  _id: string;
  photoUrl: string;
  ownerPost: string;
  date: Date;
  result: string;
  description: string;
  like: string[];
  dislike: string[];
  userHasLiked: boolean;
  userHasDisliked: boolean;
  likeCount: number;
  dislikeCount: number;
  comments: any[];
};

type toDeleteState = {
  token: string;
  photoUrl: string;
};

type changeDescr = {
  username: string;
  description: string;
  token: string;
};

export default function ProfileScreen({ navigation }) {
  const lienExpo = process.env.EXPO_PUBLIC_ADDRESS_EXPO;
  const user = useSelector((state: { user: UserState }) => state.user.value);
  const dispatch = useDispatch();

  const [description, setDescription] = useState<string>("");
  const [posts, setPosts] = useState<PostState[]>([]);
  const [edit, setEdit] = useState<boolean>(false);
  const [delet, setDelet] = useState<boolean>(false);
  const [errorDesc, setErrorDesc] = useState<boolean>(false);

  useFocusEffect(
    useCallback(() => {
      fetch(`${lienExpo}users/${user.username}`)
        .then((response) => response.json())
        .then((data) => {
          // console.log(data);
          setPosts(data.postsList);
        });
    }, [delet])
  );

  const handleX = (url: string) => {
    const toDelete: toDeleteState = {
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
      <MiniPost postBlock={post} key={i} onPress={() => {}} toDelete={() => handleX(post.photoUrl)} isMine={true} />
    );
  });

  const handleChangeDescription = () => {
    const changeDescription: changeDescr = {
      username: user.username,
      description: description,
      token: user.token,
    };
    fetch(`${lienExpo}users/changeDescription`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(changeDescription),
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
          setDescription("");
          setEdit(false);
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
            <Text style={styles.username}>{user.username}</Text>
            <Text style={styles.description}>{user.description}</Text>
            {!edit && <TouchableOpacity onPress={() => setEdit(!edit)}>
              <Text style={styles.editButton}>edit description</Text>
            </TouchableOpacity>}
            {edit && (
              <>
                <TextInput
                  placeholder="Change description"
                  onChangeText={(value) => setDescription(value)}
                  value={description}
                  style={{
                    width: "100%",
                    height: 40,
                    borderColor: "#e9e3b4",
                    borderWidth: 1,
                    borderRadius: 8,
                    paddingHorizontal: 10,
                    marginVertical: 10,
                  }}
                />
                <TouchableOpacity
                  onPress={() => {
                    handleChangeDescription();
                  }}
                >
                  <Text style={styles.editButton}>Save Description</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
          <View style={styles.userTeam}>
            {user.team && <Image
              source={{ uri: user.team }}
              style={{ width: 60, aspectRatio: 1, borderRadius: 100 }}
            />}
          </View>
          {/* <View style={styles.userNumber}>
            <View style={styles.stats}>
              <Text>Posts: </Text>
              <Text>{posts.length}</Text>
            </View>
            <View style={styles.stats}>
              <Text>Friends: </Text>
              <Text>{user.friendList.length}</Text>
            </View>
          </View> */}
        </View>
      </View>
      <ScrollView
        contentContainerStyle={{
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 5,
          justifyContent: "flex-start",
          alignItems: "flex-start",
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
    alignItems: "center",
    justifyContent: "space-evenly",
    marginTop: 15,
    width: "95%",
    // backgroundColor: "#e9e3b4",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: '70%',
    marginLeft: 10,
    // backgroundColor: "#948b49ff",
  },
  username: {
    fontFamily: "Josefin Sans",
    fontSize: 22,
    fontWeight: 900,
    color: "#381d2a",
  },
  description: {
    fontFamily: "Josefin Sans",
    fontSize: 16,
    color: "#381d2a9d",
  },
  editButton: {
    fontFamily: "Josefin Sans",
    fontSize: 12,
    color: "#d67b1aff",
    textDecorationLine: "underline",
  },
  userTeam: {
    width: 60,
    aspectRatio: 1,
    borderRadius: 100,
    backgroundColor: "#1f6225ff",
  },
  stats: {
    alignItems: "center",
  },
  postContainer: {
    alignItems: "flex-end",
  },
});
