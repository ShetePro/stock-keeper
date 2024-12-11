import {
  Modal,
  StyleSheet,
  View,
  Text,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { COLORS } from "@/styles/theme";
import NumberInput from "@/components/NumberInput";
import { useCallback, useState } from "react";
import { goodsOutInRecordApi } from "@/api/goods";
import Toast from "react-native-toast-message";
import { ThemedText } from "@/components/ThemedText";

export default function GoodsOperate({
  goodsData,
  hide,
  confirmCallback,
  type,
}: {
  goodsData?: GoodsType;
  type: number;
  hide: () => void;
  confirmCallback?: () => void;
}) {
  const [price, setPrice] = useState<string | number>(goodsData?.price || 0);
  const [num, setNum] = useState<string | number>(1);
  const [total, setTotal] = useState<string | number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  function changeNum(value: string | number) {
    setNum(value);
  }
  function confirm() {
    if (goodsData) {
      const isOut = type === 2;
      setLoading(true);
      goodsOutInRecordApi({
        goodsId: goodsData.id,
        brand: goodsData.brand || "",
        quantity: num,
        totalNum: total,
        price: isOut ? Number(total) / Number(num) : price,
        type,
      })
        .then(({ data }) => {
          Toast.show({
            type: "success",
            text1: `${isOut ? "出货" : "入库"}成功`,
          });
          confirmCallback && confirmCallback();
          hide && hide();
        })
        .finally(() => setLoading(false));
    }
  }
  const getTotal = useCallback(() => {
    const value = Number(num);
    return value * Number(price);
  }, [num, price]);
  return (
    <View style={styles.modalView}>
      <View className={"flex flex-col gap-5"}>
        <ThemedText type={"subtitle"} className={"text-center mb-5"}>
          {type === 1 ? "入库" : "出货"}
        </ThemedText>
        {type === 1 && (
          <View style={styles.row}>
            <Text style={styles.modalText}>价格</Text>
            <NumberInput
              value={price as string}
              onChange={setPrice}
              min={0}
              unit={"元"}
            />
          </View>
        )}
        <View style={styles.row}>
          <Text style={styles.modalText}>数量</Text>
          <NumberInput
            value={num as string}
            onChange={changeNum}
            max={type === 2 ? goodsData?.quantity : 99999999}
            unit={"件"}
          />
        </View>
        <View style={styles.row} className={"mt-10"}>
          <Text style={styles.modalText} className={"font-bold text-xl"}>
            总金额
          </Text>
          {type === 1 ? (
            <Text className={"text-red-500 text-2xl font-bold"}>
              ¥{getTotal()}
            </Text>
          ) : (
            <NumberInput
              value={total as string}
              onChange={setTotal}
              min={0}
              unit={"元"}
            />
          )}
        </View>
      </View>
      <View
        className={"w-full flex flex-row gap-4 items-center justify-around"}
      >
        <Pressable style={[styles.button, styles.buttonClose]} onPress={hide}>
          <Text style={styles.textStyle}>取消</Text>
        </Pressable>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={confirm}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.textStyle}>完成</Text>
          )}
        </Pressable>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 25,
    height: "100%",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  row: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    padding: 10,
    height: 40,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: COLORS.primaryColor,
  },
  buttonClose: {
    backgroundColor: "#d5dbdb",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    textAlign: "center",
  },
});
