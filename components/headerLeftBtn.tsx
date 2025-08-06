import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

// Type declaration for the props of the headerLeftBtn component
interface HeaderLeftBtnProps {
	onPress?: () => void;
	style?: StyleProp<ViewStyle>;
}

export default function headerLeftBtn({ onPress, style }: HeaderLeftBtnProps) {
	return(
		<TouchableOpacity onPress={onPress} style={[styles.container, style]}>
			<FontAwesome name="arrow-left" size={24} color="#381D2A" />
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	container: {
		marginLeft: 20,
	},
});