import { View, StyleSheet, Text, Pressable } from "react-native";
import { useState } from "react";
import { useThemeColor } from "@/hooks/useThemeColor";
import { GoodsRecordType } from "@/types/goodsType";
import { convertTimestamp } from "@/utils/util";
import Tag from "@/components/ui/Tag";

export default function RecordTable({
  data,
  search,
}: {
  data: GoodsRecordType[];
  search: (params?: any) => void;
}) {
  const [type, setType] = useState<number>(0);
  const colors = useThemeColor();
  const tabs = [
    {
      name: "全部",
      value: 0,
    },
    {
      name: "入库",
      value: 1,
    },
    {
      name: "出货",
      value: 2,
    },
  ];
  const tableHeader = [
    { label: "类型/时间", prop: "type" },
    {
      label: "数量",
      prop: "quantity",
      style: { textAlign: "right", paddingRight: 10 },
    },
    { label: "总价值/价格", prop: "price", style: { textAlign: "center" } },
  ];
  function changeType(type: number) {
    setType(type);
    search && search({ type });
  }
  return (
    <View style={{ flex: 1, padding: 20, marginBottom: 50 }}>
      <View className={"flex flex-row gap-4"}>
        {tabs.map((tab, i) => (
          <Pressable
            key={tab.value}
            className={"rounded-md"}
            style={{
              backgroundColor: tab.value === type ? "#eaeded" : "transparent",
            }}
            onPress={() => changeType(tab.value)}
          >
            <Text
              className={"p-2 text-sm"}
              style={{
                color: tab.value === type ? colors.text : colors.textWeaken,
              }}
            >
              {tab.name}
            </Text>
          </Pressable>
        ))}
      </View>
      <View>
        <View style={styles.header}>
          {tableHeader.map((item) => {
            const style = item.style || {};
            return (
              <Text key={item.prop} style={[styles.headerItem, style]}>
                {item.label}
              </Text>
            );
          })}
        </View>
        {data.map((item) => {
          return (
            <View className={"flex flex-row justify-around mt-5 gap-5"}>
              <View className={"flex flex-col flex-grow"}>
                <Tag
                  type={item.type === 1 ? "success" : "danger"}
                  label={item.type === 1 ? "入库" : "出货"}
                ></Tag>
                <Text
                  style={{ ...styles.text, color: "#525256", marginTop: 5 }}
                >
                  {convertTimestamp(item.createDate, "YYYY-MM-DD HH:mm:ss")}
                </Text>
              </View>
              <Text className={"flex flex-row flex-grow text-center mr-5 items-center"} style={styles.text}>
                {item.quantity || 0}件
              </Text>
              <View className={"flex flex-col flex-grow items-center"}>
                <Text style={styles.text} className={"font-bold text-right"}>
                  ¥{item.totalNum}
                </Text>
                <Text
                  style={{ ...styles.text, color: "#525256", marginTop: 5 }}
                  className={"text-right"}
                >
                  ¥{item.price}
                </Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: "row",
    gap: 5,
  },
  headerItem: {
    flex: 1,
    color: "#525256",
    marginTop: 10,
    fontSize: 12,
  },
  text: {
    fontSize: 12,
  },
});
