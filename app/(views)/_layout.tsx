import { Stack } from "expo-router";
import BackRouteIcon from "@/components/BackRouteIcon";

export default function ViewsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name={"goods/create"}
        options={{
          headerTitle: "新建商品",
          headerLeft: () => <BackRouteIcon />,
        }}
      ></Stack.Screen>
      <Stack.Screen
        name={"brand/[id]"}
        options={{
          headerTitle: "品牌详情",
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
      <Stack.Screen
        name={"brand/create"}
        options={{
          headerTitle: "选择品牌",
          headerLeft: () => <BackRouteIcon />,
        }}
      ></Stack.Screen>
    </Stack>
  );
}
