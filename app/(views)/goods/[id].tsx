import PageView from "@/components/PageView";
import { useLocalSearchParams } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { useEffect, useState } from "react";
import {
  getGoodsDetailApi,
  getGoodsMonthDataApi,
  getGoodsRecordApi,
} from "@/api/goods";
import {
  StyleSheet,
  Image,
  TouchableHighlight,
  View,
  Text,
  ScrollView,
} from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import Tag from "@/components/ui/Tag";
import Feather from "@expo/vector-icons/Feather";
import RecordTable from "@/components/goods/RecordTable";
import GoodsOperate from "@/components/goods/GoodsOperate";
import Dialog from "@/components/ui/Dialog";
import GoodsMonthGrid from "@/components/goods/GoodsMonthGrid";
export default function GoodsDetail() {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [operateType, setOperateType] = useState<number>(1);
  const { id } = useLocalSearchParams();
  const [goodsData, setGoodsData] = useState<GoodsType>();
  const [goodsMonthData, setGoodsMonthData] = useState({});
  const [recordData, setRecordData] = useState([]);
  const colors = useThemeColor();
  useEffect(() => {
    getData();
  }, [id]);

  function getData() {
    getGoodsDetail();
    getGoodsRecord();
    getGoodsMonthData();
  }
  function getGoodsDetail() {
    id &&
      getGoodsDetailApi(id).then(({ data }) => {
        setGoodsData(() => data.data);
      });
  }
  function getGoodsRecord(params?: any) {
    getGoodsRecordApi({
      type: "",
      ...params,
      goodsId: id,
    }).then(({ data }) => {
      setRecordData(() => data.data);
    });
  }
  function getGoodsMonthData() {
    id &&
      getGoodsMonthDataApi({ goodsId: id }).then(({ data }) => {
        console.log("商品月度统计", data.data);
        setGoodsMonthData(data.data);
      });
  }
  function handleAdd() {
    setOperateType(1);
    setModalVisible(true);
  }
  function handleReduce() {
    setOperateType(2);
    setModalVisible(true);
  }
  return (
    <PageView style={{ backgroundColor: colors.background }}>
      <ScrollView style={{ flex: 1 }}>
        <Image
          className={"w-full h-[300px] object-cover"}
          source={
            goodsData?.cover
              ? { uri: goodsData.cover }
              : require("@/assets/images/empty-goods.png")
          }
        />
        <View className={"ml-5 mr-5"}>
          <View className={"flex flex-row justify-between"}>
            <ThemedText type={"subtitle"} className={"mb-5"}>
              {goodsData?.goodsName}
            </ThemedText>
            <Text className={"text-red-500 text-2xl font-bold"}>
              ¥{goodsData?.price || "-"}
            </Text>
          </View>
          <View className={"flex-row justify-between"}>
            <Tag label={goodsData?.category} type={"primary"}></Tag>
            <ThemedText type={"describe"} className={"text-gray-400 text-mini"}>
              剩余{goodsData?.quantity}件
            </ThemedText>
          </View>
          <View className={"mt-2 flex flex-row flex-wrap gap-5"}>
            <ThemedText type={"describe"}>
              商品条码: {goodsData?.barcode}
            </ThemedText>
            <ThemedText type={"describe"}>
              品牌: {goodsData?.brandName}
            </ThemedText>
            <ThemedText type={"describe"}>
              规格: {goodsData?.model || "-"}
            </ThemedText>
          </View>
        </View>
        <GoodsMonthGrid data={goodsMonthData}></GoodsMonthGrid>
        <RecordTable data={recordData} search={getGoodsRecord}></RecordTable>
      </ScrollView>

      <Dialog visible={modalVisible} hide={() => setModalVisible(false)}>
        <GoodsOperate
          goodsData={goodsData}
          type={operateType}
          hide={() => setModalVisible(false)}
          confirmCallback={getData}
        ></GoodsOperate>
      </Dialog>
      <View
        className={
          "absolute bottom-10 w-full flex flex-row items-center justify-around"
        }
      >
        <TouchableHighlight
          style={{
            ...styles.handleBtn,
            backgroundColor: "#00CC66",
            boxShadow: `0 3 10 #00CC66`,
          }}
          underlayColor="#00CC99"
          onPress={handleAdd}
        >
          <View className={"flex flex-row items-center justify-center"}>
            <Feather name="log-in" size={16} color="white" />
            <Text className={"text-white ml-2"}>入库</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          style={{
            ...styles.handleBtn,
            backgroundColor: colors.active,
            boxShadow: `0 3 10 ${colors.active}`,
          }}
          underlayColor="#0066FF"
          onPress={handleReduce}
        >
          <View className={"flex flex-row items-center justify-center"}>
            <Feather name="log-out" size={16} color="white" />
            <Text className={"text-white ml-2"}>出货</Text>
          </View>
        </TouchableHighlight>
      </View>
    </PageView>
  );
}

const styles = StyleSheet.create({
  handleBtn: {
    borderRadius: 20,
    width: 100,
    height: 40,
    padding: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
