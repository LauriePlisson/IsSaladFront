import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
import { UserState } from "../reducers/user";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Post from "../components/postContainer";

// const BACKEND_ADDRESS = "http://192.168.100.158:3000";
const lienExpo = process.env.EXPO_PUBLIC_ADDRESS_EXPO;
export default function HomeScreen() {
  const user = useSelector((state: { user: UserState }) => state.user.value);
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const response = await fetch(`${lienExpo}posts/getPosts`);
      const data = await response.json();
      if (data.result) {
        setPosts(data.posts.slice(0, 5));
      } else {
        alert("Erreur lors de la récupération des posts");
      }
    } catch (error) {
      console.error("Erreur fetch posts :", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleLike = async (post) => {
    try {
      const response = await fetch(`${lienExpo}posts/likePost`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: user.token,
          photoUrl: post.photoUrl,
        }),
      });
      const data = await response.json();
      if (data.result) {
        console.log(data);
        fetchPosts(); // Recharge la liste
      }
    } catch (error) {
      console.error("Erreur lors du like :", error);
    }
  };

  const handleDislike = async (post) => {
    try {
      const response = await fetch(`${lienExpo}posts/dislikePost`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: user.token,
          photoUrl: post.photoUrl,
        }),
      });
      const data = await response.json();
      if (data.result) {
        console.log(data);
        fetchPosts(); // Recharge la liste
      }
    } catch (error) {
      console.error("Erreur lors du dislike :", error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Fil d'actualité</Text>
      <View style={styles.postsContainer}>
      {posts.map((post, index) => {
        return (
          <Post key={index} postBlock={post} handleDislike={() => {handleDislike(post)}} handleLike={() => {handleLike(post)}} hasLike={post.like.includes(user.token)} hasDislike={post.dislike.includes(user.token)} onPress={() => {}}/>
        );
      })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  postsContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 20,
    textAlign: "center",
  },
});
