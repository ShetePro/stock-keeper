import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Controller, useForm } from "react-hook-form";
import { ThemedText } from "@/components/ThemedText";
import PageView from "@/components/PageView";
import { COLORS } from "@/styles/theme";
import { FormColumnsType } from "@/types/formTypes";
import Form from "@/components/form/Form";
import GoodsPicture from "@/components/goods/GoodsPicture";
import Card from "@/components/Card";
import FormItem from "@/components/form/FormItem";

export default function createGoods() {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm();
  const columns: FormColumnsType = [
    {
      label: "流水号",
      prop: "serialNumber",
    },
    {
      label: "名称",
      prop: "goodsName",
    },
    {
      label: "类别",
      prop: "category",
    },
    {
      label: "品牌",
      prop: "brandName",
    },
    {
      label: "型号",
      prop: "model",
    },
    {
      label: "价格",
      prop: "price",
    },
    {
      label: "数量",
      prop: "quantity",
    },
  ];
  function onSubmit(data: any) {
    console.log(data);
  }
  return (
    <PageView>
      <View>
        <Card style={styles.formCard}>
          <FormItem control={control} label={"名称"} prop={"goodsName"} />
          <FormItem control={control} label={"类别"} prop={"category"} />
          <FormItem control={control} label={"品牌"} prop={"brandName"} />
          <FormItem control={control} label={"型号"} prop={"model"} />
        </Card>
        <Card style={styles.formCard}>
          <FormItem control={control} label={"价格"} prop={"price"} />
          <FormItem control={control} label={"数量"} prop={"quantity"} />
        </Card>
        {/*<Form control={control} columns={columns} inline={false} />*/}
        <FormItem
          labelWidth={100}
          control={control}
          label={"缩略图"}
          prop={"cover"}
          component={({ field: { value, onChange } }) => (
            <GoodsPicture style={{marginLeft: 80}} url={value} onChange={onChange} />
          )}
        />
      </View>

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
  submitBtn: {
    marginHorizontal: 20,
    padding: 10,
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 20,
    backgroundColor: COLORS.primaryColor,
  },
});
