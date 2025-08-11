import {
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native";
import Comment from "../components/comment";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import UserBlock from "../components/userBlock";
import { useSelector } from "react-redux";
import { UserState } from "../reducers/user";
import Post from "../components/postContainer";


export default function SignInScreen() {
  return (
    <SafeAreaView style={styles.container}>
      
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
