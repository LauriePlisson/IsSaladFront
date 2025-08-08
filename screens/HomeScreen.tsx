import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";

const BACKEND_ADDRESS = "http://192.168.100.158:3000";

export default function HomeScreen({ navigation }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${BACKEND_ADDRESS}/posts/getPosts`);
        const data = await response.json();
        if (data.result) {
          setPosts(data.posts.slice(0, 5)); // Limiting to 5 posts
        } else {
          alert("Erreur lors de la récupération des posts");
        }
      } catch (error) {
        console.error("Erreur fetch posts :", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Fil d'actualité</Text>
      {posts.map((post, index) => (
        <View key={index} style={styles.card}>
          <Image source={{ uri: post.photoUrl }} style={styles.image} />
          <Text style={styles.username}>@{post.ownerPost.username}</Text>
          <Text style={styles.result}>Résultat : {post.result}</Text>
          <Text style={styles.description}>{post.description}</Text>
        </View>
      ))}
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
    backgroundColor: "#dbc29fff",
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 15,
    borderRadius: 10,
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
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
  },
});
