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
import { SearchState } from "../reducers/search";
import MiniPost from "../components/miniPost";
import TabBar from "../components/tabBar";
import { useNavigation } from "@react-navigation/native";
import Icon from "../components/icons";

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

export default function UserScreen(props) {
  const lienExpo = process.env.EXPO_PUBLIC_ADDRESS_EXPO;
  const dispatch = useDispatch();

  const userName = useSelector(
    (state: { search: SearchState }) => state.search.value.username
  );
  const [description, setDescription] = useState<string>("");
  const [posts, setPosts] = useState<PostState[]>([]);
  const [avatar, setAvatar] = useState<string>("");
  const [team, setTeam] = useState("");

  useFocusEffect(
    useCallback(() => {
      fetch(`${lienExpo}users/${userName}`)
        .then((response) => response.json())
        .then((data) => {
          // console.log(data);
          setPosts(data.postsList);
          setDescription(data.description);
          setAvatar(data.avatar);
          setTeam(data.team);
        });
    }, [])
  );

  const postDisplay = posts.map((post, i) => {
    return (
      <MiniPost
        postBlock={post}
        key={i}
        onPress={() => {}}
        toDelete={() => {}}
        isMine={false}
      />
    );
  });

  return (
    <>
      <SafeAreaView style={styles.container}>
        <TouchableOpacity
          style={styles.buttonBack}
          onPress={() => props.change()}
        >
          <Icon name="x" size={24} />
        </TouchableOpacity>
        <View style={styles.User}>
          <Image
            source={{ uri: avatar }}
            style={{ width: 100, aspectRatio: 1, borderRadius: 100 }}
          />
          <View style={styles.userInfo}>
            <View>
              <Text style={styles.username}>{userName}</Text>
              <Text style={styles.description}>{description}</Text>
            </View>
            <View style={styles.userTeam}>
              {team && (
                <Image
                  source={{ uri: team }}
                  style={{ width: 60, aspectRatio: 1, borderRadius: 100 }}
                />
              )}
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
      {/* <View style={styles.tabBarContainer}>
        <TabBar />
      </View> */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "rgba(248, 235, 213, 0.87)",
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
    width: "70%",
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
  tabBarContainer: {
    borderTopStartRadius: 15,
    borderTopEndRadius: 15,
    // borderWidth: 2,
    backgroundColor: "#aabd8c",
  },
  buttonBack: {
    left: 150,
    marginTop: 15,
    height: 40,
    width: 70,
    // backgroundColor: "#aabd8c",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
});
