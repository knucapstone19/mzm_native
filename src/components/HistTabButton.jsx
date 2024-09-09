import { Text, TouchableOpacity, Image } from "react-native";
import styles from "../styles/styles";

const HistTabButton = ({ src, text }) => {
  return (
    <TouchableOpacity className="flex-col items-center">
      <Image className="w-12 h-12" source={src} />
      <Text className={`mt-2 ${styles("14-text")} text-[#383838]`}>{text}</Text>
    </TouchableOpacity>
  );
};

export default HistTabButton;
