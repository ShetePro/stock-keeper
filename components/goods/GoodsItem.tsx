import {
  View,
  StyleSheet,
  Text,
  Image,
  Pressable,
  useColorScheme,
} from "react-native";
import Tag from "@/components/ui/Tag";
import { COLORS } from "@/styles/theme";
import { router } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
export default function GoodsItem(props: GoodsType) {
  const theme = useColorScheme();
  function goDetail() {
    router.push(`/(views)/goods/${props.id}`);
  }
  return (
    <Pressable
      style={{
        ...styles.goodsBox,
        borderColor: theme === "light" ? COLORS.white : "#353636",
        backgroundColor: theme === "light" ? COLORS.white : "#353636",
      }}
      onPress={goDetail}
    >
      <Image style={styles.cover} source={{ uri: props.cover }} />
      <View style={styles.content}>
        <ThemedText style={{ fontWeight: "bold" }} className={"text-md mb-1"}>
          {props.goodsName}
        </ThemedText>
        <Tag label={props.category as string} type={"primary"}></Tag>
        <View className={"flex flex-row items-center justify-between"}>
          <ThemedText className={"text-gray-400 text-mini"}>
            剩余{props.quantity}件
          </ThemedText>
          <Text className={"text-red-500 text-xl"}>¥{props.price}</Text>
        </View>
      </View>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  goodsBox: {
    width: "40%",
    margin: 10,
    overflow: "hidden",
    flex: 1,
    backgroundColor: COLORS.white,
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
