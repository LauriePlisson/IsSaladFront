import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import SearchScreen from "./SearchScreen";
import UserScreen from "./UserScreen";
import { useState } from "react";

export default function OptionSearchScreen({ navigation }) {
  const [profil, setProfil] = useState<boolean>(false);
  const change = () => {
    setProfil(!profil);
  };
  return (
    <SafeAreaView style={styles.container}>
      {!profil && <SearchScreen change={change} />}
      {profil && <UserScreen change={change} />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(248, 235, 213, 0.87)",
    alignItems: "center",
    justifyContent: "center",
  },
});
