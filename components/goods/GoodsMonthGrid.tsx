import { Text, View } from "react-native";
import { COLORS } from "@/styles/theme";
import { NumberShrink } from "@/utils/util";

export default function GoodsMonthGrid({ data }: { data: any }) {
  const fields = [
    {
      label: "销量",
      value: 0,
      prop: "sellNum",
      suffix: "件",
      style: {
        color: COLORS.successColor,
      },
    },
    {
      label: "销售额",
      value: 0,
      prefix: "¥",
      prop: "sellPrice",
      style: {
        color: COLORS.successColor,
      },
    },
    {
      label: "净利润",
      value: 0,
      prefix: "¥",
      prop: "profitPrice",
      style: {
        color: COLORS.successColor,
      },
    },
  ].map((item) => {
    const value = data[item.prop] || item.value;
    return {
      ...item,
      value: NumberShrink(value),
    };
  });
  return (
    <View className={"flex flex-row items-center justify-around pt-5"}>
      {fields.map((item) => (
        <View
          key={item.label}
          className={"flex flex-col items-center justify-center"}
        >
          <Text className={"text-md font-bold mb-2 text-gray-500"}>
            {item.label}
          </Text>
          <Text className={"text-2xl font-bold"} style={item.style}>
            {`${item.prefix || " "} ${item.value} ${item.suffix || ""}`}
          </Text>
        </View>
      ))}
    </View>
  );
}
