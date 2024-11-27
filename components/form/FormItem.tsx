import {
  StyleSheet,
  TextInput,
  View,
  ViewStyle,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Control, Controller, FieldValues, FormState } from "react-hook-form";
import { FormColumnType } from "@/types/formTypes";
type FormItemProps = {
  control: Control;
  style?: ViewStyle;
  formState?: FormState<FieldValues>;
  labelWidth?: number;
  inline?: boolean;
} & FormColumnType;
export default function FormItem({
  label,
  prop,
  inline = true,
  control,
  labelWidth = 50,
  component,
}: FormItemProps) {
  return (
    <View style={[styles.field, inline && styles.inline]} key={prop}>
      <ThemedText style={{ width: labelWidth, textAlign: 'right' }}>{label}: </ThemedText>
      <Controller
        name={prop}
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
                    color: '#545151',
                  },
                ]}
                value={field.value || ""}
                onChangeText={field.onChange}
              />
            )}
          </View>
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  field: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    margin: 10,
  },
  inline: {
    flexDirection: "row",
    alignItems: "center",
  },
  control: {
    flex: 1
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#ccc",
    padding: 5,
    height: 40,
    marginHorizontal: 20,
  },
});
