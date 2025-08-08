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
			avatar: string;
			team?: string;
			friendList?: string[];
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
		likes?: number | undefined;	
		dislikes?: number | undefined;
		result?: string;
	};
	onPress: () => void;
	style?: StyleProp<ViewStyle>;
}



// Post component
export default function Post({postBlock, style, onPress}: PostProps) {
	let defaultPercentage = 100;
	const time = moment(postBlock.date);
	const formattedDate = moment(time).fromNow();
	const likePercentage = (total: number) => {
		return Math.round((postBlock.likes / total) * 100);
	};
	const dislikePercentage = (total: number) => {
		return Math.round((postBlock.dislikes / total) * 100);
	};
	const likeWidth: number = postBlock.likes !== 0 ? likePercentage(postBlock.likes + postBlock.dislikes) : (postBlock.dislikes === 0 ? defaultPercentage : 0);
	const dislikeWidth: number = postBlock.dislikes ? dislikePercentage(postBlock.likes + postBlock.dislikes) : 0;
	return (
		<View style={[styles.container, style]}>
			<Image source={{ uri: postBlock.photoUrl }} style={styles.image} />
			<View style={styles.userContainer}>
				<Image source={{ uri: postBlock.ownerPost.avatar }} style={styles.avatar} />
				<View style={styles.userInfo}>
					<Text style={styles.username}>{postBlock.ownerPost.username}</Text>
					<Text style={styles.description}>{postBlock.description.length > 180 ? postBlock.description.substring(0, 180) + '...' : postBlock.description}</Text>
				</View>
				<View style={styles.postInfos}>
					<Text style={styles.date}>{formattedDate}</Text>
					{postBlock.ownerPost.team && (
						<Image source={{ uri: postBlock.ownerPost.team }} style={styles.team} />
					)}
				</View>
			</View>
			<View style={styles.separator} />
			<View style={styles.interactContainer}>
				<>
					{postBlock.likes ? <FontAwesome name="heart" size={24} color="#f39b6d" style={styles.icon} onPress={onPress} /> : <FontAwesome name="heart-o" size={24} color="#f39b6d" style={styles.icon} onPress={onPress} />}
					{postBlock.dislikes ? <FontAwesome name="thumbs-down" size={24} color="#f39b6d" style={styles.icon} onPress={onPress} /> : <FontAwesome name="thumbs-down-o" size={24} color="#f39b6d" style={styles.icon} onPress={onPress} />}
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
		// maxHeight: 400,
		backgroundColor: '#fff',
		marginVertical: 10,
		borderRadius: 8,
			alignItems: 'center',
			justifyContent: 'center',
	},
	image: {
		width: '100%',
		height: '65%',
		// height: 200,
		// maxHeight: 360,
		// maxWidth: 360,
		borderTopLeftRadius: 8,
		borderTopRightRadius: 8,
		resizeMode: 'cover',
	},
	userContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 12,
	},
	avatar: {
		width: 32,
		height: 32,
		borderRadius: 100,
		marginHorizontal: 4,
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
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	date: {
		fontFamily: 'Josefin Sans',
		fontSize: 14,
		color: '#381d2a55',
		lineHeight: 18,
	},
	team: {
		width: 32,
		height: 32,
		borderRadius: 100,
		marginHorizontal: 4,
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
		width: '69%',
		height: 30,
		padding: 10,
		borderRadius: 8,
		marginHorizontal: 10,
	},
});