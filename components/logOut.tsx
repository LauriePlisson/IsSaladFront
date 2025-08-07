import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';


// Type declaration for the props of the LogOut component
interface LogOutProps {
	children: React.ReactNode;
	onPress?: () => void;
	style?: StyleProp<ViewStyle>;
}

// LogOut component
export default function LogOut({ children, onPress, style }: LogOutProps) {
	return (
			<TouchableOpacity style={[styles.button, styles[children === 'Log Out' ? 'logout' : 'delete'], style]} onPress={onPress}>
				<Text style={[styles.text, styles[children === 'Log Out' ? 'logoutText' : 'deleteText'], style]}>{children}</Text>
			</TouchableOpacity>
		);
	};

const styles = StyleSheet.create({
	button: {
		width: '80%',
		height: 56,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 8,
		padding: 12,
		marginVertical: 10,
		paddingVertical: 12,
	},
	text: {
		fontSize: 20,
		color: '#381d2a',
		fontFamily: 'Josefin Sans',
		fontWeight: 'bold',
		lineHeight: 28,
	},
	logout: {
		backgroundColor: '#E9E3B4',
	},
	delete: {
		backgroundColor: '#f39b6d',
	},
	logoutText: {
		color: '#381d2a',
	},
	deleteText: {
		color: '#E9E3B4',
	},
});
