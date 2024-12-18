import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  LayoutChangeEvent,
  Pressable,
  LayoutRectangle,
} from "react-native";
import { useRef, useState } from "react";
import { COLORS } from "@/styles/theme";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

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
export function CategoryTabs() {
  const [tabActive, setTabActive] = useState("");
  const [layoutData, setLayoutData] = useState<any>({});

  const activeWidth = useSharedValue(0);
  const translateX = useSharedValue(0);
  let maxClamp = useRef(0);

  function handleLayout(event: LayoutChangeEvent, item: any) {
    const { nativeEvent } = event;
    const { layout } = nativeEvent;
    setLayoutData((prevState: any) => ({
      ...prevState,
      [item.id]: { ...layout },
    }));
    maxClamp.current = layout.x;
    if (item.id === tabActive) {
      translateActive(layout);
    }
  }

  function handleChange(item: any) {
    setTabActive(item.id);
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
            key={item.name}
          >
            <View
              style={styles.category}
              className={"pl-4 pt-2 pr-4 pb-2 rounded-xl"}
            >
              {tabActive === item.id && (
                <Text
                  style={styles.activeTab}
                  className={`transition duration-300`}
                >
                  {item.name}
                </Text>
              )}
              {tabActive !== item.id && <Text
                style={styles.tab}
                className={`transition duration-300`}
              >
                {item.name}
              </Text> }
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
