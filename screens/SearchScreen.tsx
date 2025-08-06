import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";

export default function SearchScreen({}) {
  return (
    <View style={styles.container}>
      <Text /*style={styles.title}*/>Search Screen</Text>
      <TextInput /*style={styles.input}*/ placeholder="Search..." />
      <TouchableOpacity /*style={styles.button}*/>
        <Text /*style={styles.buttonText}*/>Search</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "purple",
    alignItems: "center",
    justifyContent: "center",
  },
});
