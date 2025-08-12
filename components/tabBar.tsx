import React from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import Icon from "./icons";
import { useIsFocused } from "@react-navigation/native";
import {
  CameraIcon,
  House,
  NotebookText,
  User,
  UserPlus,
} from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";

// Type declaration for the props of the tabBar component
interface tabBarProps {
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

export default function TabBar({ onPress, style }: tabBarProps) {
  const navigation: any = useNavigation();
  let color: string = "#381d2a";
  if (onPress) {
    color = "#f39b6d";
  }
  return (
    <View style={[styles.menuBar, style]}>
      <View style={[styles.background, style]}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("TabNavigator", { screen: "Home" })
          }
          style={[styles.button, style]}
        >
          <House size={24} color={color} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
          <UserPlus size={24} color={color} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onPress} style={[styles.camBtn, style]}>
          <CameraIcon size={24} color={color} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
          <NotebookText size={24} color={color} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
          <User size={24} color={color} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

// tabBar styles
const styles = StyleSheet.create({
  menuBar: {
    width: "100%",
    height: 84,
  },
  background: {
    width: "100%",
    height: 56,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#aabd8c",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  button: {
    width: 61,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
  },
  camBtn: {
    backgroundColor: "#F39B6D",
    borderRadius: 8,
    width: 61,
    height: 56,
    bottom: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    color: "#381D2A",
    tintColor: "#f39b6d",
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
