import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal,
  FlatList,
  TextInput,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { UserState } from "../reducers/user";
import Post from "../components/postContainer";

// const BACKEND_ADDRESS = "http://192.168.100.158:3000";
const lienExpo = process.env.EXPO_PUBLIC_ADDRESS_EXPO;
export default function HomeScreen() {
  const user = useSelector((state: { user: UserState }) => state.user.value);
  const [posts, setPosts] = useState([]);

  const [commentsVisible, setCommentsVisible] = useState(false);
  const [selectedPost, setSelectedPost] = useState<any | null>(null);
  const [commentText, setCommentText] = useState("");

  const fetchPosts = async () => {
    try {
      const response = await fetch(`${lienExpo}posts/getPosts`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      const data = await response.json();
      if (data.result) {
        setPosts(data.posts.slice(0, 5)); // Limite à 5 posts
      } else {
        alert("Erreur lors de la récupération des posts");
      }
    } catch (error) {
      console.error("Erreur fetch posts :", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchPosts();
    }, [])
  );

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
        fetchPosts(); // Recharge la liste
      }
    } catch (error) {
      console.error("Erreur lors du dislike :", error);
    }
  };

  // ouvrir la modal commentaires
  const openComments = (post: any) => {
    setSelectedPost(post);
    setCommentsVisible(true);
  };

  // envoyer un commentaire
  const sendComment = async () => {
    if (!commentText.trim() || !selectedPost?._id) return;

    try {
      const res = await fetch(`${lienExpo}posts/addComment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: user.token,
          postId: selectedPost._id,
          text: commentText.trim(),
        }),
      });
      const data = await res.json();
      if (data.result) {
        setCommentText("");
        // mettre à jour le post localement
        setSelectedPost(data.post);
        setPosts((prev) =>
          prev.map((p) => (p._id === data.post._id ? data.post : p))
        );
      } else {
        alert(data.error || "Erreur envoi commentaire");
      }
    } catch (error) {
      console.error("Erreur addComment :", error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Fil d'actualité</Text>
      <View style={styles.postsContainer}>
        {posts.map((post, index) => {
          return (
            <Post
              key={index}
              postBlock={post}
              handleDislike={() => {
                handleDislike(post);
              }}
              handleLike={() => {
                handleLike(post);
              }}
              onPress={() => {
                openComments(post);
              }}
            />
          );
        })}
      </View>
      <Modal
        visible={commentsVisible}
        animationType="slide"
        onRequestClose={() => setCommentsVisible(false)}
      >
        <View style={styles.modal}>
          <Text style={styles.modalTitle}>Commentaires</Text>

          <FlatList
            data={selectedPost?.comments ?? []}
            keyExtractor={(_, i) => i.toString()}
            renderItem={({ item }) => (
              <View style={styles.commentRow}>
                <Text style={styles.commentAuthor}>
                  {item?.ownerComment?.username ?? "Utilisateur"}
                </Text>
                <Text>{item.text}</Text>
              </View>
            )}
          />

          <View style={styles.commentInputRow}>
            <TextInput
              value={commentText}
              onChangeText={setCommentText}
              placeholder="Écrire un commentaire…"
              style={styles.input}
            />
            <TouchableOpacity style={styles.sendBtn} onPress={sendComment}>
              <Text style={{ color: "#fff", fontWeight: "600" }}>Envoyer</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.closeBtn}
            onPress={() => setCommentsVisible(false)}
          >
            <Text>Fermer</Text>
          </TouchableOpacity>
        </View>
      </Modal>
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
  modal: { flex: 1, backgroundColor: "#fff", padding: 16, paddingTop: 24 },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  commentRow: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  commentAuthor: { fontWeight: "600", marginBottom: 2 },

  commentInputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 40,
    marginRight: 10,
  },
  sendBtn: {
    backgroundColor: "#000",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
  },
  closeBtn: { alignSelf: "center", marginTop: 16 },
});
