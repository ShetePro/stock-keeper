import { StyleSheet, TextInput, View, ViewStyle, Text } from "react-native";
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
  style?: ViewStyle;
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
  labelWidth = 50,
  component,
  rules,
  errors,
}: FormItemProps) {
  const error = errors ? errors[prop]?.message : "";
  return (
    <View style={[styles.field, inline && styles.inline]} key={prop}>
      {label && (
        <ThemedText style={{ width: labelWidth, textAlign: "right" }}>
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
    alignItems: "flex-start",
    height: "100%",
    flex: 1,
    margin: 10,
  },
  inline: {
    flexDirection: "row",
    alignItems: "center",
  },
  control: {
    flex: 1,
    height: "100%",
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#ccc",
    padding: 5,
    height: 40,
    marginHorizontal: 20,
  },
  error: {
    position: "absolute",
    bottom: "-80%",
    left: 0,
    color: COLORS.dangerColor,
  },
});
