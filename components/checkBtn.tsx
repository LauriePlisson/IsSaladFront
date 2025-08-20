import React from "react";
import { StyleProp, ViewStyle } from "react-native";
import { StyleSheet, TouchableOpacity } from "react-native";
import Icon from "./icons";
import { Check } from "lucide-react-native";

// Type declaration for the props of the CheckButton component
interface CheckButtonProps {
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

// Reusable check button component with custom styling and onPress handler
export default function CheckButton({
  onPress,
  style,
}: CheckButtonProps) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
      <Check size={20} color={"#f39b6d"} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#efe9c2",
    borderRadius: 8,
    padding: 12,
    width: 61,
    height: 41,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
});
