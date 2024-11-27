import { Redirect, Tabs } from "expo-router";
import React from "react";

import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import TabBar from "@/components/tab-bar/TabBar";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useSession } from "@/components/SessionProvider";
import { ThemedText } from "@/components/ThemedText";

export default function TabLayout() {
  const colors = useThemeColor();
  const { session, isLoading } = useSession();
  if (isLoading) {
    return <ThemedText>Loading...</ThemedText>;
  }
  if (!session) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/SignIn" />;
  }
  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        tabBarActiveTintColor: colors.tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        animation: "fade",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
        }}
      />
      <Tabs.Screen
        name="store"
        options={{
          title: "Store",
        }}
      />
      <Tabs.Screen
        name="charts"
        options={{
          title: "Charts",
        }}
      />
      <Tabs.Screen
        name="user"
        options={{
          title: "Explore",
        }}
      />
    </Tabs>
  );
}
