import { View, Text, TouchableOpacity } from "react-native";
import BackIcon from "../../assets/images/icons/back.svg";
import MenuIcon from "../icons/MenuIcon";
import styles from "../styles/styles";

const TopBar = ({ title = null, isBack = false, isMenu = false }) => {
  return (
    <View
      className={`bg-white flex-row ${
        !(isBack || isMenu) ? "justify-center" : "justify-between"
      } items-center w-full px-6 py-[14px] ${
        title || isMenu ? "border-b-[1px] border-[#D3D3D3]" : null
      }`}
    >
      {isBack && (
        <TouchableOpacity>
          <BackIcon />
        </TouchableOpacity>
      )}
      <Text className={`${styles("18-title")} text-[#111111]`}>{title}</Text>
      {isMenu && (
        <TouchableOpacity>
          <MenuIcon />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default TopBar;
