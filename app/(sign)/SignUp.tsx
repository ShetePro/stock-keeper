import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  TextInput,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import SignView from "@/components/sign/SignView";
import LabelMove from "@/components/sign/LabelMove";
import { COLORS } from "@/styles/theme";
import ContinueGroup from "@/components/sign/ContinueGroup";
import { withTranslation, WithTranslation } from "react-i18next";
import FormItem from "@/components/form/FormItem";
import { useRouter } from "expo-router";
import { SubmitErrorHandler, useForm } from "react-hook-form";
import { getRsaKey, userLogin } from "@/api/login";
import { AesEncryption } from "@/utils/encryption";

function SignUp({ t }: WithTranslation) {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      userName: "",
      password: "",
      confirmPassword: "",
    },
  });
  function goLogin() {
    router.replace("/SignIn");
  }
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
        router.replace("/(tabs)");
      });
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <SignView
      style={{
        backgroundColor: "white",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <View className={"mt-10 mb-10 z-10 pl-10 pr-10 flex flex-col h-full"}>
        <View className={"flex flex-col items-center mb-10"}>
          <Text style={styles.title}>{t("registerTitle")}</Text>
          <Text style={styles.hello}>{t("registerDescription")}</Text>
        </View>
        <View className={"mb-10"}>
          <LabelMove
            label={t("account")}
            height={64}
            error={!!errors['userName']}
            render={(move) => (
              <FormItem
                control={control}
                rules={{
                  required: true,
                }}
                errors={errors}
                prop={"userName"}
                component={({ field: { value, onChange } }) => (
                  <TextInput
                    {...register("userName", { required: true })}
                    onFocus={() => move(true)}
                    onBlur={() => !value && move(false)}
                    className={"w-full h-full"}
                    value={value}
                    onChangeText={onChange}
                  ></TextInput>
                )}
              />
            )}
          ></LabelMove>
          <Text>{errors.userName && <p>{errors.userName.message}</p>}</Text>
          <LabelMove
            label={t("password")}
            error={!!errors['password']}
            height={64}
            render={(move) => (
              <FormItem
                control={control}
                rules={{
                  required: true,
                }}
                errors={errors}
                prop={"password"}
                component={({ field: { value, onChange } }) => (
                  <TextInput
                    onFocus={() => move(true)}
                    onBlur={() => !value && move(false)}
                    className={"w-full h-full"}
                    textContentType={"password"}
                    value={value || ""}
                    onChangeText={onChange}
                  />
                )}
              />
            )}
          ></LabelMove>
          <LabelMove
            label={t("confirmPassword")}
            error={!!errors['confirmPassword']}
            height={64}
            render={(move) => (
              <FormItem
                control={control}
                rules={{
                  required: true,
                  validate: (value, formValues) => {
                    return (
                      formValues.password === formValues.confirmPassword ||
                      t("confirmPasswordError")
                    );
                  },
                }}
                errors={errors}
                prop={"confirmPassword"}
                component={({ field: { value, onChange } }) => (
                  <TextInput
                    onFocus={() => move(true)}
                    onBlur={() => !value && move(false)}
                    className={"w-full h-full"}
                    textContentType={"password"}
                    value={value || ""}
                    onChangeText={onChange}
                  />
                )}
              />
            )}
          ></LabelMove>
        </View>
        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          activeOpacity={0.8}
          disabled={!isValid}
          style={[
            styles.loginBtn,
            {
              backgroundColor: !isValid
                ? COLORS.disabledPrimaryColor
                : COLORS.primaryColor,
            },
          ]}
        >
          <ThemedText className={"font-bold"} style={{ color: COLORS.white }}>
            {t("register")}
          </ThemedText>
        </TouchableOpacity>
        <Pressable onPress={goLogin} className={"mt-10"}>
          <Text className={"text-center font-bold  p-2"}>
            {t("haveAccount")}
          </Text>
        </Pressable>
        <ContinueGroup />
      </View>
    </SignView>
  );
}
const styles = StyleSheet.create({
  title: {
    color: COLORS.primaryColor,
    fontSize: 30,
    fontWeight: "bold",
    fontFamily: "Poppins-Bold",
    marginBottom: 15,
  },
  hello: {
    fontFamily: "Poppins-SemiBold",
    color: COLORS.black,
    fontSize: 20,
    width: 250,
    textAlign: "center",
  },
  loginBtn: {
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    boxShadow: "0 10 20 #CBD6FF",
  },
  inputBox: {
    paddingLeft: 20,
    height: 64,
    borderRadius: 10,
    backgroundColor: "#F1F4FF",
    position: "relative",
    marginVertical: 20,
  },
});

export default withTranslation("login")(SignUp);
