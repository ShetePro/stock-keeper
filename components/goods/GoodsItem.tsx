import {
  View,
  StyleSheet,
  Text,
  Image,
  Pressable,
  useColorScheme,
} from "react-native";
import Tag from "@/components/ui/Tag";
import { router } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import Card from "@/components/Card";
export default function GoodsItem(props: GoodsType) {
  const theme = useColorScheme();
  function goDetail() {
    console.log(props)
    router.push(`/(views)/goods/${props.id}`);
  }
  return (
    <Card
      style={{
        ...styles.goodsBox,
      }}
    >
      <Pressable onPress={goDetail}>
        <Image
          style={styles.cover}
          source={
            props.cover
              ? { uri: props.cover }
              : require("@/assets/images/empty-goods.png")
          }
        />
        <View style={styles.content}>
          <ThemedText style={{ fontWeight: "bold" }} className={"text-md mb-1"}>
            {props.goodsName}
          </ThemedText>
          <Tag label={props.category as string} type={"primary"}></Tag>
          <View className={"flex flex-row items-center justify-between"}>
            <ThemedText type={"describe"} className={"text-gray-400 text-mini"}>
              剩余{props.quantity}件
            </ThemedText>
            <Text className={"text-red-500 text-xl"}>¥{props.price}</Text>
          </View>
        </View>
      </Pressable>
    </Card>
  );
}
const styles = StyleSheet.create({
  goodsBox: {
    width: "100%",
    margin: 10,
    padding: 0,
    overflow: "hidden",
    flex: 1,
    borderRadius: 8,
  },
  cover: {
    width: "100%",
    height: 140,
    borderRadius: 8,
  },
  content: {
    flex: 1,
    padding: 10,
  },
});
