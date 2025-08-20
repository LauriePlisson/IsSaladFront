import React from "react";
import {
  KeyboardTypeOptions,
  StyleProp,
  TextInput,
  View,
  ViewStyle,
} from "react-native";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

// Type declaration for the props of the FormContainer component
interface FormContainerProps {
  // children: React.ReactNode;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  text?: string;
  hover?: boolean;
  secureTextEntry?: boolean;
  style?: StyleProp<ViewStyle>;
  value?: React.ReactNode;
  keyboardType?: KeyboardTypeOptions;
}
// Form container component that wraps text inputs with consistent styling and labels
export default function FormContainer({
  secureTextEntry,
  onChangeText,
  placeholder,
  hover,
  text,
  style,
  value,
  keyboardType,
}: FormContainerProps) {
  return (
    <View style={[styles[hover ? "hover" : "formContainer"], style]}>
      {text && <Text style={styles.containerName}>{text}</Text>}
      <TextInput
        style={[styles.input, style]}
        placeholder={placeholder}
        onChangeText={onChangeText}
        placeholderTextColor="#381d2a5a"
        secureTextEntry={secureTextEntry}
        value={value as string}
        keyboardType={keyboardType}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    borderRadius: 8,
    padding: 12,
    width: "80%",
    height: 56,
    backgroundColor: "rgba(248, 235, 213, 0.87)",
    justifyContent: "center",
    alignItems: "flex-start",
    marginVertical: 15,
  },
  containerName: {
    fontFamily: "Josefin Sans",
    fontSize: 16,
    color: "#ac6139ff",
    marginRight: 10,
    top: -7,
    //backgroundColor: "#ffffff78",
    borderRadius: 6,
  },
  input: {
    height: 44,
    width: "80%",
    borderRadius: 8,
    fontFamily: "Josefin Sans",
    fontSize: 24,
  },
  hover: {
    borderWidth: 2,
    borderColor: "#AABD8C",
    borderRadius: 8,
    padding: 12,
    width: "80%",
    height: 56,
    backgroundColor: "#E9E3B4",
    justifyContent: "center",
    alignItems: "flex-start",
    marginVertical: 20,
  },
});
