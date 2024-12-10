import {
  StyleSheet,
  TextInput,
  View,
  ViewStyle,
  Text,
  StyleProp,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import {
  Control,
  Controller,
  FieldValues,
  FormState,
  RegisterOptions,
} from "react-hook-form";
import { FormColumnType } from "@/types/formTypes";
import { FieldErrors } from "react-hook-form/dist/types/errors";
import { COLORS } from "@/styles/theme";
type FormItemProps = Partial<FormColumnType> & {
  control: Control<any> | undefined;
  prop: string;
  style?: StyleProp<ViewStyle>;
  formState?: FormState<FieldValues>;
  labelWidth?: number;
  inline?: boolean;
  rules?:
    | Omit<
        RegisterOptions<FieldValues, string>,
        "disabled" | "setValueAs" | "valueAsNumber" | "valueAsDate"
      >
    | undefined;
  label?: string;
  errors?: FieldErrors;
};
export default function FormItem({
  label = "",
  prop,
  inline = true,
  control,
  labelWidth,
  style,
  component,
  rules,
  errors,
}: FormItemProps) {
  const error = errors ? errors[prop]?.message : "";
  return (
    <View
      style={[styles.field, inline && styles.inline, style]}
      key={prop}
    >
      {label && (
        <ThemedText
          numberOfLines={1}
          ellipsizeMode={"tail"}
          style={{ width: labelWidth, height: 30, textAlign: "left" }}
        >
          {label}:{" "}
        </ThemedText>
      )}
      <Controller
        name={prop}
        rules={rules}
        control={control}
        render={({ field, formState, fieldState }) => (
          <View style={styles.control}>
            {component ? (
              component({ field, formState, fieldState })
            ) : (
              <TextInput
                style={[
                  styles.input,
                  {
                    color: "#545151",
                  },
                ]}
                placeholder={"请输入"}
                value={field.value || ""}
                onChangeText={field.onChange}
              />
            )}
          </View>
        )}
      />
      {error && <Text style={styles.error}>{error as string}</Text>}
    </View>
  );
}
const styles = StyleSheet.create({
  field: {
    flexDirection: "column",
    justifyContent: "center",
    margin: 10,
  },
  inline: {
    flexDirection: "row",
    alignItems: "center",
  },
  control: {
    flex: 1,
  },
  input: {
    // borderWidth: 1,
    // borderRadius: 5,
    // borderColor: "#ccc",
    padding: 5,
    height: 40,
  },
  error: {
    position: "absolute",
    bottom: "-80%",
    left: 0,
    color: COLORS.dangerColor,
  },
});
