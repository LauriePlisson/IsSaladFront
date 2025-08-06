// screens/CameraScreen.tsx
import React, { useEffect, useState, useRef } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { CameraView, Camera, CameraType } from "expo-camera";
import { useIsFocused } from "@react-navigation/native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import * as ImagePicker from "expo-image-picker";

const BACKEND_ADDRESS = "http://192.168.100.158:3000";

export default function CameraScreen({ navigation }) {
  const cameraRef = useRef<CameraView | null>(null);

  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [facing, setFacing] = useState<CameraType>("back");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const isFocused = useIsFocused();

  useEffect(() => {
    (async () => {
      const result = await Camera.requestCameraPermissionsAsync();
      setHasPermission(result?.status === "granted");
    })();
  }, []);

  if (!hasPermission || !isFocused) {
    return <View />;
  }

  const toggleCameraFacing = () => {
    setFacing((current: CameraType) => (current === "back" ? "front" : "back"));
  };

  const takePicture = async () => {
    const photo: any = await cameraRef.current?.takePictureAsync({
      quality: 0.3,
    });
    console.log("this is", photo);

    const formData = new FormData();

    formData.append("photoUrl", {
      uri: photo.uri,
      name: "photo.jpg",
      type: "image/jpeg",
    });

    formData.append("token", "your_token_here");

    fetch(`${BACKEND_ADDRESS}/posts/createPost`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {});
  };

  const openGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setSelectedImage(uri);

      // Navigation directe vers ResultScreen avec l'URI de la photo
      navigation.navigate("Result" as any, { uri } as any);
    }
  };

  if (!hasPermission || !isFocused) {
    return <View style={styles.container} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => navigation.navigate("TabNavigator")}
        >
          <FontAwesome name="times" size={25} color="black" />
        </TouchableOpacity>
        <Text style={styles.text}>Nouvelle Publication</Text>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => navigation.navigate("Result")}
        >
          <FontAwesome name="arrow-right" size={25} color="black" />
        </TouchableOpacity>
      </View>
      <CameraView
        style={styles.camera}
        facing={facing}
        ref={(ref: any) => (cameraRef.current = ref)}
      />
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton} onPress={openGallery}>
          <FontAwesome name="image" size={40} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.footerBUttonCamera}
          onPress={takePicture}
        >
          <FontAwesome name="camera-retro" size={40} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.footerButton}
          onPress={toggleCameraFacing}
        >
          <FontAwesome name="rotate-right" size={40} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  header: {
    backgroundColor: "#eee5b3",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 30,
    flexDirection: "row",
  },
  text: {
    fontSize: 15,
    borderWidth: 1,
  },
  headerButton: {
    padding: 7,
    borderRadius: 50,
    backgroundColor: "#eee5b3",
    borderWidth: 3,
  },
  camera: {
    flex: 1,
  },
  footer: {
    backgroundColor: "#eee5b3",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 20,
    flexDirection: "row",
  },
  footerButton: {
    padding: 7,
  },
  footerBUttonCamera: {
    padding: 7,
    borderRadius: 10,
    backgroundColor: "#c24c11ff",
    borderWidth: 3,
  },
});
