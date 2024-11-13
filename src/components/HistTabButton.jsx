import { Image, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "../styles/styles";

const HistTabButton = ({ src, text, target }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      className="flex-col items-center"
      onPress={() => navigation.navigate(target)}
      activeOpacity={0.7}
    >
      <Image source={src} className="w-12 h-12" />
      <Text className={`mt-2 ${styles("14-text")} text-[#383838]`}>{text}</Text>
    </TouchableOpacity>
  );
};

export default HistTabButton;
