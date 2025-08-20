import React from "react";
import { StyleProp, TextInput, View, ViewStyle } from "react-native";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

// Type declaration for the props of the InputElem component
interface InputProps {
  children: React.ReactNode;
  onChangeText?: (text: string) => void;
  style?: StyleProp<ViewStyle>;
  secureTextEntry?: boolean;
  value?: string;
}

// Reusable text input component with custom styling and placeholder text
export default function InputElem({ children, onChangeText, style, secureTextEntry = false }: InputProps) {
	return (
		<TextInput
			style={[styles.input, style]}
			placeholder={children as string}
			onChangeText={onChangeText}
			placeholderTextColor="#381D2A55"
			secureTextEntry={secureTextEntry}
		/>
	);
};

const styles = StyleSheet.create({
  input: {
    height: 44,
    width: "80%",
    borderRadius: 8,
    fontFamily: "Josefin Sans",
    fontSize: 24,
  },
});
