import { Image, Text, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../styles/styles";

const LoginButton = ({
  regId,
  setRegId,
  setShowWebview,
  src,
  platform,
  bgColor,
  textColor = "#111111",
  borderColor = null,
}) => {
  const handleLogin = async () => {
    setShowWebview(true);
    setRegId(regId);
    await AsyncStorage.setItem("@reg_id", regId);
  };

  return (
    <TouchableOpacity
      style={{ backgroundColor: bgColor }}
      className={`flex-row justify-center space-x-2 py-[14px] ${
        borderColor ? `border-[1px] border-[${borderColor}]` : null
      } rounded-[10px]`}
      onPress={handleLogin}
      activeOpacity={0.7}
    >
      <Image source={src} className="w-[22px] h-[22px]" />
      <Text
        className={`${styles("16-title")} ${
          textColor === "white" ? "text-white" : `text-[${textColor}]`
        }`}
      >
        {`${platform}로 계속하기`}
      </Text>
    </TouchableOpacity>
  );
};

export default LoginButton;
