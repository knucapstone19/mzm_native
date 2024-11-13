import { Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ArrowIcon from "../../assets/images/icons/arrow.svg";
import styles from "../styles/styles";

const HistCardButton = ({ title, text }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      className="flex-row justify-between items-center px-4 pt-[14px] pb-4 border-[1px] border-[#D3D3D3] rounded-[10px] bg-white"
      onPress={() =>
        title === "음식 MBTI 기록" && navigation.navigate("MbtiHistory")
      }
      activeOpacity={0.8}
    >
      <View className="flex-col">
        <Text className={`${styles("14-title")} text-[#111111]`}>{title}</Text>
        <Text className={`mt-1 ${styles("12-text")} text-[#383838]`}>
          {text}
        </Text>
      </View>
      <ArrowIcon />
    </TouchableOpacity>
  );
};

export default HistCardButton;
