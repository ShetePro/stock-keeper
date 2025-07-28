import { View, Text, Pressable, Image, ScrollView } from "react-native";
import { useEffect, useMemo, useState } from "react";
import Dialog from "@/components/ui/Dialog";
import { getBrandListApi } from "@/api/brand";
import {ThemedText} from "@/components/ThemedText";

export default function BrandOutsiderSelect({
  onChange,
  value,
}: {
  value?: string;
  onChange?: (brand: BrandType) => void;
}) {
  const [selectDialog, setSelectDialog] = useState(false);
  const [brandList, setBrandList] = useState<BrandType[]>([]);
  useEffect(() => {
    getList();
  }, []);
  function getList() {
    getBrandListApi().then(({ data }) => {
      setBrandList(data.data);
    });
  }
  function handleOpen() {
    setSelectDialog(true);
  }
  function handleClose() {
    setSelectDialog(false);
  }
  function handleSelect(item: BrandType) {
    onChange && onChange(item);
    handleClose()
  }
  const getBrandText = useMemo(() => {
    if (!value) return "请选择品牌";
    const brand = brandList.find((item: BrandType) => item.id === value);

    return brand?.brandName || value;
  }, [value, brandList]);
  return (
    <>
      <Pressable
        className={"flex flex-grow ml-5 justify-center"}
        onPress={handleOpen}
      >
        <Text style={{ color: "#545151" }}>{getBrandText}</Text>
      </Pressable>
      <Dialog visible={selectDialog} hide={handleClose} mask={true}>
        <View className={"flex flex-col w-full h-full rounded-2xl"}>
          <ScrollView className={"w-full p-2"}>
            {brandList.map((item: BrandType) => (
              <Pressable
                key={item.id}
                className={"flex flex-row w-full items-center p-5"}
                onPress={() => handleSelect(item)}
              >
                <Image
                  className={"w-14 h-14 mr-5 rounded"}
                  source={{
                    uri: item.logo,
                  }}
                ></Image>
                <ThemedText className={"text-center text-md font-bold"}>
                  {item.brandName}
                </ThemedText>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      </Dialog>
    </>
  );
}
