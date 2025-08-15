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
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { UserState } from "../reducers/user";
import Post from "../components/postContainer";
import Comment from "../components/comment";
import { Meh, Minus, SendHorizonal } from "lucide-react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const lienExpo = process.env.EXPO_PUBLIC_ADDRESS_EXPO;
export default function HomeScreen() {
  const user = useSelector((state: { user: UserState }) => state.user.value);
  const [posts, setPosts] = useState([]);

  const [commentsVisible, setCommentsVisible] = useState(false);
  const [selectedPost, setSelectedPost] = useState<any | null>(null);
  const [commentText, setCommentText] = useState("");
  // const [userInfos, setUserInfos] = useState<any>({});

  const fetchPosts = async () => {
    try {
      const response = await fetch(`${lienExpo}posts/getPosts`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        // body: JSON.stringify(user.token),
      });
      const data = await response.json();
      if (data.result) {
        setPosts(data.posts.slice(0, 8)); // Limite à 8 posts
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
          prev.map((elem) => (elem._id === data.post._id ? data.post : elem))
        );
      } else {
        alert(data.error || "Erreur envoi commentaire");
      }
    } catch (error) {
      console.error("Erreur addComment :", error);
    }
  };

  return (
    <ScrollView style={styles.inner}>
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
        transparent
        presentationStyle="overFullScreen"
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.backdrop}
        >
          <TouchableOpacity
            style={styles.backdropTouch}
            activeOpacity={1}
            onPress={() => setCommentsVisible(false)}
          />
          <View style={styles.modalSheet}>
            {/* <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => setCommentsVisible(false)}
            >
              <Minus size={40} color="#381d2a" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Commentaires</Text> */}
            <View style={styles.modalHeader}>
              <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                Commentaires
              </Text>
              <TouchableOpacity onPress={() => setCommentsVisible(false)}>
                <Text style={{ fontSize: 16 }}>Fermer</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.commentList}>
              <FlatList
                data={selectedPost?.comments ?? []}
                renderItem={({ item, index }) => (
                  <Comment
                    ownerComment={item.ownerComment}
                    text={item.text}
                    position={
                      index === 0
                        ? "first"
                        : index === selectedPost?.comments.length - 1
                        ? "last"
                        : "middle"
                    }
                    date={item.date}
                  />
                )}
                keyExtractor={(item) => item._id}
                contentContainerStyle={{ alignItems: "center" }}
              />
            </View>
            {/* <KeyboardAvoidingView
              // behavior={Platform.OS === "ios" ? "padding" : "height"}
              // style={{ flexGrow: 1 }}
              > */}
            <View style={styles.commentInputRow}>
              <TextInput
                value={commentText}
                onChangeText={setCommentText}
                placeholder="Écrire un commentaire…"
                style={styles.input}
              />
              <TouchableOpacity style={styles.sendBtn} onPress={sendComment}>
                <SendHorizonal size={21} color="#fff" />
              </TouchableOpacity>
            </View>
            {/* </KeyboardAvoidingView> */}
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(248, 235, 213, 0.87)",
  },
  inner: {
    flex: 1,
    backgroundColor: "rgba(248, 235, 213, 0.87)",
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
  globalModalStyle: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  modalTitle: {
    fontFamily: "Josefin Sans",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 20,
    textAlign: "center",
  },
  commentList: {
    flex: 0.9,
    width: "100%",
  },
  commentInputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginHorizontal: 10,
    left: 10,
    marginBottom: 30,
    width: "90%",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 40,
    marginRight: 20,
  },
  sendBtn: {
    backgroundColor: "#d67b1aff",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
  },
  closeBtn: { alignSelf: "stretch" },
  backdrop: {
    flex: 1,
    justifyContent: "flex-end",
  },
  backdropTouch: {
    ...StyleSheet.absoluteFillObject,
  },
  modalSheet: {
    height: "70%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    justifyContent: "center",
    // alignItems: "center",
    overflow: "hidden",
    backgroundColor: "rgba(243, 241, 238, 1)",
  },
});
