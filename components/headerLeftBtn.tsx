import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import Icon from './icons';
import { ChevronLeft } from 'lucide-react-native';
// Type declaration for the props of the headerLeftBtn component
interface HeaderLeftBtnProps {
	onPress?: () => void;
	style?: StyleProp<ViewStyle>;
}

export default function headerLeftBtn({ onPress, style }: HeaderLeftBtnProps) {
	return(
		<TouchableOpacity onPress={onPress} style={[styles.container, style]}>
			<ChevronLeft size={24} color="#381D2A" />
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	container: {
		marginLeft: 20,
	},
});