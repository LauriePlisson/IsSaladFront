import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useSelector } from "react-redux";
import { UserState } from "../reducers/user";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const BACKEND_ADDRESS = "http://192.168.100.158:3000";

export default function ResultScreen(props, navigation) {
  const photoUrl = props.route.params.photoUrl;
  const result = props.route.params.result;
  const user = useSelector((state: { user: UserState }) => state.user.value);

  const [description, setDescription] = useState("");

  const UpdateDescription = async () => {
    if (!description.trim()) {
      alert("Merci d'ajouter une description.");
      return;
    }

    try {
      const response = await fetch(
        `${BACKEND_ADDRESS}/posts/updateDescription`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            token: user.token,
            photoUrl,
            description,
          }),
        }
      );

      const data = await response.json();

      if (data.result) {
        alert("Description ajoutée avec succès !");
      } else {
        alert("Erreur : " + data.error);
      }
    } catch (error) {
      console.error("Erreur :", error);
      alert("Erreur lors de l'envoi de la description.");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => props.navigation.navigate("TabNavigator")}
          >
            {/*@ts-ignore*/}
            <FontAwesome name="times" size={25} color="black" />
          </TouchableOpacity>
          <Text style={styles.text}>Nouvelle Publication</Text>
          <TouchableOpacity style={styles.headerButton}>
            {/*@ts-ignore*/}
            <FontAwesome name="arrow-right" size={25} color="black" />
          </TouchableOpacity>
        </View>

        <Image source={{ uri: photoUrl }} style={styles.image} />
        <Text style={styles.result}>Résultat : {result}</Text>

        <TextInput
          placeholder="Ajouter une description..."
          value={description}
          onChangeText={setDescription}
          style={styles.input}
          multiline
        />

        <TouchableOpacity onPress={UpdateDescription} style={styles.button}>
          <Text style={styles.buttonText}>Valider</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#eee5b3",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 30,
    flexDirection: "row",
    width: "100%",
  },
  headerButton: {
    padding: 7,
    borderRadius: 50,
    backgroundColor: "#eee5b3",
    borderWidth: 3,
  },
  text: {
    fontSize: 15,
    borderWidth: 1,
  },
  image: {
    width: "90%",
    height: 300,
    resizeMode: "cover",
    marginTop: 50,
    marginBottom: 20,
    borderRadius: 10,
  },
  result: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    width: "90%",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#de5e1eff",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },
  SignUpContainer: {
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 2,
    borderColor: "#f39b6d",
    width: "80%",
  },
  scroll: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
});
