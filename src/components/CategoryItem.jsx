import { Image, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "../styles/styles";

const CategoryItem = ({
  idx,
  src,
  text,
  isSmall,
  isSelected = null,
  setIsSelected = () => {},
  margin = 2,
}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      key={idx?.toString()}
      className={`flex-col items-center ${margin === 2 ? "mx-2" : "mx-2.5"}`}
      onPress={() => {
        navigation.navigate("Category", { category: text });
        setIsSelected(text);
      }}
      activeOpacity={0.7}
    >
      <View
        className={`${isSmall ? "p-3" : "p-[10px]"} rounded-full ${
          isSelected === text ? "bg-[#FF8800]/70" : "bg-[#F0F0F0]"
        }`}
      >
        <Image source={src} className={`${isSmall ? "w-6 h-6" : "w-7 h-7"}`} />
      </View>
      <Text
        className={`mt-1 ${styles("14-text")} ${
          isSelected === text ? "text-[#FF8800]/70" : "text-[#383838]"
        } `}
      >
        {text.length > 3 ? text.slice(0, -2) : text}
      </Text>
    </TouchableOpacity>
  );
};

export default CategoryItem;
