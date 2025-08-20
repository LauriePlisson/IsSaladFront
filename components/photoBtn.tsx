import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Icon from './icons';
import { Camera, CameraIcon } from 'lucide-react-native';

// Type declaration for the props of the PhotoButton component
interface PhotoButtonProps {
	onPress?: () => void;
	style?: StyleProp<ViewStyle>;
}

// Photo button component that provides camera access functionality
export default function PhotoButton({ onPress, style }: PhotoButtonProps) {
	return (
		<TouchableOpacity style={[styles.button, style]} onPress={onPress}>
			<CameraIcon size={20} color={'#381d2a'} />
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