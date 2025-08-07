import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { StyleSheet, Text, Image, View } from 'react-native';

// Type declaration for the props of the Comment component
interface CommentProps {
	children: {
		username: string;
		avatar: string;
		date: number;
		team: string;
	};
	text: string;
	position?: string;
	style?: StyleProp<ViewStyle>;
}
// Comment component
export default function Comment({children, text, style, position = 'first'}: CommentProps) {
	return (
			<View style={[styles.mid, styles[position === 'last' ? 'last' : 'first'], style]}>
				<View style={[styles.user, style]}>
					<Image source={{ uri: children.avatar }} style={styles.avatar} />
					<View style={styles.userInfo}>
						<Text style={styles.username}>{children.username}</Text>
						<Text style={styles.date}>{children.date}</Text>
					</View>
					<Image source={{ uri: children.team }} style={styles.team} />
				</View>
				{text && <Text style={styles.comment}>{text}</Text>}
			</View>
		);
	};

	const styles = StyleSheet.create({
		mid: {
			padding: 12,
			width: '80%',
			backgroundColor: '#f9f9f9',
			borderBottomColor: '#f39b6d55',
			borderBottomWidth: 1,
		},
		last: {
			borderBottomColor: 'transparent',
			borderBottomLeftRadius: 8,
			borderBottomRightRadius: 8,

		},
		first: {
			borderTopLeftRadius: 8,
			borderTopRightRadius: 8,
		},
		user: {
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'flex-start',
			paddingVertical: 10,
			marginBottom: 8,
			width: '100%',
		},
		userInfo: {
			flex: 1,
			top: -6,
		},
		username: {
			fontFamily: 'Josefin Sans',
			fontSize: 22,
			fontWeight: 900,
			color: '#381d2a',
			lineHeight: 24,
		},
		date: {
			fontFamily: 'Josefin Sans',
			fontSize: 12,
			lineHeight: 10,
			color: '#381d2a55',
		},
		comment: {
			fontFamily: 'Josefin Sans',
			fontSize: 16,
			color: '#381D2A',
			marginTop: 4,
			marginBottom: 20,
		},
		avatar: {
			width: 44,
			height: 44,
			borderRadius: 100,
			marginRight: 10,
		},
		team: {
			width: 44,
			height: 44,
			borderRadius: 100,
		},
	});