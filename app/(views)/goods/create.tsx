import PageView from "@/components/PageView";
import CreateGoods from "@/components/goods/CreateGoods";
import { useLocalSearchParams } from "expo-router";

export default function GoodsCreatePage() {
  const { brand } = useLocalSearchParams();
  return (
    <PageView>
      <CreateGoods brand={brand}></CreateGoods>
    </PageView>
  );
}
