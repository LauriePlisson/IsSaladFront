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
import { UserState } from "../reducers/user";
import { SearchState } from "../reducers/search";
import MiniPost from "../components/miniPost";
import TabBar from "../components/tabBar";
import { useNavigation } from "@react-navigation/native";
import Icon from "../components/icons";
import Post from "../components/postContainer";
import Comment from "../components/comment";
import { Sandwich, SendHorizonal, Sprout } from "lucide-react-native";

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
  const user = useSelector((state: { user: UserState }) => state.user.value);
  const dispatch = useDispatch();

  const userName = useSelector(
    (state: { search: SearchState }) => state.search.value.username
  );
  const [description, setDescription] = useState<string>("");
  const [posts, setPosts] = useState<PostState[]>([]);
  const [avatar, setAvatar] = useState<string>("");
  const [team, setTeam] = useState<string>("");

  const [postModalVisible, setPostModalVisible] = useState<boolean>(false);
  const [selectedPost, setSelectedPost] = useState<any | null>(null);
  const [showComments, setShowComments] = useState<boolean>(false);
  // input pour taper un nouveau commentaire
  const [newComment, setNewComment] = useState<string>("");
  const [userInfos, setUserInfos] = useState<any>({});

  useFocusEffect(
    useCallback(() => {
      fetch(`${lienExpo}users/${userName}`)
        .then((response) => response.json())
        .then((data) => {
          setPosts(data.postsList);
          setUserInfos(data);
          // setDescription(data.description);
          // setAvatar(data.avatar);
          // setTeam(data.team);
        });
    }, [])
  );

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
        toDelete={() => {}}
        isMine={false}
      />
    );
  });

  const comments =
    selectedPost && selectedPost.comments ? selectedPost.comments : [];

  return (
    <>
      <TouchableOpacity
        style={styles.buttonBack}
        onPress={() => props.change()}
      >
        <Icon name="x" size={24} />
      </TouchableOpacity>
      <SafeAreaView style={styles.container}>
        <View style={styles.User}>
          <Image
            source={{ uri: userInfos.avatar }}
            style={{ width: 100, aspectRatio: 1, borderRadius: 100 }}
          />
          <View style={styles.userInfo}>
            <View>
              <Text style={styles.username}>{userInfos.username}</Text>
              <Text style={styles.description}>{userInfos.description}</Text>
            </View>
            <View style={styles.userTeam}>
              {userInfos.team ? (
                <Icon name={userInfos.team} size={40} />
              ) : (
                <Icon name={undefined} size={40} /> // Error icon if no team
              )}
            </View>
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
                            selectedPost.ownerPost?.username || userName,
                          avatar:
                            selectedPost.ownerPost?.avatar || avatar || "",
                          team: {
                            name: selectedPost.ownerPost?.team?.name || "no team",
                          },
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
                        const team = author.team || "no team";
                        const isLast = index === comments.length - 1;

                        return (
                          <Comment
                            key={comment._id || index}
                            ownerComment={{ username, avatar, team }}
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
                        {/* <Text style={{ color: "#fff" }}>Envoyer</Text> */}
                        <SendHorizonal color="#fff" size={20} />
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              </ScrollView>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    top: -40,
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
    marginTop: 20,
    width: "95%",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "70%",
    marginLeft: 10,
  },
  username: {
    fontFamily: "Josefin Sans",
    fontSize: 28,
    fontWeight: 900,
    top: -10,
    color: "#381d2a",
  },
  description: {
    fontFamily: "Josefin Sans",
    fontSize: 16,
    color: "#381d2a9d",
    top: -5,
  },
  userTeam: {
    width: 60,
    aspectRatio: 1,
    borderRadius: 100,
    borderColor: "#d67b1aff",
    marginRight: 15,
  },
  stats: {
    alignItems: "center",
  },
  postContainer: {
    alignItems: "flex-end",
  },
  buttonBack: {
    left: 150,
    top: -48,
    height: 40,
    width: 70,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    zIndex: 1,
  },
  modalBackdrop: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalSheet: {
    height: "80%",
    backgroundColor: "rgba(253, 249, 242, 1)",
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
  salad: {
    color: "#AABD8C",
  },
  sandwich: {
    color: "#F39B6D",
  },
  soup: {
    color: "#F2C94C",
  },
  ravioli: {
    color: "#8a4d2dff",
  },
});
