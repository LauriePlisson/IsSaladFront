import { useEffect } from "react";

export default function FakeCameraScreen({ navigation }) {
  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.replace("Camera"); // Plus sûr que navigate
    }, 10);

    return () => clearTimeout(timeout);
  }, []);

  return null;
}
