import React from 'react';
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native';
import { StyleSheet, Image, View } from 'react-native';
import Icon from './icons';
import { Trash2 } from 'lucide-react-native';


interface MiniPostProps {
  postBlock: {
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
  isMine?: boolean;
  onPress: () => void;
  toDelete: () => void;
  style?: StyleProp<ViewStyle>;
}


export default function MiniPost({ postBlock, style, onPress, toDelete, isMine = false }: MiniPostProps) {

	return (
		<View style={[styles.container, style]}>
			{isMine && <TouchableOpacity style={styles.icon} onPress={toDelete} ><Trash2 size={16} color="#381d2a7e" /></TouchableOpacity>}
			<TouchableOpacity onPress={onPress}>
				<Image source={{ uri: postBlock.photoUrl }} style={styles.image} />
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e9e3b4",
    marginVertical: 10,
    borderRadius: 8,
    alignItems: "flex-end",
  },
  imgContainer: {
    alignItems: "flex-end",
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 8,
    aspectRatio: 1,
  },
  icon: {
    right: 5,
    top: 5,
    zIndex: 1,
    position: "absolute",
    backgroundColor: "#f39c6d8d",
    borderRadius: 100,
    padding: 5,
  },
});
