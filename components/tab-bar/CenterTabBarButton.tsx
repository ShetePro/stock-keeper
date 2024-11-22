import { View, StyleSheet, Pressable, useColorScheme } from "react-native";
import { COLORS } from "@/styles/theme";
import Feather from "@expo/vector-icons/Feather";
import { navigate } from "expo-router/build/global-state/routing";
import { router } from "expo-router";
import { Colors } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function CenterTabBarButton() {
  const colors = useThemeColor();
  function goCreateGoods() {
    router.push("/(views)/createGoods");
  }
  return (
    <Pressable style={styles.centerWarp} onPress={goCreateGoods}>
      <View style={[styles.centerButton, { backgroundColor: colors.active }]}>
        <Feather name="plus" size={24} color={colors.background} />
      </View>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  centerWarp: {
    position: "absolute",
    left: "50%",
    transform: [{ translateX: "-50%" }],
    top: -20,
    width: 60,
    height: 60,
    borderRadius: "50%",
    padding: 5,
    zIndex: 99,
  },
  centerButton: {
    borderRadius: 25,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
});
