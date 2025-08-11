const moment = require('moment');
import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { StyleSheet, Text, Image, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

interface MiniPostProps {
	postBlock: {
		ownerPost: {
			username: string;
			avatar?: string;
		};
		photoUrl?: string;
	};
	isMine?: boolean;
	onPress: () => void;
	toDelete: () => void;
	style?: StyleProp<ViewStyle>;
}

export default function MiniPost({ postBlock, style, onPress, toDelete, isMine = false }: MiniPostProps) {

	return (
		<View style={[styles.container, style]}>
			{isMine && <FontAwesome name="close" size={24} color="#381d2a" style={styles.icon} onPress={toDelete} />}
			<Image source={{ uri: postBlock.photoUrl }} style={styles.image} />
		</View>
	);
}

