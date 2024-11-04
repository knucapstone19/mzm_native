import { Text, TouchableOpacity, View } from "react-native";
import ArrowIcon from "../../assets/images/icons/arrow.svg";
import styles from "../styles/styles";

const SettingSector = ({
  title,
  text,
  highlight = false,
  handlePress = [() => {}, () => {}],
}) => {
  return (
    <View>
      <Text
        className={`p-4 ${styles(
          "16-text"
        )} text-[#111111] border-b-[1px] border-[#D3D3D3]`}
      >
        {title}
      </Text>
      <View className="bg-white">
        <TouchableOpacity
          className="flex-row justify-between items-center p-4 border-b-[1px] border-[#D3D3D3]"
          onPress={handlePress[0]}
          activeOpacity={0.7}
        >
          <Text className={`${styles("14-text")} text-[#383838]`}>
            {text[0]}
          </Text>
          <ArrowIcon />
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-row justify-between items-center p-4 border-b-[1px] border-[#D3D3D3]"
          onPress={handlePress[1]}
          activeOpacity={0.7}
        >
          <Text
            className={`${
              highlight
                ? `${styles("14-title")} text-[#E21B1B]`
                : `${styles("14-text")} text-[#383838]`
            }`}
          >
            {text[1]}
          </Text>
          <ArrowIcon />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SettingSector;
