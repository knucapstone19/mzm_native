import { View, Text } from "react-native";
import styles from "../styles/styles";

const TopBar = ({ title }) => {
  return (
    <View className="bg-white flex-row justify-center items-center py-[14px] border-b-[1px] border-[#D3D3D3]">
      <Text className={`${styles("18-title")} text-[#111111]`}>{title}</Text>
    </View>
  );
};

export default TopBar;
