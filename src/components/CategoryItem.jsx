import { Image, Text, TouchableOpacity, View } from "react-native";
import styles from "../styles/styles";

const CategoryItem = ({ idx, src, text, isSmall, margin = 2 }) => {
  return (
    <TouchableOpacity
      key={idx.toString()}
      className={`flex-col items-center ${margin === 2 ? "mx-2" : "mx-2.5"}`}
      onPress={() => console.log(text)}
      activeOpacity={0.7}
    >
      <View
        className={`${isSmall ? "p-3" : "p-[10px]"} rounded-full bg-[#F0F0F0]`}
      >
        <Image source={src} className={`${isSmall ? "w-6 h-6" : "w-7 h-7"}`} />
      </View>
      <Text className={`mt-1 ${styles("14-text")} text-[#383838]`}>{text}</Text>
    </TouchableOpacity>
  );
};

export default CategoryItem;
