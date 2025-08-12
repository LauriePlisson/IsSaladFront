import React from "react";
import { StyleProp, TouchableOpacity, ViewStyle } from "react-native";
import { StyleSheet, Text, Image, View } from "react-native";
import Icon from "./icons";
import { UserMinus, UserPlus } from "lucide-react-native";

// Type declaration for the props of the UserBlock component
interface UserBlockProps {
  children?: {
    username: string;
    avatar: string;
    team: string;
  };
  onPress: () => void;
  isFriend?: boolean;
  style?: StyleProp<ViewStyle>;
}
// UserBlock component
export default function UserBlock({children, style, onPress, isFriend = false}: UserBlockProps) {
	return (
		<View style={[styles.container, style]}>
			<Image source={{ uri: children.avatar }} style={styles.avatar} />
			<View style={styles.userInfo}>
				<Text style={styles.username}>{children.username}</Text>
				<Text style={styles.team}>{children.team}</Text>
			</View>
      <TouchableOpacity style={styles.icon} onPress={onPress}>
        {!isFriend ? (
          <UserPlus size={24} color="#381d2a"/>
        ) : (
          <UserMinus size={24} color="#381d2a"/>
        )}
      </TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    width: "80%",
    backgroundColor: "#e9e3b4",
    marginVertical: 10,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  userInfo: {
    flex: 1,
  },
  username: {
    fontFamily: "Josefin Sans",
    fontSize: 22,
    fontWeight: 900,
    color: "#381d2a",
    lineHeight: 24,
  },
  team: {
    fontFamily: "Josefin Sans",
    fontSize: 16,
    color: "#381d2a55",
    lineHeight: 20,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 100,
    marginRight: 10,
  },
  icon: {
    width: 24,
    height: 24,
    marginLeft: 10,
  },
});
