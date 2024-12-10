import {
  Dimensions,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { ReactNode, useEffect, useState } from "react";
import Animated, {
  Easing,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { COLORS } from "@/styles/theme";

type DialogProps = {
  children: ReactNode | JSX.Element;
  visible: boolean;
  hide: () => void;
  wrapperClose?: boolean;
  mask?: boolean;
  animationType?: "slide" | "none" | "fade" | undefined;
};
const { height } = Dimensions.get("window");
let timing: string | number | NodeJS.Timeout | null | undefined = null;
export default function Dialog({
  children,
  visible,
  hide,
  mask,
  wrapperClose = true,
}: DialogProps) {
  const [dialogVisible, setDialogVisible] = useState<boolean>(visible);
  const slideValue = useSharedValue(height);
  const fadeValue = useSharedValue(0);
  useEffect(() => {
    console.log("modalVisible", visible);
    if (visible) {
      showDialog();
    } else {
      hideDialog();
    }
  }, [visible]);
  const dialogAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: fadeValue.value,
      transform: [{ translateY: slideValue.value }],
    };
  });
  const wrapperAnimatedStyle = useAnimatedStyle(() => {
    const bgColor = interpolateColor(
      slideValue.value,
      [height, 0],
      ["transparent", "rgba(0,0,0,0.7)"],
    );
    return {
      backgroundColor: bgColor,
    };
  });
  function showDialog() {
    if (timing) clearTimeout(timing);
    setDialogVisible(true);
    fadeValue.value = withTiming(1, {
      duration: 400,
      easing: Easing.exp,
    });
    slideValue.value = withTiming(0, {
      duration: 500,
    });
  }
  function hideDialog() {
    fadeValue.value = withTiming(0);
    slideValue.value = withTiming(height, {
      duration: 500,
    });
    if (timing) clearTimeout(timing);
    timing = setTimeout(() => {
      setDialogVisible(false);
      hide();
    }, 500);
  }
  function handleWrapper() {
    wrapperClose && hideDialog();
  }
  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={dialogVisible}
      onShow={showDialog}
      onRequestClose={hideDialog}
    >
      <TouchableWithoutFeedback onPress={handleWrapper}>
        <Animated.View style={[wrapperAnimatedStyle, { flex: 1 }]}>
          <Animated.View style={[styles.centeredView, dialogAnimatedStyle]}>
            <TouchableWithoutFeedback>{children}</TouchableWithoutFeedback>
          </Animated.View>
        </Animated.View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
