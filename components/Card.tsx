import {View, StyleSheet, ViewStyle, StyleProp} from "react-native";
import React from "react";
import { useThemeColor } from "@/hooks/useThemeColor";
type CardProps = {
  children: React.ReactNode | React.ReactNode[];
  title?: string;
  style?:  StyleProp<ViewStyle>;
};
export default function Card({ children, style }: CardProps) {
  const colors = useThemeColor();
  return (
    <View
      style={[
        styles.cardContainer,
        { backgroundColor: colors.cardBackground },
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "column",
    borderRadius: 20,
    padding: 10,
    overflow: "hidden",
    boxShadow: "0 6 17 rgba(0, 0, 0, .16)",
  },
});
