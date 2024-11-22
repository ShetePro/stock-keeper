import PageView from "@/components/PageView";
import { useLocalSearchParams } from "expo-router";
import {ThemedText} from "@/components/ThemedText";

export default function GoodsDetail() {
  const { id } = useLocalSearchParams();
  console.log(id);
  return (
    <PageView>
      <ThemedText>goods detail: {id}</ThemedText>
    </PageView>
  );
}
