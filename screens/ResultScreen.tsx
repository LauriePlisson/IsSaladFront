import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function ResultScreen() {
  return (
    <View style={styles.container}>
      <Text>Résultat de l'IA ici</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
