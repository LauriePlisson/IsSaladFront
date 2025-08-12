import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Pencil } from 'lucide-react-native';


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
				{name && <View style={styles.icon}><Pencil size={20} color="#f39b6d" /></View>}
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
