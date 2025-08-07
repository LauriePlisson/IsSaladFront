// screens/CameraScreen.tsx
import React, { useEffect, useState, useRef } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  Image,
} from "react-native";

import { CameraView, Camera, CameraType } from "expo-camera";
import { useIsFocused } from "@react-navigation/native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useSelector } from "react-redux";
import { UserState } from "../reducers/user";

import * as ImagePicker from "expo-image-picker";

const BACKEND_ADDRESS = "http://192.168.100.158:3000";

export default function CameraScreen({ navigation }) {
  const cameraRef = useRef<CameraView | null>(null);

  const user = useSelector((state: { user: UserState }) => state.user.value);

  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [facing, setFacing] = useState<CameraType>("back");
  const isFocused = useIsFocused();
  const [Result, setResult] = useState<string | null>(null);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

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

    if (!photo) return;

    setPreviewImage(photo.uri);
    setModalVisible(true);
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
      setPreviewImage(uri);
      setModalVisible(true);
    }
  };

  const uploadPhoto = async () => {
    const formData = new FormData();
    formData.append("photoUrl", {
      uri: previewImage,
      name: "photo.jpg",
      type: "image/jpeg",
    } as any);
    formData.append("token", user.token);
    formData.append("date", new Date().toISOString());

    try {
      const response = await fetch(`${BACKEND_ADDRESS}/posts/createPost`, {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const data = await response.json();

      if (data.result) {
        setPhotoUrl(data.post.photoUrl);
        setResult(data.post.result);
        setModalVisible(false);
        navigation.navigate("Result" as any, {
          photoUrl: data.post.photoUrl,
          result: data.post.result,
        });
      } else {
        alert("Erreur : " + data.error);
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi de la photo :", error);
      alert("Une erreur est survenue.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => navigation.navigate("TabNavigator")}
        >
          {/*@ts-ignore*/}
          <FontAwesome name="times" size={25} color="black" />
        </TouchableOpacity>
        <Text style={styles.text}>Nouvelle Publication</Text>
        <TouchableOpacity
          style={styles.headerButton}
          // onPress={() => {
          //   if (photoUrl && Result) {
          //     navigation.navigate("Result" as any, {
          //       photoUrl: photoUrl,
          //       result: Result,
          //     });
          //   } else {
          //     alert("Aucune image ou résultat disponible.");
          //   }
          // }}
        >
          {/*@ts-ignore*/}

          <FontAwesome name="arrow-right" size={25} color="black" />
        </TouchableOpacity>
      </View>
      <CameraView
        style={styles.camera}
        facing={facing}
        ref={(ref: any) => (cameraRef.current = ref)}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.headerModal}>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              {/*@ts-ignore*/}

              <FontAwesome name="times" size={25} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                uploadPhoto();
              }}
            >
              {/*@ts-ignore*/}

              <FontAwesome name="arrow-right" size={25} color="white" />
            </TouchableOpacity>
          </View>
          <View style={styles.modalContent}>
            {previewImage && (
              <Image
                source={{ uri: previewImage }}
                style={styles.previewImage}
                resizeMode="cover"
              />
            )}
          </View>
        </View>
      </Modal>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton} onPress={openGallery}>
          {/*@ts-ignore*/}

          <FontAwesome name="image" size={40} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.footerBUttonCamera}
          onPress={takePicture}
        >
          {/*@ts-ignore*/}

          <FontAwesome name="camera-retro" size={40} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.footerButton}
          onPress={toggleCameraFacing}
        >
          {/*@ts-ignore*/}

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
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  headerModal: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "70%",
    marginBottom: 20,
  },
  modalContent: {
    width: 300,
    height: 300,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  previewImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
});
