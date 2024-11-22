import {
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import SearchInput from "@/components/ui/SearchInput";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import GoodsItem from "@/components/goods/GoodsItem";
import { COLORS } from "@/styles/theme";
import { CategoryTabs } from "@/components/goods/CategoryTabs";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Stack } from "expo-router";
import Animated, {
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import PageView from "@/components/PageView";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function StoreScreen() {
  const colors = useThemeColor();
  const insets = useSafeAreaInsets();
  const bottomHeight = useBottomTabBarHeight();
  const headerOpacity = useSharedValue(1);
  const headerHeight = useSharedValue(40);
  const scrollHandler = useAnimatedScrollHandler((event) => {
    const offsetY = event.contentOffset.y;
    if (offsetY > 200 && headerOpacity.value === 1) {
      headerOpacity.value = withTiming(0);
    } else if (offsetY < 200 && headerOpacity.value === 0) {
      headerOpacity.value = withTiming(1);
    }
  });
  console.log(bottomHeight, "bottomHeight");
  const headerAnimatedStyle = useAnimatedStyle(() => {
    const translateY = interpolate(headerOpacity.value, [0, 1], [-50, 0]);
    const height = interpolate(
      headerOpacity.value,
      [0, 1],
      [0, headerHeight.value],
    );
    return {
      height,
      color: COLORS.black,
      opacity: headerOpacity.value,
      transform: [
        {
          translateY,
        },
      ],
    };
  });
  const data: ArrayLike<GoodsType> = new Array(10).fill(0).map((_, i) => {
    return {
      id: i + 1,
      cover:
        "https://img.alicdn.com/imgextra/i2/O1CN01qfSFRM1vCnZtG0TkB_!!2907376137-0-cib.jpg",
      category: "洗衣液",
      brandName: "大公鸡",
      goodsName: "大公鸡洗衣液",
      price: 59,
      quantity: 12,
    };
  });
  function openSort() {}
  return (
    <PageView
      style={{
        flex: 1,
        padding: 10,
      }}
    >
      <Stack.Screen
        options={{
          header: () => (
            <Animated.View
              style={[
                headerAnimatedStyle,
                {
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: insets.top,
                },
              ]}
            >
              <ThemedText style={{ fontSize: 18, fontWeight: "bold" }}>
                全部商品
              </ThemedText>
            </Animated.View>
          ),
          headerShown: true,
          headerTitle: "全部商品",
        }}
      />
      <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 10 }}>
        <SearchInput className={"mb-1"} placeholder={"搜索想要的商品"} />
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={openSort}
        >
          <MaterialCommunityIcons
            name="sort-reverse-variant"
            size={24}
            color="#fff"
          />
        </TouchableOpacity>
      </View>
      <CategoryTabs></CategoryTabs>
      <Animated.FlatList
        onScroll={scrollHandler}
        style={[styles.container, { paddingBottom: bottomHeight }]}
        data={data}
        numColumns={2}
        renderItem={({ item }) => <GoodsItem {...item}></GoodsItem>}
        keyExtractor={(item) => item.id as string}
        keyboardDismissMode={"on-drag"}
        ListFooterComponent={() => (
          <View className={"items-center justify-center"}>
            <ThemedText type={'describe'} style={{marginBottom: bottomHeight}}>
              没有更多了!
            </ThemedText>
          </View>
        )}
      />
    </PageView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
    borderRadius: 5,
    backgroundColor: COLORS.primaryColor,
    marginLeft: 10,
    marginRight: 10,
    boxSizing: "border-box",
  },
  welcome: {
    fontSize: 14,
    color: "#adaaaa",
  },
});
