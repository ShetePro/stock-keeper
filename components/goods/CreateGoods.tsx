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
import BrandSelect from "@/components/brand/BrandSelect";
import Loading from "@/components/ui/Loading";

export default function CreateGoods({ brand }: { brand: string | string[] }) {
  const [loading, setLoading] = useState(false);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      brand: brand,
    },
  });
  function onSubmit(formData: any) {
    setLoading(true);
    createGoodsApi(formData)
      .then(({ data }) => {
        console.log(data);
        Toast.show({
          type: "success",
          text1: "新增成功",
        });
        if (brand) {
          router.back();
        } else {
          router.replace("/(tabs)/store");
        }
      })
      .finally(() => setLoading(false));
  }
  return (
    <view>
      <ScrollView style={{ flex: 1 }}>
        <Card style={styles.formCard}>
          <FormItem
            style={styles.formItem}
            control={control}
            label={"名称"}
            prop={"goodsName"}
          />
          <FormItem
            style={styles.formItem}
            control={control}
            label={"类别"}
            prop={"category"}
          />
          <FormItem
            style={styles.formItem}
            control={control}
            label={"品牌"}
            prop={"brand"}
            component={({ field: { onChange, value } }) => (
              <BrandSelect
                value={value}
                onChange={(brand) => onChange(brand.id)}
              />
            )}
          />
          <FormItem
            style={styles.formItem}
            control={control}
            label={"商品条码"}
            prop={"barcode"}
          />
          <FormItem
            control={control}
            label={"进货价"}
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
        disabled={loading}
        onPress={handleSubmit(onSubmit)}
      >
        {loading ? (
          <Loading />
        ) : (
          <Text style={{ color: COLORS.white }}>提交</Text>
        )}
      </TouchableOpacity>
    </view>
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
