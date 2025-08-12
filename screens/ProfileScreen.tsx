import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  SafeAreaView,
  ScrollView,
  Modal,
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { editDescription, UserState } from "../reducers/user";
import MiniPost from "../components/miniPost";
import Post from "../components/postContainer";
import Comment from "../components/comment";

export type PostState = {
  _id: string;
  photoUrl: string;
  ownerPost: any;
  date: string | Date;
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

  const [postModalVisible, setPostModalVisible] = useState(false);
  const [selectedPost, setSelectedPost] = useState<any | null>(null);
  const [showComments, setShowComments] = useState(false);
  // input pour taper un nouveau commentaire
  const [newComment, setNewComment] = useState("");

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

  const buildPostView = (p: any) => {
    const likeCount = Array.isArray(p.like) ? p.like.length : 0;
    const dislikeCount = Array.isArray(p.dislike) ? p.dislike.length : 0;

    // TODO si tu veux : calcule si l'user a liké/diskliké
    const userHasLiked = false;
    const userHasDisliked = false;

    return {
      ...p,
      likeCount,
      dislikeCount,
      userHasLiked,
      userHasDisliked,
    };
  };

  const openPostModal = (post: any) => {
    setSelectedPost(buildPostView(post));
    setShowComments(false); // reset
    setPostModalVisible(true);
  };

  const toggleComments = () => setShowComments((s) => !s);

  const closePostModal = () => {
    setPostModalVisible(false);
    setSelectedPost(null);
  };

  const likeFromModal = async () => {
    if (!selectedPost) return;
    try {
      const response = await fetch(`${lienExpo}posts/likePost`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: user.token,
          photoUrl: selectedPost.photoUrl,
        }),
      });
      const data = await response.json();
      if (data.result) {
        // on recharge les posts, puis on met à jour le post du modal
        const r = await fetch(`${lienExpo}users/${user.username}`);
        const d = await r.json();
        setPosts(d.postsList || []);
        const updated = (d.postsList || []).find(
          (p: any) => p._id === selectedPost._id
        );
        if (updated) setSelectedPost(buildPostView(updated));
      }
    } catch (e) {
      console.log("likeFromModal error:", e);
    }
  };

  const dislikeFromModal = async () => {
    if (!selectedPost) return;
    try {
      const response = await fetch(`${lienExpo}posts/dislikePost`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: user.token,
          photoUrl: selectedPost.photoUrl,
        }),
      });
      const data = await response.json();
      if (data.result) {
        const r = await fetch(`${lienExpo}users/${user.username}`);
        const d = await r.json();
        setPosts(d.postsList || []);
        const updated = (d.postsList || []).find(
          (p: any) => p._id === selectedPost._id
        );
        if (updated) setSelectedPost(buildPostView(updated));
      }
    } catch (e) {
      console.log("dislikeFromModal error:", e);
    }
  };

  const sendComment = async () => {
    if (!selectedPost || !newComment.trim()) return;

    try {
      const res = await fetch(`${lienExpo}posts/addComment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: user.token,
          postId: selectedPost._id,
          text: newComment.trim(),
        }),
      });
      const data = await res.json();

      if (data.result) {
        // le back renvoie le post MAJ + populate + tri
        setSelectedPost(buildPostView(data.post));
        setNewComment("");
        setShowComments(true);
      } else {
        alert(data.error || "Erreur ajout commentaire");
      }
    } catch (e) {
      console.log("sendComment error:", e);
    }
  };

  const postDisplay = posts.map((post, i) => {
    return (
      <MiniPost
        postBlock={post}
        key={i}
        onPress={() => openPostModal(post)}
        toDelete={() => handleX(post.photoUrl)}
        isMine={true}
      />
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

  const comments =
    selectedPost && selectedPost.comments ? selectedPost.comments : [];

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
            {!edit && (
              <TouchableOpacity onPress={() => setEdit(!edit)}>
                <Text style={styles.editButton}>edit description</Text>
              </TouchableOpacity>
            )}
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
            {user.team && (
              <Image
                source={{ uri: user.team }}
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
      {/*  MODAL POST */}
      <Modal
        visible={postModalVisible}
        transparent
        animationType="slide"
        onRequestClose={closePostModal}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalSheet}>
            {/* Header du modal */}
            <View style={styles.modalHeader}>
              <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                Publication
              </Text>
              <TouchableOpacity onPress={closePostModal}>
                <Text style={{ fontSize: 16 }}>Fermer</Text>
              </TouchableOpacity>
            </View>

            {/* Post complet */}
            <ScrollView
              contentContainerStyle={{ paddingBottom: 16 }}
              keyboardShouldPersistTaps="handled"
            >
              <View style={{ alignItems: "center" }}>
                {selectedPost && (
                  <Post
                    postBlock={{
                      ownerPost: {
                        _id: selectedPost.ownerPost?._id || "",
                        username:
                          selectedPost.ownerPost?.username || user.username,
                        avatar:
                          selectedPost.ownerPost?.avatar || user.avatar || "",
                      },
                      description: selectedPost.description || "",
                      date: selectedPost.date,
                      photoUrl: selectedPost.photoUrl,
                      comments: selectedPost.comments || [],
                      likeCount: selectedPost.likeCount || 0,
                      dislikeCount: selectedPost.dislikeCount || 0,
                      userHasLiked: selectedPost.userHasLiked || false,
                      userHasDisliked: selectedPost.userHasDisliked || false,
                      result: selectedPost.result,
                    }}
                    handleLike={likeFromModal}
                    handleDislike={dislikeFromModal}
                    onPress={toggleComments} // clic sur l’icône 💬
                  />
                )}
              </View>

              {/* Zone commentaires (toggle) */}
              {showComments && selectedPost && (
                <View style={styles.commentsWrap}>
                  <Text style={styles.commentsTitle}>
                    Commentaires ({selectedPost.comments?.length || 0})
                  </Text>

                  {/* Liste scrollable */}
                  <ScrollView
                    style={styles.commentsScroll}
                    contentContainerStyle={{ paddingBottom: 12 }}
                  >
                    {comments.map((comment, index) => {
                      const author = comment.ownerComment || {};
                      const username = author.username || "Utilisateur";
                      const avatar =
                        author.avatar || "https://via.placeholder.com/44";
                      const isLast = index === comments.length - 1;

                      return (
                        <Comment
                          key={comment._id || index}
                          ownerComment={{ username, avatar, team: "" }}
                          text={comment.text || ""}
                          date={comment.date}
                          position={isLast ? "last" : "first"}
                        />
                      );
                    })}
                  </ScrollView>

                  {/* Input + Envoyer */}
                  <View style={styles.addRow}>
                    <TextInput
                      placeholder="Écrire un commentaire…"
                      value={newComment}
                      onChangeText={setNewComment}
                      style={styles.input}
                    />
                    <TouchableOpacity
                      onPress={sendComment}
                      style={styles.sendBtn}
                    >
                      <Text style={{ color: "#fff" }}>Envoyer</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
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
  modalBackdrop: {
    flex: 1,

    justifyContent: "flex-end",
  },
  modalSheet: {
    height: "80%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 10,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  commentsWrap: {
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 8,
  },
  commentsTitle: {
    fontWeight: "600",
    marginBottom: 6,
  },
  commentsScroll: {
    maxHeight: 220, // NOTE: hauteur scrollable (ajuste)
  },
  addRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 8,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  sendBtn: {
    paddingHorizontal: 14,
    height: 40,
    borderRadius: 8,
    backgroundColor: "#f39b6d",
    alignItems: "center",
    justifyContent: "center",
  },
});
