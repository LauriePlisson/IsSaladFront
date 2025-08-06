import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

// Type declaration for the props of the tabBar component
interface tabBarProps {
	onPress?: () => void;
	style?: StyleProp<ViewStyle>;
}

export default function tabBar({ onPress, style }: tabBarProps) {
	return (
		<View style={[styles.menuBar, style]}>
			<View style={[styles.background, style]}>
				<TouchableOpacity onPress={onPress} style={[styles.button, style]}>
					<FontAwesome name="home" size={24} style={styles.icon} />
				</TouchableOpacity>
				<TouchableOpacity onPress={onPress} style={[styles.button, style]}>
					<FontAwesome name="search" size={24} style={styles.icon} />
				</TouchableOpacity>
				<TouchableOpacity onPress={onPress} style={[styles.camBtn, style]}>
					<FontAwesome name="camera" size={24} style={styles.icon} />
				</TouchableOpacity>
				<TouchableOpacity onPress={onPress} style={[styles.button, style]}>
					<FontAwesome name="book" size={24} style={styles.icon} />
				</TouchableOpacity>
				<TouchableOpacity onPress={onPress} style={[styles.button, style]}>
					<FontAwesome name="avatar" size={24} style={styles.icon} />
				</TouchableOpacity>
			</View>
		</View>
	);
};

// tabBar styles
const styles = StyleSheet.create({
	menuBar: {
		width: '100%',
		height: 84,
	},
	background: {
		width: '100%',
		height: 56,
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		backgroundColor: '#aabd8c',
		borderTopLeftRadius: 8,
		borderTopRightRadius: 8,
	},
	button: {
		width: 61,
		height: 56,
		alignItems: 'center',
		justifyContent: 'center',
	},
	camBtn: {
		backgroundColor: '#F39B6D',
		borderRadius: 8,
		width: 61,
		height: 56,
		bottom: 28,
		alignItems: 'center',
		justifyContent: 'center',
	},
	icon: {
		color: '#381D2A',
		tintColor: '#f39b6d'
	},
});

// in file:
// import TabBar from './components/tabBar';

// export default function App() {
//   let pressed = false;
//   return (
//     <View style={styles.container}>
//         <TabBar onPress={() => {
//           console.log('Login pressed');
//           pressed = !pressed;
//         }} />
//     </View>
//   );
// }