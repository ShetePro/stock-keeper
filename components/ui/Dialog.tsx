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
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

type DialogProps = {
  children: ReactNode | JSX.Element;
  visible: boolean;
  hide: () => void;
  animationType?: "slide" | "none" | "fade" | undefined;
};
const { height } = Dimensions.get("window");
let timing: string | number | NodeJS.Timeout | null | undefined = null;
export default function Dialog({ children, visible, hide }: DialogProps) {
  const [dialogVisible, setDialogVisible] = useState<boolean>(visible);
  const slideValue = useSharedValue(height);
  const fadeValue = useSharedValue(0);
  useEffect(() => {
    console.log('modalVisible', visible)
    if (visible) {
      showDialog()
    }else {
      hideDialog()
    }
  }, [visible]);
  const dialogAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: fadeValue.value,
      transform: [{ translateY: slideValue.value }],
    };
  });
  function showDialog() {
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
  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={dialogVisible}
      onShow={showDialog}
      onRequestClose={hideDialog}
    >
      <TouchableWithoutFeedback onPress={hideDialog}>
        <Animated.View style={[styles.centeredView, dialogAnimatedStyle]}>
          <TouchableWithoutFeedback>
            <View>{children}</View>
          </TouchableWithoutFeedback>
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
