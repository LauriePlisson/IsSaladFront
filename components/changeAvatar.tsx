import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


// Type declaration for the props of the ChangeAvatar component
interface ChangeAvatarProps {
	name?: string;
	photoPath: string;
	onPress?: () => void;
	style?: StyleProp<ViewStyle>;
}

// ChangeAvatar component
export default function ChangeAvatar({ name, onPress, style, photoPath }: ChangeAvatarProps) {
	return (
			<TouchableOpacity style={[styles.button, styles[name === 'modify' ? 'modify' : 'display'], style]} onPress={onPress}>
				{name && <FontAwesome name='pencil' size={20} style={styles.icon} />}
				<Image source={{ uri: photoPath }} style={styles.avatar} />
			</TouchableOpacity>
		);
	};

const styles = StyleSheet.create({
	button: {
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 100,
		borderColor: '#f39b6d',
		marginVertical: 10,
	},
	icon: {
		color: '#f39b6d',
		position: 'absolute',
		top: 10,
		right: -6,
	},
	modify: {
		width: 174,
		height: 174,
		borderWidth: 4,
	},
	display: {
		width: 40,
		height: 40,
		borderWidth: 2,
	},
	avatar: {
		flex: 1,
		borderRadius: 100,
		resizeMode: 'cover',
		aspectRatio: 1,
	},
});
