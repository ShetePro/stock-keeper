import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useForm } from "react-hook-form";
import PageView from "@/components/PageView";
import { COLORS } from "@/styles/theme";
import GoodsPicture from "@/components/goods/GoodsPicture";
import Card from "@/components/Card";
import FormItem from "@/components/form/FormItem";
import NumberInput from "@/components/NumberInput";
import { createGoodsApi } from "@/api/goods";
import Toast from "react-native-toast-message";
import { router } from "expo-router";
import { useState } from "react";

export default function createGoods() {
  const [loading, setLoading] = useState(false);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });
  function onSubmit(formData: any) {
    createGoodsApi(formData).then(({ data }) => {
      console.log(data);
      Toast.show({
        type: "success",
        text1: "新增成功",
      });
      router.replace("/(tabs)/store");
    });
  }
  return (
    <PageView>
      <ScrollView style={{ flex: 1 }}>
        <Card style={styles.formCard}>
          <FormItem
            style={styles.formItem}
            control={control}
            labelWidth={80}
            label={"名称"}
            prop={"goodsName"}
          />
          <FormItem
            style={styles.formItem}
            control={control}
            labelWidth={80}
            label={"类别"}
            prop={"category"}
          />
          <FormItem
            style={styles.formItem}
            control={control}
            labelWidth={80}
            label={"品牌"}
            prop={"brandName"}
          />
          <FormItem
            style={styles.formItem}
            labelWidth={80}
            control={control}
            label={"商品条码"}
            prop={"barcode"}
          />
          <FormItem
            control={control}
            label={"价格"}
            prop={"price"}
            component={({ field: { onChange, value } }) => (
              <NumberInput
                value={value}
                onChange={onChange}
                unit={"元"}
                decimal={true}
              />
            )}
          />
          <FormItem
            control={control}
            label={"数量"}
            prop={"quantity"}
            component={({ field: { onChange, value } }) => (
              <NumberInput value={value} onChange={onChange} unit={"件"} />
            )}
          />
          <FormItem
            labelWidth={100}
            control={control}
            label={"缩略图"}
            prop={"cover"}
            component={({ field: { value, onChange } }) => (
              <GoodsPicture
                style={{ marginLeft: 80 }}
                url={value}
                onChange={onChange}
              />
            )}
          />
        </Card>
      </ScrollView>

      <TouchableOpacity
        style={styles.submitBtn}
        activeOpacity={0.8}
        onPress={handleSubmit(onSubmit)}
      >
        <Text style={{ color: COLORS.white }}>提交</Text>
      </TouchableOpacity>
    </PageView>
  );
}

const styles = StyleSheet.create({
  field: {
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
  },
  input: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    marginHorizontal: 20,
    padding: 10,
  },
  formCard: {
    margin: 10,
  },
  formItem: {
    borderColor: "#e3e2e2",
    borderBottomWidth: 1,
    paddingBottom: 8,
  },
  submitBtn: {
    marginHorizontal: 20,
    padding: 10,
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 20,
    backgroundColor: COLORS.primaryColor,
  },
});
