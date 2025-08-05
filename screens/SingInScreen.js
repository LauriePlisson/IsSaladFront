import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";

export default function SignInScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text /*style={styles.title}*/>Sign In</Text>
      <TextInput /*style={styles.input}*/ placeholder="username" />
      <TextInput
        /*style={styles.input}*/ placeholder="Password"
        secureTextEntry
      />
      <TouchableOpacity
        /*style={styles.button}*/
        onPress={() => navigation.navigate("TabNavigator")}
      >
        <Text /*style={styles.buttonText}*/>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity
        /*style={styles.button}*/
        onPress={() => navigation.navigate("SignUp")}
      >
        <Text /*style={styles.buttonText}*/>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "yellow",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
