import React from 'react';
import { StyleProp, TextInput, View, ViewStyle } from 'react-native';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

// Type declaration for the props of the LogButton component
interface SearchProps {
	children: React.ReactNode;
	onPress?: () => void;
	style?: StyleProp<ViewStyle>;
}

export default function SearchContainer({ children, onPress, style}: SearchProps) {
	return (
		<View style={[styles.inputContainer, style]}>
			<FontAwesome name="search" size={20} color="#381D2A" />
			{children}
			<TouchableOpacity onPress={onPress}>
				<FontAwesome name="times" size={20} color="#381D2A" />
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	inputContainer: {
		borderRadius: 8,
		padding: 12,
		width: '80%',
		height: 44,
		backgroundColor: '#E9E3B4',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginVertical: 20,
	}
});