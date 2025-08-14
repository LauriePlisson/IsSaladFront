import React, { useCallback, useEffect, useState } from "react";
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
import Icon from "../components/icons";
import { ChevronRight, Frown, Scroll } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";

interface teamType {
  name?: string;
  icon?: string;
  color?: string;
  description?: string;
}

// const BACKEND_ADDRESS = "http://192.168.100.158:3000";
const lienExpo = process.env.EXPO_PUBLIC_ADDRESS_EXPO;
export default function ResultScreen({ route, navigation }) {
  const photoUrl = route.params.photoUrl;
  const result = route.params.result;
  const user = useSelector((state: { user: UserState }) => state.user.value);

  const [description, setDescription] = useState<string>("");
  const [team, setTeam] = useState<teamType>({});
  const [open, setOpen] = useState<boolean>(false);

  const UpdateDescription = async () => {
    if (!description.trim()) {
      alert("Merci d'ajouter une description.");
      return;
    }

    try {
      const response = await fetch(`${lienExpo}posts/updateDescription`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: user.token,
          photoUrl,
          description,
        }),
      });

      const data = await response.json();

      if (data.result) {
        navigation.navigate("TabNavigator");
      } else {
        alert("Erreur : " + data.error);
      }
    } catch (error) {
      console.error("Erreur :", error);
      alert("Erreur lors de l'envoi de la description.");
    }
  };

  const deletePost = async () => {
    try {
      const response = await fetch(`${lienExpo}posts/deletePost`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: user.token,
          photoUrl, // vient de route.params.photoUrl
        }),
      });

      const data = await response.json();

      if (data.result) {
        // option 1 : simple
        // navigation.navigate("TabNavigator");

        // option 2 : reset la stack pour ne pas revenir sur l’écran courant en "back"
        navigation.navigate("TabNavigator");
      } else {
        alert("Suppression impossible : " + (data.error || "Erreur inconnue"));
      }
    } catch (err) {
      console.error("Erreur suppression :", err);
      alert("Erreur lors de la suppression.");
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetch(`${lienExpo}teams/${result}`)
        .then((res) => res.json())
        .then((team) => {
          if (team.result) {
            setTeam({
              name: team.name,
              icon: team.icon,
              color: team.color,
              description: team.description,
            });
          }
        });
    }, [])
  );

  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton} onPress={deletePost}>
          <Icon name="x" size={25} color="#381d2a" />
        </TouchableOpacity>
        <Text style={styles.text}>Nouvelle Publication</Text>
        <TouchableOpacity style={styles.headerButton}>
          <ChevronRight size={25} color="#381d2a" />
        </TouchableOpacity>
      </View>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={styles.scroll}>
          <View style={styles.resultContainer}>
            {team ? (
              <Icon
                name={team.name?.toLowerCase()}
                size={50}
                color={team.color}
              />
            ) : (
              <Frown size={50} color="#381d2a" />
            )}
            <Text style={styles.result}>
              Is...
              <Text
                style={{
                  fontWeight: 900,
                  fontFamily: "Josefin Sans",
                  color: team.color || "#381d2a",
                }}
              >
                {team.name?.toUpperCase() || "other"}
              </Text>
            </Text>
            {team ? (
              <Icon
                name={team.icon?.toLowerCase()}
                size={50}
                color={team.color}
              />
            ) : (
              <Frown size={50} color="#381d2a" />
            )}
          </View>
          <Image source={{ uri: photoUrl }} style={styles.image} />
          {open && (
            <Text style={styles.textDesc}>
              {team ? team.description : "Pas de description disponible. :("}
            </Text>
          )}
          {open ? (
            <TouchableOpacity
              onPress={() => {
                setOpen(false);
              }}
              style={styles.button}
            >
              <Text style={styles.buttonText}>close</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                setOpen(true);
              }}
              style={styles.button}
            >
              <Text style={styles.buttonText}>{result} ?</Text>
            </TouchableOpacity>
          )}

          {!open && (
            <>
              <TextInput
                placeholder="Ajouter une description..."
                value={description}
                onChangeText={setDescription}
                style={styles.input}
                multiline
              />

              <TouchableOpacity
                onPress={UpdateDescription}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Valider</Text>
              </TouchableOpacity>
            </>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#AABD8C",
    justifyContent: "space-around",
    alignItems: "center",
    height: "10%",
    flexDirection: "row",
    width: "100%",
  },
  headerButton: {
    paddingTop: 10,
    top: 10,
  },
  text: {
    fontSize: 18,
    paddingTop: 10,
    fontFamily: "Josefin Sans",
    color: "#381d2a",
    fontWeight: "bold",
    top: 10,
  },
  textDesc: {
    fontSize: 16,
    fontFamily: "Josefin Sans",
    color: "#381d2a",
    marginVertical: 10,
    textAlign: "justify",
  },
  resultContainer: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
    marginVertical: 20,
    borderRadius: 8,
  },
  result: {
    fontSize: 24,
    fontFamily: "Josefin Sans",
    color: "#381d2a",
    fontWeight: "bold",
    marginTop: 10,
    textAlign: "center",
  },
  input: {
    width: "100%",
    borderColor: "#f39c6dff",
    borderBottomWidth: 1,
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    fontSize: 16,
    marginVertical: 10,
  },
  button: {
    backgroundColor: "#f39c6dff",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginVertical: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontFamily: "Josefin Sans",
    textAlign: "center",
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
