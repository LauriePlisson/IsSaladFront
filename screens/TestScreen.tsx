import {
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native";
import Comment from "../components/comment";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignInScreen({ navigation }) {
  const user = { username: "test", avatar: "https://res.cloudinary.com/dtaynthro/image/upload/v1754572742/IsSalad/avatars/ovs9tsmnbbrskt2rhi5l.jpg", date: Date.now(), team: 'https://res.cloudinary.com/dtaynthro/image/upload/v1754485826/IsSalad/posts/avugq79eqew6fkmgokca.png' };
  return (
    <SafeAreaView style={styles.container}>
      <Comment text="This is a comment" position="first">{user}</Comment>
      <Comment text="This is another comment" position="last">{user}</Comment>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    color: "#381D2A",
  },
  // avatar: {
  //   flex: 1,
	// 	borderRadius: 100,
  //   resizeMode: 'cover',
  //   aspectRatio: 1,
	// },
  avatar: {
			width: 32,
			height: 32,
			borderRadius: 100,
			marginHorizontal: 4,
			backgroundColor: '#E9E3B4',
		},
});
