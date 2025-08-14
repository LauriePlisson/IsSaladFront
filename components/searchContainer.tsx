import React from "react";
import { StyleProp, TextInput, View, ViewStyle } from "react-native";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import Icon from "./icons";
import InputElem from "./InputElem";
import { Search } from "lucide-react-native";

// Type declaration for the props of the LogButton component
interface SearchProps {
  children: React.ReactNode;
  onPress?: () => void;
  onChangeText?: (text: string) => void;
  style?: StyleProp<ViewStyle>;
  value?: string;
}

export default function SearchContainer({
  children,
  onPress,
  style,
  onChangeText,
  value,
}: SearchProps) {
  return (
    <View style={[styles.inputContainer, style]}>
      <InputElem
        children={children}
        onChangeText={onChangeText}
        value={value}
      />
      <TouchableOpacity onPress={onPress}>
        <Search size={20} color="#381D2A" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    borderRadius: 8,
    padding: 12,
    width: "80%",
    height: 44,
    backgroundColor: "#E9E3B4",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 20,
  },
});
