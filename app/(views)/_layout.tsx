import { Stack } from "expo-router";
import BackRouteIcon from "@/components/BackRouteIcon";

export default function ViewsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name={"createGoods/index"}
        options={{
          headerTitle: "新建商品",
          headerLeft: () => <BackRouteIcon />,
        }}
      ></Stack.Screen>
      <Stack.Screen
        name={"goods/[id]"}
        options={{
          headerTitle: "商品详情",
          headerLeft: () => <BackRouteIcon />,
        }}
      ></Stack.Screen>
    </Stack>
  );
}
