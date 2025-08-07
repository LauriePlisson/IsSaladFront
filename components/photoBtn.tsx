import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { StyleSheet, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

// Type declaration for the props of the PhotoButton component
interface PhotoButtonProps {
	children?: React.ReactNode;
	onPress?: () => void;
	style?: StyleProp<ViewStyle>;
}

export default function PhotoButton({ children, onPress, style }: PhotoButtonProps) {
	return (
		<TouchableOpacity style={[styles.button, style]} onPress={onPress}>
			<FontAwesome name='camera' size={20} color={'#381d2a'} />
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	button: {
		backgroundColor: '#F39B6D',
		borderRadius: 8,
		width: 61,
		height: 56,
		bottom: 28,
		alignItems: 'center',
		justifyContent: 'center',
	},
});