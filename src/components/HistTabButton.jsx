import { Image, Text, TouchableOpacity } from "react-native";
import styles from "../styles/styles";

const HistTabButton = ({ src, text }) => {
  return (
    <TouchableOpacity className="flex-col items-center" activeOpacity={0.7}>
      <Image source={src} className="w-12 h-12" />
      <Text className={`mt-2 ${styles("14-text")} text-[#383838]`}>{text}</Text>
    </TouchableOpacity>
  );
};

export default HistTabButton;
