const moment = require("moment");
import React from "react";
import { StyleProp, TouchableOpacity, ViewStyle } from "react-native";
import { StyleSheet, Text, Image, View } from "react-native";
import Icon from "../components/icons";
import {
  MessageSquareText,
  MessageSquare,
  Utensils,
  UtensilsCrossed,
  Smile,
} from "lucide-react-native";

// Type declaration for the props of the Post component
interface PostProps {
  postBlock: {
    ownerPost: {
      _id: string;
      username: string;
      avatar?: string;
      team?: {
        name: string;
      };
    };
    description: string;
    date: string;
    photoUrl?: string;
    comments?:
      | {
          _id: string;
          username: string;
          avatar: string;
          content: string;
          team?: string;
          date: string;
        }[]
      | undefined;
    likeCount?: number;
    dislikeCount?: number;
    userHasLiked?: boolean;
    userHasDisliked?: boolean;
    result?: string;
  };
  handleLike: () => void;
  handleDislike: () => void;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

// Post component
export default function Post({
  postBlock,
  style,
  onPress,
  handleLike,
  handleDislike,
}: PostProps) {
  const time: any = moment(postBlock.date);
  const formattedDate: string = moment(time).fromNow();
  let total: number = postBlock.likeCount + postBlock.dislikeCount;
  const likePercentage = (total: number) => {
    return Math.round((postBlock.likeCount / total) * 100);
  };
  const dislikePercentage = (total: number) => {
    return Math.round((postBlock.dislikeCount / total) * 100);
  };
  const likeWidth: number = postBlock.likeCount
    ? likePercentage(total)
    : postBlock.dislikeCount
    ? 0
    : 50;
  const dislikeWidth: number = postBlock.dislikeCount
    ? dislikePercentage(total)
    : postBlock.likeCount
    ? 0
    : 50;
  return (
    <View style={[styles.container, style]}>
      <Image source={{ uri: postBlock.photoUrl }} style={styles.image} />
      <View style={styles.userContainer}>
        <Image
          source={{ uri: postBlock.ownerPost.avatar }}
          style={
            postBlock.ownerPost.avatar
              ? styles.avatar
              : styles.avatarPlaceholder
          }
        />
        <View style={styles.userInfo}>
          <Text style={styles.username}>{postBlock.ownerPost.username}</Text>
          <Text style={styles.date}>{formattedDate}</Text>
        </View>
        <View style={styles.postInfos}>
          {postBlock.result && <Icon name={postBlock.result} size={36} />}
        </View>
      </View>
      <View style={styles.message}>
        <Text style={styles.description}>
          {postBlock.description.length > 180
            ? postBlock.description.substring(0, 180) + "..."
            : postBlock.description}
        </Text>
        <TouchableOpacity
          style={[styles.icon, { marginRight: 10 }]}
          onPress={onPress}
        >
          {postBlock.comments[0] ? (
            <MessageSquareText size={24} color="#f39b6d" />
          ) : (
            <MessageSquare size={24} color="#f39b6d" />
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.separator} />
      <View style={styles.interactContainer}>
        <TouchableOpacity onPress={handleDislike}>
          {postBlock.userHasDisliked ? (
            <UtensilsCrossed size={24} color={"#f39b6d"} />
          ) : (
            <Utensils size={24} color={"#381d2a"} />
          )}
        </TouchableOpacity>
        <View style={styles.voteContainer}>
          <View
            style={[
              StyleSheet.absoluteFillObject,
              { width: `${dislikeWidth}%` },
              { backgroundColor: "#f39b6d", borderRadius: 8, zIndex: 1 },
            ]}
          />
          <View
            style={[
              StyleSheet.absoluteFillObject,
              { width: `${dislikeWidth + likeWidth}%` },
              { backgroundColor: "#aabd8c", borderRadius: 8 },
            ]}
          />
        </View>
        <TouchableOpacity onPress={handleLike} style={{ left: -10 }}>
          {postBlock.userHasLiked ? (
            postBlock.result === "other" ? (
              <Smile size={24} color="#381d2a" />
            ) : (
              <Icon name={postBlock.result} size={24} />
            )
          ) : (
            <Icon name={postBlock.result} size={24} color="#381d2a" />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "80%",
    backgroundColor: "#fcf9f9ff",
    marginVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#ac6139ff",
    shadowOffset: {
      width: 9,
      height: 7,
    },
    shadowOpacity: 0.15,
    shadowRadius: 10,
  },
  image: {
    width: "100%",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    resizeMode: "cover",
    aspectRatio: 1,
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 100,
    marginBottom: 10,
  },
  avatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 100,
    marginBottom: 10,
    backgroundColor: "#0f5519ff",
  },
  userInfo: {
    flex: 1,
    marginLeft: 10,
  },
  username: {
    fontFamily: "Josefin Sans",
    fontSize: 22,
    fontWeight: "bold",
    color: "#381d2a",
    lineHeight: 24,
  },
  description: {
    fontFamily: "Josefin Sans",
    fontSize: 16,
    color: "#381d2a",
    lineHeight: 20,
    width: "90%",
  },
  postInfos: {
    alignItems: "center",
    justifyContent: "center",
  },
  date: {
    fontFamily: "Josefin Sans",
    fontSize: 12,
    color: "#381d2a55",
    lineHeight: 12,
    marginBottom: 4,
  },
  team: {
    width: 40,
    height: 40,
    borderRadius: 100,
    backgroundColor: "#E9E3B4",
    color: "#381d2a",
  },
  message: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  separator: {
    width: "80%",
    height: 1,
    backgroundColor: "#f39b6d",
    marginVertical: 10,
  },
  interactContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    padding: 10,
  },
  icon: {
    marginHorizontal: 10,
  },
  voteContainer: {
    flexDirection: "row",
    justifyContent: "center",
    width: "80%",
    height: 30,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 10,
    left: 5,
  },
});
