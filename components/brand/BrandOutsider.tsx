import {
  Pressable,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import PageView from "@/components/PageView";
import { useThemeColor } from "@/hooks/useThemeColor";
import SearchInput from "@/components/ui/SearchInput";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { COLORS } from "@/styles/theme";
import { getBrandPinguanApi } from "@/api/brand";
import { useEffect, useState } from "react";
import * as htmlparser2 from "htmlparser2";
import { getElementsByClassName } from "@/utils/util";

export type OutsiderBrandType = {
  id: string;
  branName: string;
  logo: string;
  description: string;
};
type BrandOutsiderProps = {
  onSelect: (brand: OutsiderBrandType) => void;
  keyword?: string;
};
export default function BrandOutsider({
  onSelect,
  keyword,
}: BrandOutsiderProps) {
  const colors = useThemeColor();
  const [searchText, setSearchText] = useState(keyword);
  const [brandPgList, setBrandPgList] = useState<OutsiderBrandType[]>([]);
  useEffect(() => {
    getList();
  }, []);
  function getList() {
    console.log("getList", searchText);
    getBrandPinguanApi({
      keyword: searchText,
      page: 1,
    }).then((res) => {
      const dom = htmlparser2.parseDocument(res);
      const list = getElementsByClassName(dom, "addneeds");
      const branList: OutsiderBrandType[] = [];
      list.map((item) => {
        const data = item.attribs;
        branList.push({
          id: data["data-id"],
          branName: data["data-name"],
          description: data["data-description"],
          logo: data["data-logo"].replace(/^http:\/\//, "https://"),
        });
      });
      setBrandPgList(branList || []);
    });
  }
  function clickBrand(item: OutsiderBrandType) {
    console.log(item);
    onSelect && onSelect(item);
  }

  return (
    <View style={{height: '100%'}}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 10,
        }}
      >
        <SearchInput
          className={"mb-1"}
          placeholder={"搜索想要的商品"}
          onChange={setSearchText}
        />
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={getList}
        >
          <MaterialCommunityIcons name="store-search" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View>
          {brandPgList.map((item: any) => (
            <Pressable
              key={item.id}
              className={"flex flex-row items-center p-2"}
              onPress={() => clickBrand(item)}
            >
              <Image
                resizeMode={"contain"}
                source={{
                  width: 100,
                  height: 50,
                  uri: item.logo,
                }}
              ></Image>
              <View className={"flex flex-col justify-center gap-2"}>
                <Text className={"text-md font-bold"}>{item.branName}</Text>
                <Text style={{ color: colors.tabIconDefault, fontSize: 12 }}>
                  {item.description}
                </Text>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
    borderRadius: 5,
    backgroundColor: COLORS.primaryColor,
    marginLeft: 10,
    marginRight: 10,
    boxSizing: "border-box",
  },
  welcome: {
    fontSize: 14,
    color: "#adaaaa",
  },
});
