import {
  StyleSheet,
  Pressable,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import PageView from "@/components/PageView";
import { ThemedText } from "@/components/ThemedText";
import { useSession } from "@/components/SessionProvider";
import { COLORS } from "@/styles/theme";
import FormItem from "@/components/form/FormItem";
import { useForm } from "react-hook-form";
import { getRsaKey, userLogin } from "@/api/login";
import { useRouter } from "expo-router";
import { AesEncryption } from "@/utils/encryption";
import { useState } from "react";

export default function SignIn() {
  const { signIn } = useSession();
  const router = useRouter();
  const { control, handleSubmit } = useForm();
  async function onSubmit(data: any) {
    try {
      let rsaKey: string = "";
      if (!rsaKey) {
        const { data } = await getRsaKey();
        rsaKey = data.data;
      }
      const encryption = new AesEncryption({
        serverPublicKey: rsaKey,
      });
      const password = encryption.encryptByAES(data.password);
      userLogin({
        ...data,
        key: encryption.getKey,
        iv: encryption.getIv,
        password,
      }).then(({ data }) => {
        signIn(data.data._id);
        router.replace("/(tabs)");
      });
    }catch (e) {
      console.log(e)
    }

  }
  return (
    <PageView>
      <View>
        <ThemedText type={"title"} className={"text-center"}>
          账号登陆
        </ThemedText>
        <View></View>
        <View className={"flex-grow"}>
          <FormItem control={control} label={"账号"} prop={"userName"} />
          <FormItem
            control={control}
            label={"密码"}
            prop={"password"}
            component={({ field: { value, onChange } }) => (
              <TextInput
                style={styles.password}
                textContentType={"password"}
                value={value || ""}
                onChangeText={onChange}
              />
            )}
          />
        </View>
        <TouchableOpacity onPress={handleSubmit(onSubmit)} activeOpacity={0.8}>
          <View style={styles.loginBtn}>
            <ThemedText style={{ color: COLORS.white }}>登陆</ThemedText>
          </View>
        </TouchableOpacity>
      </View>
    </PageView>
  );
}

const styles = StyleSheet.create({
  loginBtn: {
    padding: 10,
    marginHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    backgroundColor: COLORS.primaryColor,
  },
  password: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#ccc",
    padding: 5,
    height: 40,
    marginHorizontal: 20,
  },
});
