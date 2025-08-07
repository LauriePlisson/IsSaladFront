import React from "react";
import { StyleProp, ViewStyle } from "react-native";
import { StyleSheet, TouchableOpacity } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

// Type declaration for the props of the CheckButton component
interface CheckButtonProps {
  children: React.ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

export default function CheckButton({
  children,
  onPress,
  style,
}: CheckButtonProps) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
      <FontAwesome name="check" size={20} color={"#f39b6d"} />
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
