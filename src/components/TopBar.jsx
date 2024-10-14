import { View, Text, TouchableOpacity } from "react-native";
import BackIcon from "../../assets/images/icons/back.svg";
import MenuIcon from "../icons/MenuIcon";
import styles from "../styles/styles";

const TopBar = ({
  title = null,
  isBack = false,
  isMenu = false,
  bgColor = null,
  onPress = () => {},
}) => {
  return (
    <View
      className={`bg-${bgColor} flex-row ${
        !(isBack || isMenu) ? "justify-center" : "justify-between"
      } items-center w-full h-14 px-6 ${
        title || isMenu ? "border-b-[1px] border-[#D3D3D3]" : null
      }`}
    >
      {isBack && (
        <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
          <BackIcon />
        </TouchableOpacity>
      )}
      <Text className={`${styles("18-title")} text-[#111111]`}>{title}</Text>
      {isMenu && (
        <TouchableOpacity activeOpacity={0.7}>
          <MenuIcon />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default TopBar;
