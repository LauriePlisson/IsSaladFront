import React, { useCallback, useEffect, useState, useRef } from "react";
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
  Keyboard,
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

const lienExpo = process.env.EXPO_PUBLIC_ADDRESS_EXPO;
export default function ResultScreen({ route, navigation }) {
  const photoUrl = route.params.photoUrl;
  const result = route.params.result;
  const user = useSelector((state: { user: UserState }) => state.user.value);

  const [description, setDescription] = useState<string>("");
  const [team, setTeam] = useState<teamType>({});
  const [open, setOpen] = useState<boolean>(false);
  //@ts-ignore
  const ref = useRef<ScrollView | null>(null);

  useEffect(() => {
    const showSubscription = Keyboard.addListener(
      "keyboardDidShow",
      scrollToBottom
    );
    return () => {
      showSubscription.remove();
    };
  }, []);

  const scrollToBottom = () => {
    ref.current.scrollToEnd({ animated: true });
  };

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
        navigation.navigate("TabNavigator", { screen: "Home" });
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
              icon: team.name,
              color: team.color,
              description: team.description,
            });
          }
        });
    }, [])
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton} onPress={deletePost}>
          <Icon name="x" size={25} color="#381d2a" />
        </TouchableOpacity>
        <Text style={styles.text}>Nouvelle Publication</Text>
        {/* <TouchableOpacity style={styles.headerButton}>
          <ChevronRight size={25} color="#381d2a" />
        </TouchableOpacity> */}
      </View>
      <ScrollView
        ref={(scroll: any) => (ref.current = scroll)}
        contentContainerStyle={styles.scroll}
      >
        <View style={styles.resultContainer}>
          {team ? (
            <Icon
              name={team.name?.toLowerCase()}
              size={50}
              color={team.color}
            />
          ) : (
            <Icon name={undefined} size={50} />
          )}
          <Text style={styles.result}>
            Is...
            <Text
              style={{
                fontWeight: 900,
                margin: 0,
                fontFamily: "Josefin Sans",
                color: team.color || "red",
              }}
            >
              {team.name?.toUpperCase() || "ERROR"}
            </Text>
          </Text>
          {team ? (
            <Icon
              name={team.icon?.toLowerCase()}
              size={50}
              color={team.color}
            />
          ) : (
            <Icon name={undefined} size={50} />
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

            <TouchableOpacity onPress={UpdateDescription} style={styles.button}>
              <Text style={styles.buttonText}>Valider</Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    // backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#aabd8c",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    height: "10%",
    flexDirection: "row",
    paddingLeft: 15,
    paddingBottom: 10,
    gap: 70,
  },
  headerButton: {
    paddingTop: 10,
  },
  text: {
    fontSize: 18,
    paddingTop: 10,
    fontFamily: "Josefin Sans",
    color: "#381d2a",
    fontWeight: "bold",
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
    // marginVertical: 20,
    borderRadius: 8,
  },
  result: {
    fontSize: 24,
    fontFamily: "Josefin Sans",
    color: "#381d2a",
    fontWeight: "bold",
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
    // flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
});
