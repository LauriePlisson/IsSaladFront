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
  const me = {
    _id: "1",
    username: "JohnDoe",
    avatar: "https://res.cloudinary.com/dtaynthro/image/upload/v1754572742/IsSalad/avatars/ovs9tsmnbbrskt2rhi5l.jpg",
    team: "Salad",
    friendList: ["JaneSmith", "AliceJohnson"],
  };
  const user3 = {
    _id: "3",
    username: "Jean-Michel",
    avatar: "https://res.cloudinary.com/dtaynthro/image/upload/v1754572742/IsSalad/avatars/ovs9tsmnbbrskt2rhi5l.jpg",
    team: "Salad",
    friendList: ["JaneSmith", "AliceJohnson"],
  };
  const user2 = {
    _id: "2",
    username: "JaneSmith",
    avatar: "https://res.cloudinary.com/dtaynthro/image/upload/v1754572742/IsSalad/avatars/ovs9tsmnbbrskt2rhi5l.jpg",
    team: "Salad",
    friendList: ["JohnDoe", "AliceJohnson"],
  };
  let isFriend1 = false;
  if(me.friendList && me.friendList.includes(user3.username))
    isFriend1 = true;
  let isFriend2 = false;
  if(me.friendList && me.friendList.includes(user2.username))
    isFriend2 = true;
  const [comments, setComments] = useState<Comment[]>([
    {
      _id: '13',
      username: "JohnDoe",
      avatar: "https://res.cloudinary.com/dtaynthro/image/upload/v1754572742/IsSalad/avatars/ovs9tsmnbbrskt2rhi5l.jpg",
      content: "This is a comment!",
      team: "Salad",
      date: new Date().toISOString(),
    },
    {
      _id: '21',
      username: "JaneSmith",
      avatar: "https://res.cloudinary.com/dtaynthro/image/upload/v1754572742/IsSalad/avatars/ovs9tsmnbbrskt2rhi5l.jpg",
      content: "Another comment here!",
      team: "Salad",
      date: new Date().toISOString(),
    },
  ]);
  const post = {
    ownerPost: me,
    username: "JohnDoe",
    date: new Date().toISOString(),
    likes: 10,
    dislikes: 30,
    description: "This is a post!",
    photoUrl: "https://res.cloudinary.com/dtaynthro/image/upload/v1754572742/IsSalad/avatars/ovs9tsmnbbrskt2rhi5l.jpg",
    comments: [],
    result: 'Salad',
  };
  return (
    <SafeAreaView style={styles.container}>
      <UserBlock onPress={() => {console.log('Click !')}} children={user3} isFriend={isFriend1}/>
      <UserBlock onPress={() => {console.log('Click !')}} children={user2} isFriend={isFriend2}/>
      <Post onPress={() => {console.log('Click !')}} postBlock={post || undefined}/>
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
