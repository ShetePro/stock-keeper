import { View, StyleSheet, TouchableOpacity } from "react-native";
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
import { useEffect, useState } from "react";
import { getGoodsListApi } from "@/api/goods";
import Loading from "@/components/ui/Loading";

export default function StoreScreen() {
  const [goodsList, setGoodsList] = useState<GoodsType[]>([]);
  const insets = useSafeAreaInsets();
  const bottomHeight = useBottomTabBarHeight();
  const headerOpacity = useSharedValue(1);
  const headerHeight = useSharedValue(40);
  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<{
    goodsName: string;
    category: string;
  }>({
    goodsName: '',
    category: ''
  });
  const scrollHandler = useAnimatedScrollHandler((event) => {
    const offsetY = event.contentOffset.y;
    if (offsetY > 200 && headerOpacity.value === 1) {
      headerOpacity.value = withTiming(0);
    } else if (offsetY < 200 && headerOpacity.value === 0) {
      headerOpacity.value = withTiming(1);
    }
  });
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

  function changeGoodsName (value: string) {
    setSearch((prevState) => {
      return {
        ...prevState,
        goodsName: value
      }
    })
  }
  function openSort() {
    getListData();
  }
  function changeCategory (value: string) {
    setSearch((prevState) => {
      return {
        ...prevState,
        category: value
      }
    })
  }
  useEffect(() => {
    getListData()
  }, [search]);

  function getListData() {
    setLoading(true);
    getGoodsListApi(search)
      .then(({ data }) => {
        setGoodsList(() => {
          return data.data;
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }
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
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 10,
        }}
      >
        <SearchInput className={"mb-1"} placeholder={"搜索想要的商品"} onChange={changeGoodsName} />
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
      <CategoryTabs onChange={changeCategory}></CategoryTabs>
      {loading ? <Loading></Loading> : <Animated.FlatList
        onScroll={scrollHandler}
        style={[styles.container, { paddingBottom: bottomHeight }]}
        data={goodsList}
        numColumns={2}
        renderItem={({ item }) => <GoodsItem {...item}></GoodsItem>}
        keyExtractor={(item) => item.id as string}
        keyboardDismissMode={"on-drag"}
        ListFooterComponent={() => (
          <View className={"items-center justify-center"}>
            <ThemedText
              type={"describe"}
              style={{ marginBottom: bottomHeight }}
            >
              没有更多了!
            </ThemedText>
          </View>
        )}
      />}
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
