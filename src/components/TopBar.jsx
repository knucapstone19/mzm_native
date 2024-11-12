import { Text, TouchableOpacity, View } from "react-native";
import BackIcon from "../../assets/images/icons/back.svg";
import styles from "../styles/styles";

const TopBar = ({
  title = null,
  isBack = false,
  bgColor = null,
  handleBack = () => {},
}) => {
  return (
    <View
      className={`flex-row ${
        !isBack ? "justify-center" : "justify-between"
      } items-center w-full h-14 px-6 ${
        title && "border-b-[1px] border-[#D3D3D3]"
      } bg-${bgColor}`}
    >
      {isBack && (
        <TouchableOpacity onPress={handleBack} activeOpacity={0.7}>
          <BackIcon />
        </TouchableOpacity>
      )}
      <Text className={`${styles("18-title")} text-[#111111]`}>{title}</Text>
      {title && isBack && <View className="w-[28px] h-[28px]" />}
    </View>
  );
};

export default TopBar;
