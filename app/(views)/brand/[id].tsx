import PageView from "@/components/PageView";
import {
  View,
  StyleSheet,
  Image,
  Text,
  ScrollView,
  Pressable,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ThemedText } from "@/components/ThemedText";
import { getBrandDetailApi, getBrandMonthStatisticsApi } from "@/api/brand";
import { useThemeColor } from "@/hooks/useThemeColor";
import { getGoodsListApi } from "@/api/goods";
import Loading from "@/components/ui/Loading";
import GoodsMonthGrid from "@/components/goods/GoodsMonthGrid";

export function BrandListPage() {
  const { id } = useLocalSearchParams();
  const [brandData, setBrandData] = useState<BrandType>({});
  const [monthData, setMonthData] = useState({});
  const [goodsList, setGoodsList] = useState<GoodsType[]>([]);
  const [loading, setLoading] = useState(false);
  const colors = useThemeColor();
  useEffect(() => {
    getBrandDetail();
    getListData();
    getStatistics();
  }, [id]);
  function getStatistics() {
    getBrandMonthStatisticsApi(id).then(({ data }) => {
      console.log(data.data)
      setMonthData(data.data);
    });
  }
  function getBrandDetail() {
    id &&
      getBrandDetailApi(id).then(({ data }) => {
        setBrandData(data.data);
      });
  }
  function getListData() {
    setLoading(true);
    getGoodsListApi({ brand: id })
      .then(({ data }) => {
        setGoodsList(() => {
          return data.data;
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }
  function goDetail(item: GoodsType) {
    router.push(`/(views)/goods/${item.id}`);
  }
  function goAdd() {
    router.push(`/(views)/goods/create?brand=${brandData.id}`);
  }
  return (
    <PageView style={{ ...styles.page, backgroundColor: colors.background }}>
      <View className={"flex flex-row items-center justify-center w-full p-4"}>
        <Image
          source={{
            width: 60,
            height: 60,
            uri: brandData.logo,
          }}
        ></Image>
        <View className={"flex flex-col justify-center gap-2 ml-5"}>
          <ThemedText className={"text-xl font-bold"}>
            {brandData.brandName}
          </ThemedText>
          <Text style={{ color: colors.tabIconDefault, fontSize: 12 }}>
            {brandData.remark}
          </Text>
        </View>
      </View>
      <GoodsMonthGrid data={monthData}></GoodsMonthGrid>
      <ScrollView style={{ flex: 1 }}>
        {loading ? (
          <Loading />
        ) : (
          goodsList.map((item: GoodsType) => (
            <Pressable
              key={item.id}
              className={"flex flex-row flex-grow items-center gap-2 p-5"}
              onPress={() => goDetail(item)}
            >
              <Image
                resizeMode={"contain"}
                style={{
                  width: 60,
                  height: 60,
                }}
                source={
                  item.cover
                    ? { uri: item.cover }
                    : require("@/assets/images/empty-goods.png")
                }
              ></Image>
              <View className={"flex flex-col flex-grow justify-around basis-0"}>
                <Text  className={"text-xl"}>{item.goodsName}</Text>
                <View className={"flex flex-row gap-2 pt-2"}>
                  <Text className={"text-gray-500"}>
                    库存 {item.quantity}件
                  </Text>
                  <Text className={"text-gray-500"}>
                    销量 {item.sales || 0}件
                  </Text>
                </View>
              </View>
            </Pressable>
          ))
        )}
      </ScrollView>
      <Pressable
        onPress={goAdd}
        style={{
          marginHorizontal: 50,
          paddingTop: 10,
        }}
        className={"p-2 bg-green-600 flex flex-row justify-center rounded-xl"}
      >
        <Text className={"text-white"}>添加更多</Text>
      </Pressable>
    </PageView>
  );
}

const styles = StyleSheet.create({
  page: {},
});

export default BrandListPage;
