import React from "react";
import { StyleSheet, TextInput, View, ViewStyle } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export default function LabelMove({
  label,
  style,
  height = 0,
  render,
}: {
  render: (move: (flag: boolean) => void) => React.ReactNode;
  label: string;
  style?: ViewStyle;
  height: number;
}) {
  const centerTop = height / 2 - 7;
  const labelTop = useSharedValue(centerTop);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      top: labelTop.value,
    };
  });
  function labelMove(move: boolean) {
    labelTop.value = withTiming(move ? -7 : centerTop);
  }
  return (
    <View style={[styles.moveBox, style, { height }]}>
      {render(labelMove)}
      <Animated.Text style={[styles.label, animatedStyle]}>
        {label}
      </Animated.Text>
    </View>
  );
}
const styles = StyleSheet.create({
  moveBox: {
    paddingLeft: 20,
    borderRadius: 10,
    backgroundColor: "#F1F4FF",
    position: "relative",
    marginVertical: 20,
  },
  label: {
    position: "absolute",
    color: "#626262",
    left: 30,
  },
});
