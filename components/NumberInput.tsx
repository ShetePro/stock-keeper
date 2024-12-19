import { View, StyleSheet, Pressable, TextInput } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { COLORS } from "@/styles/theme";
import { ThemedText } from "@/components/ThemedText";
import { useRef, useState } from "react";

export default function NumberInput({
  onChange,
  value,
  unit,
  min = 0,
  max = 999999,
  decimal = false,
}: {
  onChange: (num: number | string) => void;
  value?: string;
  unit?: string;
  min?: number;
  max?: number;
  decimal?: boolean;
}) {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [numberValue, setNumberValue] = useState<number | string>(value || 0);
  const [selection, setSelection] = useState({ start: 0, end: 0 });
  const [isFocus, setIsFocus] = useState<boolean>(false);
  let startValue = 0;
  function changeInput(num: string | number) {
    if (num) {
      num = num ? num.toString() : "";
      const numericValue = num.replace(/[^0-9.-]/g, "");
      if ((numericValue.match(/\./g) || []).length <= 1) {
        changeNumber(numericValue);
      }
    } else {
      changeNumber(num);
    }
    console.log(num);
    changeNumber(num);
  }
  function changeNumber(num: string | number) {
    const value = Math.max(Math.min(max, Number(num)), min);
    onChange(value);
    setNumberValue(value);
    const text = value.toString();
    setSelection({ start: text.length, end: text.length });
  }
  function longPress(type: "minus" | "plus") {
    if (intervalRef.current) return; // 防止重复启动定时器
    const num = Number(numberValue);
    const step = type === "plus" ? 1 : -1;
    startValue = num;
    intervalRef.current = setInterval(() => {
      startValue += step;
      changeNumber(startValue);
      if (Math.abs(startValue - num) > 20) {
        clear();
        intervalRef.current = setInterval(() => {
          startValue += step;
          changeNumber(startValue);
        }, 20);
      }
    }, 100);
  }
  function onPressOut() {
    clear();
  }
  function clear() {
    intervalRef.current && clearInterval(intervalRef.current);
    intervalRef.current = null;
  }
  function setCursorEnd() {
    const text = numberValue.toString();
    setSelection({ start: text.length, end: text.length });
    setIsFocus(true);
  }
  function selectionChange({ nativeEvent: { selection } }: any) {
    if (isFocus) {
      setSelection(selection);
    }
  }
  return (
    <View style={styles.numberInput}>
      <Pressable
        style={[styles.minus, styles.btn]}
        onPress={() => changeNumber(Number(numberValue) - 1)}
        onPressOut={onPressOut}
        onLongPress={() => longPress("minus")}
      >
        <Entypo name="minus" size={24} color="white" />
      </Pressable>
      <View
        className={
          "h-full min-w-20 max-w-32 flex-row items-center justify-between gap-1"
        }
      >
        <TextInput
          className={" text-right font-bold flex-grow"}
          value={numberValue.toString()}
          onChangeText={changeInput}
          selection={selection}
          selectionColor={isFocus ? COLORS.black : "transparent"}
          onBlur={() => setIsFocus(false)}
          onSelectionChange={selectionChange}
          onFocus={setCursorEnd}
          keyboardType={"decimal-pad"}
          inputMode="decimal"
        ></TextInput>
        <ThemedText style={{ fontWeight: "bold" }}>{unit}</ThemedText>
      </View>

      <Pressable
        style={[styles.plus, styles.btn]}
        onPressOut={onPressOut}
        onLongPress={() => longPress("plus")}
        onPress={() => changeNumber(Number(numberValue) + 1)}
      >
        <Entypo name="plus" size={24} color="white" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  numberInput: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 10,
  },
  btn: {
    justifyContent: "center",
    alignItems: "center",
    width: 30,
    height: 30,
    borderRadius: 5,
  },
  plus: {
    boxShadow: `0 0 4px ${COLORS.primaryColor}`,
    backgroundColor: COLORS.primaryColor,
  },
  minus: {
    backgroundColor: "#878b91",
    boxShadow: `0 0 4px #878b91`,
  },
});
