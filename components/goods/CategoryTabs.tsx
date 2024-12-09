import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  LayoutChangeEvent,
  Pressable,
  LayoutRectangle,
} from "react-native";
import { useCallback, useRef, useState } from "react";
import { COLORS } from "@/styles/theme";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useThemeColor } from "@/hooks/useThemeColor";
import { PriorityQueue } from "jest-worker";
import { onGestureHandlerEvent } from "react-native-gesture-handler/lib/typescript/handlers/gestures/eventReceiver";
export function CategoryTabs() {
  const [active, setActive] = useState("");
  const [layoutData, setLayoutData] = useState<any>({});
  const colors = useThemeColor();

  const activeWidth = useSharedValue(0);
  const translateX = useSharedValue(0);
  let maxClamp = useRef(0);
  const categoryList = [
    "洗衣液",
    "牙膏",
    "洗发露",
    "沐浴露",
    "洗面奶",
    "洗洁精",
    "化妆品",
    "肥皂",
  ].map((item, index) => {
    return {
      name: item,
      id: index + "1",
    };
  });
  categoryList.unshift({
    id: "",
    name: "全部",
  });
  function handleLayout(event: LayoutChangeEvent, item: any) {
    console.log("handleLayout");
    const { nativeEvent } = event;
    const { layout } = nativeEvent;
    setLayoutData((prevState: any) => ({
      ...prevState,
      [item.id]: { ...layout },
    }));
    maxClamp.current = layout.x;
    if (item.id === active) {
      translateActive(layout);
    }
  }

  function handleChange(item: any) {
    setActive(item.id);
    const layout = layoutData[item.id];
    translateActive(layout);
  }
  function translateActive(layout: LayoutRectangle) {
    activeWidth.value = withTiming(layout.width - 32);
    translateX.value = withSpring(layout.x + 16, {
      clamp: { min: 0, max: maxClamp.current },
      duration: 1200,
      dampingRatio: 0.5,
    });
  }
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
      width: activeWidth.value,
    };
  });

  return (
    <View className={"flex flex-row items-center justify-start gap-1 relative"}>
      <ScrollView
        className={"relative"}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        {categoryList.map((item) => (
          <Pressable
            className={"z-10"}
            onLayout={(event) => handleLayout(event, item)}
            onPress={() => handleChange(item)}
            key={item.id}
          >
            <View
              style={styles.category}
              className={"pl-4 pt-2 pr-4 pb-2 rounded-xl"}
            >
              <Animated.Text
                style={active === item.id ? styles.activeTab : styles.tab}
                className={`transition duration-300`}
              >
                {item.name}
              </Animated.Text>
            </View>
          </Pressable>
        ))}
        <Animated.View style={[animatedStyle, styles.active]}>
          {<View style={styles.activeBox}></View>}
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  active: {
    position: "absolute",
    left: 0,
    bottom: 0,
    height: 2,
    marginTop: 2,
  },
  activeBox: {
    position: "absolute",
    left: 0,
    top: 0,
    backgroundColor: COLORS.primaryColor,
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  activeTab: {
    color: COLORS.primaryColor,
    fontSize: 16,
    fontWeight: "bold",
  },
  tab: {
    color: COLORS.black,
    fontSize: 14,
    fontWeight: "400",
  },
  category: {
    zIndex: 99,
  },
});
