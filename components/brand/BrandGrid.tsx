import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import Card from "@/components/Card";
import { useEffect, useState } from "react";
import { COLORS } from "@/styles/theme";
import Dialog from "@/components/ui/Dialog";
import { useForm } from "react-hook-form";
import FormItem from "@/components/form/FormItem";
import { createBrandApi, getBrandListApi } from "@/api/brand";
import Loading from "@/components/ui/Loading";
import { router } from "expo-router";
import BrandOutsider, {
  OutsiderBrandType,
} from "@/components/brand/BrandOutsider";

export default function BrandGrid() {
  const [brandList, setBrandList] = useState([]);
  const [brandData, setBrandData] = useState({});
  const [loading, setLoading] = useState(false);
  const [addVisible, setAddVisible] = useState(false);
  const [outsiderVisible, setOutsiderVisible] = useState(false);
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onChange",
  });
  useEffect(() => {
    getList();
  }, []);
  function getList() {
    getBrandListApi().then(({ data }) => {
      setBrandList(data.data);
      console.log(data.data);
    });
  }
  function goBrandDetail(item: BrandType) {
    router.push(`/(views)/brand/${item.id}`);
  }
  function openAdd() {
    setAddVisible(true);
  }
  function closeAdd() {
    setAddVisible(false);
    reset();
  }
  function onSubmit(formData: any) {
    createBrandApi(formData).then(({ data }) => {
      closeAdd();
      getList();
    });
  }
  function outsiderAdd(item: OutsiderBrandType) {
    console.log(item);
    onSubmit({
      brandName: item.branName,
      logo: item.logo,
      remark: item.description,
    });
  }
  return (
    <Card style={{ flex: 1 }}>
      <View className={"flex flex-row justify-between items-center p-2"}>
        <ThemedText type={"subtitle"}>我的品牌</ThemedText>
        <TouchableOpacity
          onPress={openAdd}
          className={
            "pl-5 pr-5 h-10 rounded-xl flex flex-row items-center justify-center"
          }
          style={{ backgroundColor: COLORS.primaryColor }}
        >
          <Text className={"text-gray-100"}>添加品牌</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setOutsiderVisible(true)}
          className={
            "pl-5 pr-5 h-10 rounded-xl flex flex-row items-center justify-center"
          }
          style={{ backgroundColor: COLORS.successColor }}
        >
          <Text className={"text-gray-100"}>外部添加</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View className={"flex flex-row flex-wrap justify-between gap-4"}>
          {brandList.map((item: BrandType) => (
            <Pressable
              key={item.id}
              className={"p-5 w-[30%] h-[100]"}
              onPress={() => goBrandDetail(item)}
            >
              <Image
                className={"w-full h-full"}
                resizeMode="contain"
                source={{
                  uri: item.logo,
                }}
              ></Image>
              <Text className={"text-center text-sm font-bold"}>
                {item.brandName}
              </Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>

      <Dialog
        visible={addVisible}
        hide={closeAdd}
        wrapperClose={false}
        mask={true}
      >
        <View
          className={
            "bg-gray-50 w-full h-full p-5 flex flex-col justify-between"
          }
        >
          <View style={{flex: 1}} className={'w-full'}>
            <FormItem control={control} label={"品牌名称"} prop={"brandName"} />
            <FormItem control={control} label={"英文名称"} prop={"enName"} />
            <FormItem control={control} label={"编码"} prop={"code"} />
            <FormItem control={control} label={"图标"} prop={"logo"} />
            <FormItem control={control} label={"备注"} prop={"remark"} />
          </View>
          <View style={{flex: 1}} className={"flex flex-row flex-grow gap-5 pb-5 h-4"}>
            <TouchableOpacity
              onPress={closeAdd}
              className={
                "h-10 rounded-xl flex flex-grow flex-row items-center justify-center"
              }
              style={{ backgroundColor: COLORS.infoColor }}
            >
              <Text className={"text-gray-100"}>取消</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleSubmit(onSubmit)}
              disabled={loading}
              className={
                "h-10 rounded-xl flex flex-grow flex-row items-center justify-center"
              }
              style={{ backgroundColor: COLORS.successColor }}
            >
              {loading ? (
                <Loading />
              ) : (
                <Text className={"text-gray-100"}>确定</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </Dialog>
      <Dialog visible={outsiderVisible} hide={() => setOutsiderVisible(false)}>
        <BrandOutsider onSelect={outsiderAdd} />
      </Dialog>
    </Card>
  );
}
