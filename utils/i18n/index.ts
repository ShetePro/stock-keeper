import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    login: {
      title: 'Login here',
      welcome: "Welcome back you’ve been missed!",
      forgetPassword: "Forgot your password?",
      account: "Account",
      password: "Password",
      createAccount: 'Create new account',
      continue: 'Or continue with',
    },
  },
  cn: {
    login: {
      title: '在这里登陆',
      welcome: "欢迎回来，我们都很想念你！",
      account: "账号",
      password: "密码",
      forgetPassword: "忘记密码?",
      createAccount: '创建新账号',
      continue: '其他方式登陆'
    },
  },
};
i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "cn",
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
