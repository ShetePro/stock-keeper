import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "@/styles/theme";
import { LinearGradient } from "expo-linear-gradient";

type TagProps = {
  label: string;
  type: "primary" | "success" | "info" | "warning" | "danger";
  color?: string;
};
export default function Tag(props: TagProps) {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[COLORS.primaryColor, "#6366f1"]}
        style={{ ...styles[props.type], ...styles.dynamicBox }}
      >
        <Text className={"text-gray-100 text-mini"}>{props.label}</Text>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  primary: {},
  success: {
    backgroundColor: COLORS.successColor,
  },
  warning: {
    backgroundColor: COLORS.warningColor,
  },
  danger: {
    backgroundColor: COLORS.dangerColor,
  },
  info: {
    backgroundColor: COLORS.infoColor,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  dynamicBox: {
    padding: 5,
    borderRadius: 5,
  },
});
