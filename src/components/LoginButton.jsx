import { Text, TouchableOpacity, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../styles/styles";

const LoginButton = ({
  color,
  textColor = "#111111",
  borderColor = null,
  src,
  enterprise,
  registrationId,
  setShowWebView,
  setRegistrationId,
}) => {
  return (
    <TouchableOpacity
      style={{ backgroundColor: color }}
      className={`flex-row justify-center py-[14px] space-x-2 rounded-[10px] ${
        borderColor ? `border-[1px] border-[${borderColor}]` : null
      }`}
      activeOpacity={0.7}
      onPress={async () => {
        setShowWebView(true);
        setRegistrationId(registrationId);
        await AsyncStorage.setItem("@registration_id", registrationId);
      }}
    >
      <Image className="w-[22px] h-[22px]" source={src} />
      <Text
        className={`${styles("16-title")} ${
          textColor === "white" ? "text-white" : `text-[${textColor}]`
        }`}
      >
        {`${enterprise}로 계속하기`}
      </Text>
    </TouchableOpacity>
  );
};

export default LoginButton;
