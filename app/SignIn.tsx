import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Pressable,
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
import { WithTranslation, withTranslation } from "react-i18next";
import LabelMove from "@/components/sign/LabelMove";
import { AntDesign, FontAwesome, FontAwesome5 } from "@expo/vector-icons";

function SignIn({ t }: WithTranslation) {
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
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <PageView
      style={{
        backgroundColor: "white",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <View className={"mt-10 mb-10 z-10 pl-10 pr-10 flex flex-col h-full"}>
        <View className={"flex flex-col items-center mb-10"}>
          <Text style={styles.title}>{t("title")}</Text>
          <Text style={styles.hello}>{t("welcome")}</Text>
        </View>
        <View>
          <LabelMove
            label={t("account")}
            height={64}
            render={(move) => (
              <FormItem
                control={control}
                label={""}
                prop={"userName"}
                component={({ field: { value, onChange } }) => (
                  <TextInput
                    onFocus={() => move(true)}
                    onBlur={() => move(false)}
                    className={"w-full h-full"}
                    value={value}
                    onChangeText={onChange}
                  ></TextInput>
                )}
              />
            )}
          ></LabelMove>
          <LabelMove
            label={t("password")}
            height={64}
            render={(move) => (
              <FormItem
                control={control}
                label={""}
                prop={"password"}
                component={({ field: { value, onChange } }) => (
                  <TextInput
                    onFocus={() => move(true)}
                    onBlur={() => move(false)}
                    className={"w-full h-full"}
                    textContentType={"password"}
                    value={value || ""}
                    onChangeText={onChange}
                  />
                )}
              />
            )}
          ></LabelMove>
          <Text
            className={"mb-4 text-right font-bold"}
            style={{ color: COLORS.primaryColor }}
          >
            {t("forgetPassword")}
          </Text>
        </View>
        <TouchableOpacity onPress={handleSubmit(onSubmit)} activeOpacity={0.8}>
          <View style={styles.loginBtn}>
            <ThemedText className={"font-bold"} style={{ color: COLORS.white }}>
              登陆
            </ThemedText>
          </View>
        </TouchableOpacity>
        <Pressable>
          <Text className={"mt-10 text-center"}>{t("createAccount")}</Text>
        </Pressable>
        <View className={"flex flex-col items-center justify-center flex-grow"}>
          <Text
            className={"font-bold mb-10 mt-10"}
            style={{ color: COLORS.primaryColor }}
          >
            {t("continue")}
          </Text>
          <View className={"flex flex-row items-center gap-2"}>
            <Pressable style={styles.continueBox}>
              <FontAwesome5 name="mobile-alt" size={24} color="black" />
            </Pressable>
            <Pressable style={styles.continueBox}>
              <AntDesign name="wechat" size={24} color="black" />
            </Pressable>
            <Pressable style={styles.continueBox}>
              <AntDesign name="alipay-circle" size={24} color="black" />
            </Pressable>
          </View>
        </View>
      </View>
      <View
        className={
          "w-[600px] h-[600px] rounded-full bg-[#F8F9FF] absolute right-[-300px] top-[-350px] z-0"
        }
      ></View>
      <View
        className={
          "w-[500px] h-[500px] rounded-full border-2 border-[#F8F9FF] absolute right-[-120px] top-[-220px] z-0"
        }
      ></View>
    </PageView>
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
    backgroundColor: COLORS.primaryColor,
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
  continueBox: {
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: 40,
    backgroundColor: "#ECECEC",
    borderRadius: 10,
  },
});
export default withTranslation("login")(SignIn);
