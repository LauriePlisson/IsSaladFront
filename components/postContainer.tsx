const moment = require('moment');
import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { StyleSheet, Text, Image, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

// Type declaration for the props of the Post component
interface PostProps {
	postBlock: {
		ownerPost: {
			_id: string;
			username: string;
			avatar?: string;
		};
		username: string;
		description: string;
		date: string;
		photoUrl?: string;
		comments?: {
			_id: string;
			username: string;
			avatar: string;
			content: string;
			team?: string;
			date: string;
		}[] | undefined;
		likes?: { _id }[] | undefined;
		dislikes?: { _id }[] | undefined;
		result?: string;
	};
	handleLike: () => void;
	handleDislike: () => void;
	onPress: () => void;
	hasLike?: boolean;
	hasDislike?: boolean;
	style?: StyleProp<ViewStyle>;
}



// Post component
export default function Post({postBlock, style, onPress, handleLike, handleDislike, hasLike, hasDislike}: PostProps) {
	const time: any = moment(postBlock.date);
	const formattedDate: string = moment(time).fromNow();
	let defaultPercentage: number = 100;
	let total: number = 0;
	if (postBlock.likes && postBlock.dislikes) {
		total = postBlock.likes.length + postBlock.dislikes.length;
	} else if (!postBlock.likes && !postBlock.dislikes) {
		total = defaultPercentage
	} else if (!postBlock.likes || !postBlock.dislikes) {
		defaultPercentage = 50;
	};
	console.log('Likes:', postBlock.likes, 'Dislikes:', postBlock.dislikes, 'Total:', total, 'Default Percentage:', defaultPercentage);
	const likePercentage = (total: number) => {
		return Math.round((postBlock.likes.length / total) * 100);
	};
	const dislikePercentage = (total: number) => {
		return Math.round((postBlock.dislikes.length / total) * 100);
	};
	const likeWidth: number = postBlock.likes ? likePercentage(postBlock.likes.length + postBlock.dislikes.length) : (postBlock.dislikes ? 0 : defaultPercentage);
	const dislikeWidth: number = postBlock.dislikes ? dislikePercentage(postBlock.likes.length + postBlock.dislikes.length) : 0;
	return (
		<View style={[styles.container, style]}>
			<Image source={{ uri: postBlock.photoUrl }} style={styles.image} />
			<View style={styles.userContainer}>
				<Image source={{ uri: postBlock.ownerPost.avatar }} style={postBlock.ownerPost.avatar ? styles.avatar : styles.avatarPlaceholder} />
				<View style={styles.userInfo}>
					<Text style={styles.username}>@{postBlock.ownerPost.username}</Text>
					<Text style={styles.description}>{postBlock.description.length > 180 ? postBlock.description.substring(0, 180) + '...' : postBlock.description}</Text>
				</View>
				<View style={styles.postInfos}>
					<Text style={styles.date}>{formattedDate}</Text>
					{postBlock.result && (
						<Image source={{ uri: postBlock.result }} style={styles.team} />
					)}
				</View>
			</View>
			<View style={styles.separator} />
			<View style={styles.interactContainer}>
				<>
					{hasLike ? <FontAwesome name="heart" size={24} color="#f39b6d" style={styles.icon} onPress={handleLike} /> : <FontAwesome name="heart-o" size={24} color="#f39b6d" style={styles.icon} onPress={handleLike} />}
					{hasDislike ? <FontAwesome name="thumbs-down" size={24} color="#f39b6d" style={styles.icon} onPress={handleDislike} /> : <FontAwesome name="thumbs-down" size={24} color="#5a2b11ff" style={styles.icon} onPress={handleDislike} />}
					{/* {postBlock.comments && postBlock.comments.map((comment) => (
						<View key={comment._id} style={styles.userContainer}>
							<Image source={{ uri: comment.avatar }} style={styles.avatar} />
							<Text style={styles.username}>{comment.username}</Text>
							<Text style={styles.date}>{moment(comment.date).fromNow()}</Text>
							<Text style={styles.description}>{comment.content}</Text>
						</View>
					))} */}
					{postBlock.comments[0] ? <FontAwesome name="comment" size={24} color="#f39b6d" style={styles.icon} onPress={onPress} /> : <FontAwesome name="comment-o" size={24} color="#f39b6d" style={styles.icon} onPress={onPress} />}
				</>
				<View style={styles.voteContainer}>
					<View style={[StyleSheet.absoluteFillObject, { width: `${dislikeWidth + likeWidth}%` }, { backgroundColor: '#aabd8c', borderRadius: 8 }]}/>
					<View style={[StyleSheet.absoluteFillObject, { width: `${dislikeWidth}%` }, { backgroundColor: '#f39b6d', borderRadius: 8 }]}/>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		width: '80%',
		backgroundColor: '#fff',
		marginVertical: 10,
		borderRadius: 8,
			alignItems: 'center',
			justifyContent: 'center',
	},
	image: {
		width: '100%',
		borderTopLeftRadius: 8,
		borderTopRightRadius: 8,
		resizeMode: 'cover',
		aspectRatio: 1,
	},
	userContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 12,
	},
	avatar: {
		width: 40,
		height: 40,
		borderRadius: 100,
	},
	avatarPlaceholder: {
		width: 40,
		height: 40,
		borderRadius: 100,
		backgroundColor: '#0f5519ff',
	},
	userInfo: {
		flex: 1,
		marginLeft: 10,
	},
	username: {
		fontFamily: 'Josefin Sans',
		fontSize: 22,
		fontWeight: 'bold',
		color: '#381d2a',
		lineHeight: 24,
	},
	description: {
		fontFamily: 'Josefin Sans',
		fontSize: 16,
		color: '#381d2a',
		lineHeight: 20,
	},
	postInfos: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	date: {
		fontFamily: 'Josefin Sans',
		fontSize: 12,
		color: '#381d2a55',
		lineHeight: 18,
		marginBottom: 4,
	},
	team: {
		width: 40,
		height: 40,
		borderRadius: 100,
		backgroundColor: '#E9E3B4',
	},
	separator: {
		width: '80%',
		height: 1,
		backgroundColor: '#f39b6d',
		marginVertical: 10,
	},
	interactContainer: {
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		alignItems: 'center',
		width: '100%',
		padding: 10,
	},
	icon: {
		marginLeft: 10,
	},
	voteContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		width: '60%',
		height: 30,
		padding: 10,
		borderRadius: 8,
		marginHorizontal: 10,
	},
});