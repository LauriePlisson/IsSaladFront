// screens/CameraScreen.tsx
import React, { useEffect, useState, useRef } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  Image,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";

import Icon from "../components/icons";

import { CameraView, Camera, CameraType } from "expo-camera";
import { useIsFocused } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { UserState } from "../reducers/user";

import * as ImagePicker from "expo-image-picker";
import {
  CameraIcon,
  ChevronRight,
  Images,
  SwitchCameraIcon,
} from "lucide-react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

// const BACKEND_ADDRESS = "http://192.168.100.158:3000";
const lienExpo = process.env.EXPO_PUBLIC_ADDRESS_EXPO;
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

  const [isUploading, setIsUploading] = useState(false); // 👈

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
    if (isUploading) return;
    const photo: any = await cameraRef.current?.takePictureAsync({
      quality: 0.3,
    });

    if (!photo) return;

    setPreviewImage(photo.uri);
    setModalVisible(true);
  };
  const openGallery = async () => {
    if (isUploading) return;
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
    if (!previewImage || isUploading) return;
    setIsUploading(true);
    const formData = new FormData();
    formData.append("photoUrl", {
      uri: previewImage,
      name: "photo.jpg",
      type: "image/jpeg",
    } as any);
    formData.append("token", user.token);
    formData.append("date", new Date().toISOString());

    try {
      const response = await fetch(`${lienExpo}posts/createPost`, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "multipart/form-data",
          "Content-Type": "multipart/form-data",
        },
      });

      const data = await response.json();

      if (data.result) {
        setPhotoUrl(data.post.photoUrl);
        setResult(data.post.result);
        setModalVisible(false);
        setIsUploading(false);
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
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => navigation.navigate("TabNavigator")}
            disabled={isUploading}
          >
            <Icon name="x" size={25} color="#381d2a" />
          </TouchableOpacity>
          <Text style={styles.text}>Nouvelle Publication</Text>
          <TouchableOpacity style={styles.headerButton}>
            <ChevronRight size={25} color="#381d2a" />
          </TouchableOpacity>
        </View>
        <CameraView
          style={styles.camera}
          facing={facing}
          ref={(ref: any) => (cameraRef.current = ref)}
        />
        <Modal
          animationType="slide"
          statusBarTranslucent={true} //Android only
          navigationBarTranslucent={true} //Android only
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            if (isUploading) return; // 👈 empêche la fermeture pendant l'upload
            setModalVisible(false);
          }}
        >
          <View style={styles.modalContainer}>
            <View style={styles.headerModal}>
              {!isUploading ? (
                <>
                  <TouchableOpacity onPress={() => setModalVisible(false)}>
                    <Icon name="x" size={25} color="#f39b6d" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={uploadPhoto}>
                    <ChevronRight size={25} color="#f39b6d" />
                  </TouchableOpacity>
                </>
              ) : (
                <View style={styles.loadingWrap}>
                  <ActivityIndicator size="small" />
                  <Text style={styles.loadingText}>Analyse en cours…</Text>
                </View>
              )}
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
            <Images size={40} color="#381d2a" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.footerBUttonCamera}
            onPress={takePicture}
          >
            <CameraIcon size={40} color="#381d2a" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.footerButton}
            onPress={toggleCameraFacing}
          >
            <SwitchCameraIcon size={40} color="#381d2a" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  header: {
    backgroundColor: "#aabd8c",
    justifyContent: "space-around",
    alignItems: "center",
    height: "10%",
    flexDirection: "row",
  },
  text: {
    fontSize: 18,
    fontFamily: "Josefin Sans",
    color: "#381d2a",
    fontWeight: "bold",
    top: 15,
  },
  headerButton: {
    top: 15,
  },
  camera: {
    flex: 1,
  },
  footer: {
    backgroundColor: "#aabd8c",
    justifyContent: "space-around",
    alignItems: "center",
    height: "11%",
    borderRadius: 8,
    flexDirection: "row",
  },
  footerButton: {
    paddingVertical: 20,
    bottom: 15,
  },
  footerBUttonCamera: {
    padding: 10,
    bottom: 15,
    borderRadius: 8,
    backgroundColor: "#f39b6d",
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
    alignItems: "center", // 👈
  },
  loadingWrap: {
    // 👈
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  loadingText: {
    // 👈
    color: "#f39b6d",
    fontWeight: "600",
  },
  modalContent: {
    width: "80%",
    aspectRatio: 1,
    backgroundColor: "#f39b6d",
    borderRadius: 8,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  previewImage: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
});
