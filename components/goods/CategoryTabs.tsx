import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  LayoutChangeEvent,
  Pressable,
  LayoutRectangle,
} from "react-native";
import { useRef, useState} from "react";
import { COLORS } from "@/styles/theme";
import Animated, {
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import {useThemeColor} from "@/hooks/useThemeColor";
export function CategoryTabs() {
  const [active, setActive] = useState("");
  const [layoutData, setLayoutData] = useState<any>({});
  const colors = useThemeColor()

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
    const layout = layoutData[item.id];
    translateActive(layout);
    setActive(item.id);
  }
  function translateActive(layout: LayoutRectangle) {
    activeWidth.value = withTiming(layout.width - 32);
    translateX.value = withSpring(layout.x + 16, {
      clamp: { min: 0, max: maxClamp.current },
      duration: 1200,
      dampingRatio: 0.5
    });
  }

  return (
    <View className={"flex flex-row items-center justify-start gap-1 relative"}>
      <ScrollView
        className={"relative"}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        {categoryList.map((item, index) => (
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
              <Text
                style={{
                  color: item.id === active ? colors.active : colors.tint,
                  fontWeight: item.id === active ? 'bold' : '400',
                  fontSize: item.id === active ? 16 : 14,
                }}
                className={"transition duration-300"}
              >
                {item.name}
              </Text>
            </View>
          </Pressable>
        ))}
        <Animated.View
          style={{ transform: [{ translateX }], width: activeWidth, ...styles.active }}
        >
          {activeWidth && <View style={styles.activeBox}></View>}
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
  category: {
    zIndex: 99,
  },
});
