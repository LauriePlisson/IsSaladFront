import React from "react";
import { StyleProp, TextInput, View, ViewStyle } from "react-native";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

// Type declaration for the props of the SettingsInput component
interface SettingsInputProps {
  confirm?: boolean;
  onChangeText?: (text: string) => void;
  onPress?: () => void;
  placeholder?: string;
  value?: string;
  secureTextEntry?: boolean;
  style?: StyleProp<ViewStyle>;
}

// SettingsInput component
export default function SettingsInput({
  confirm,
  secureTextEntry,
  onChangeText,
  placeholder,
  value,
  onPress,
  style,
}: SettingsInputProps) {
  return (
    <View style={[styles.formContainer, style]}>
      <TextInput
        style={[styles.input, style]}
        placeholder={placeholder}
        onChangeText={onChangeText}
        placeholderTextColor="#381d2a5a"
        secureTextEntry={secureTextEntry}
      />

      {onChangeText && !value && !confirm && (
        <FontAwesome
          name="pencil"
          size={20}
          color="#f39b6d"
          style={styles.icon}
        />
      )}
      {value && !confirm && (
        <FontAwesome
          name="check"
          size={20}
          color="#f39b6d"
          style={styles.icon}
          onPress={onPress}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    width: "80%",
    height: "auto",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    borderRadius: 8,
    padding: 12,
    marginVertical: 10,
    backgroundColor: "#E9E3B4",
    paddingVertical: 12,
  },
  input: {
    height: "auto",
    width: "90%",
    fontSize: 20,
    color: "#381d2a",
    fontFamily: "Josefin Sans",
    fontWeight: "bold",
    lineHeight: 28,
  },
  icon: {
    marginLeft: 8,
  },
});
