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

const BACKEND_ADDRESS = "http://192.168.100.158:3000";

export default function HomeScreen() {
  const user = useSelector((state: { user: UserState }) => state.user.value);
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const response = await fetch(`${BACKEND_ADDRESS}/posts/getPosts`);
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
      const response = await fetch(`${BACKEND_ADDRESS}/posts/likePost`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: user.token,
          photoUrl: post.photoUrl,
        }),
      });
      const data = await response.json();
      if (data.result) {
        fetchPosts(); // Recharge la liste
      }
    } catch (error) {
      console.error("Erreur lors du like :", error);
    }
  };

  const handleDislike = async (post) => {
    try {
      const response = await fetch(`${BACKEND_ADDRESS}/posts/dislikePost`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: user.token,
          photoUrl: post.photoUrl,
        }),
      });
      const data = await response.json();
      if (data.result) {
        fetchPosts(); // Recharge la liste
      }
    } catch (error) {
      console.error("Erreur lors du dislike :", error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Fil d'actualité</Text>
      {posts.map((post, index) => {
        const userHasLiked = post.like.includes(user.token);
        const userHasDisliked = post.dislike.includes(user.token);

        return (
          <View key={index} style={styles.card}>
            <Image source={{ uri: post.photoUrl }} style={styles.image} />
            <Text style={styles.username}>@{post.ownerPost.username}</Text>
            <Text style={styles.result}>Résultat : {post.result}</Text>
            <Text style={styles.description}>{post.description}</Text>

            <View style={styles.actions}>
              <TouchableOpacity
                onPress={() => handleLike(post)}
                style={styles.likeButton}
              >
                <FontAwesome
                  name="heart"
                  size={24}
                  color={userHasLiked ? "red" : "gray"}
                />
                <Text style={styles.likeCount}>{post.like.length}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => handleDislike(post)}
                style={styles.likeButton}
              >
                <FontAwesome
                  name="thumbs-down"
                  size={24}
                  color={userHasDisliked ? "blue" : "gray"}
                />
                <Text style={styles.likeCount}>{post.dislike.length}</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 20,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 15,
    borderRadius: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
  },
  username: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
  },
  result: {
    fontStyle: "italic",
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: "#333",
    marginBottom: 10,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 15,
  },
  likeButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  likeCount: {
    marginLeft: 6,
    fontSize: 16,
    color: "#333",
  },
});
