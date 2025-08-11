import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";

export default function DocScreen({}) {
  return (
    <View style={styles.container}>
      <Text /*style={styles.title}*/>Bienvenue dans IsSalad? !</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
