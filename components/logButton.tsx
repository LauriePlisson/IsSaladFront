import React from "react";
import { StyleProp, ViewStyle } from "react-native";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

// Type declaration for the props of the LogButton component
interface LogButtonProps {
  children: React.ReactNode;
  onPress?: () => void;
  color?: "primary" | "secondary";
  style?: StyleProp<ViewStyle>;
}

// Reusable login button component with customizable color themes and text
export default function ButtonLog({
  children,
  onPress,
  style,
  color = "primary",
}: LogButtonProps) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
      <Text
        style={[
          styles.buttonText,
          color === "primary" ? styles.primaryText : styles.secondaryText,
        ]}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
}

// Login button styles
const styles = StyleSheet.create({
  button: {
    backgroundColor: "#aabd8c",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  buttonText: {
    textAlign: "center",
    fontFamily: "Josefin Sans",
    textTransform: "uppercase",
    fontSize: 14,
    fontWeight: "medium",
  },
  primaryText: {
    color: "#381D2A",
  },
  secondaryText: {
    color: "#57683C",
  },
});

// const styles = StyleSheet.create({
// 	font: {
// 		fontFamily: 'Josefin Sans',
// 		color: '#381D2A',
// 	},
// 	buttonText: {
// 		textTransform: 'uppercase',
// 		fontSize: 14,
// 		fontWeight: 'medium',
// 	},
// 	primary: {
// 		color: '#E9E3B4',
// 	},
// 	secondary: {
// 		color: '#AABD8C',
// 	},
// 	tertiary: {
// 		color: '#F39B6D',
// 	},
// });

// in file:
// import LogButton from './components/logButton';

// export default function App() {
//   let pressed = false;
//   return (
//     <View style={styles.container}>
//         <LoginButton onPress={() => {
//           console.log('Login pressed');
//           pressed = !pressed;
//         }} color={pressed ? 'primary' : 'secondary'}>
//           Login
//         </LoginButton>
//         <Text>Open up App.js to start working on your app!</Text>
//     </View>
//   );
// }
