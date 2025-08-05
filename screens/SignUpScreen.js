import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";

export default function SignUpScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text /*style={styles.title}*/>Sign Up</Text>
      <TextInput /*style={styles.input}*/ placeholder="username" />
      <TextInput /*style={styles.input}*/ placeholder="Email" />
      <TextInput
        /*style={styles.input}*/ placeholder="Password"
        secureTextEntry
      />
      <TouchableOpacity
        /*style={styles.button}*/
        onPress={() => navigation.navigate("SignIn")}
      >
        <Text /*style={styles.buttonText}*/>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "blue",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
