import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

export default function ResultScreen(props) {
  const photoUrl = props.route.params.photoUrl;
  const result = props.route.params.result;

  return (
    <View style={styles.container}>
      <Image source={{ uri: photoUrl }} style={styles.image} />
      <Text style={styles.result}>Résultat IA : {result}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 300,
    resizeMode: "cover",
    marginBottom: 20,
  },
  result: {
    fontSize: 20,
    marginTop: 20,
    textAlign: "center",
  },
});
