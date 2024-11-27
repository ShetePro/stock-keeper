import {
  View,
  StyleSheet,
  Pressable,
  Image,
  ViewStyle,
  Platform,
  Alert,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useThemeColor } from "@/hooks/useThemeColor";
import * as WebImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";

export default function GoodsPicture({
  url,
  style,
  onChange,
}: {
  url: any;
  onChange: (...event: any[]) => void;
  style?: ViewStyle;
}) {
  const [uri, setUri] = useState<string>(url);
  const colors = useThemeColor();
  let ImagePicker: {
    openPicker: (arg0: {
      width: number;
      height: number;
      cropping: boolean;
    }) => Promise<any>;
  };
  useEffect(() => {
    if (Platform.OS !== "web") {
      ImagePicker = require("react-native-image-crop-picker");
    }
  }, []);

  const pickImageAsync = async () => {
    let result = await WebImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    });
    return result;
  };

  function handlePress() {
    if (Platform.OS === "web") {
      pickImageAsync().then(({ assets }) => {
        if (assets?.[0]) {
          setUri(assets[0].uri);
        }
      });
      return;
    }
    ImagePicker?.openPicker?.({
      width: 150,
      height: 200,
      cropping: true,
    }).then((image) => {
      console.log(image.path);
      setUri(image.path);
      onChange?.(image.path);
    });
  }

  function imageLayout(e: any) {
    console.log(e.nativeEvent.layout);
  }
  return (
    <View
      onLayout={imageLayout}
      style={[styles.container, !uri && styles.upload, style]}
    >
      <Pressable style={styles.pressable} onPress={handlePress}>
        {uri ? (
          <Image style={styles.image} source={{ uri }}></Image>
        ) : (
          <Entypo name="plus" size={24} color={colors.icon} />
        )}
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    overflow: "hidden",
    margin: 10,
    minHeight: 100,
    width: 150,
    height: 200,
  },
  pressable: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  upload: {
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#ccc",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});
