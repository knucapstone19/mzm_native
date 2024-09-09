import { Text, TouchableOpacity, View } from "react-native";
import ArrowIcon from "../../assets/images/icons/arrow.svg";
import styles from "../styles/styles";

const HistCardButton = ({ title, text }) => {
  return (
    <TouchableOpacity className="bg-white flex-row justify-between items-center pt-[14px] pb-4 px-4 border-[1px] border-[#D3D3D3] rounded-[10px]">
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
