import { Image, Text, View } from "react-native";
import styles from "../styles/styles";

const ReviewSummary = ({ src, title, content }) => {
  <View className="space-y-2">
    <View className="flex-row items-center space-x-1.5">
      <Image source={src} className="w-6 h-6" />
      <Text className={`${styles("main")} text-[#111111]`}>{title}</Text>
    </View>
    <View className="p-4 border-[1px] border-[#D3D3D3] rounded-md">
      <Text className={`${styles("16-text")} text-[#383838]`}>{content}</Text>
    </View>
  </View>;
};

export default ReviewSummary;
