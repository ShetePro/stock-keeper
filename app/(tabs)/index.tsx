import { StyleSheet, SafeAreaView, View } from "react-native";

import BrandGrid from "@/components/brand/BrandGrid";
import PageView from "@/components/PageView";

export default function HomeScreen() {
  return (
    <PageView style={{ paddingBottom: 100 }}>
      <View style={{ paddingBottom: 100, flex: 1, padding: 10 }}>
        <BrandGrid />
      </View>
    </PageView>
  );
}

const styles = StyleSheet.create({});
