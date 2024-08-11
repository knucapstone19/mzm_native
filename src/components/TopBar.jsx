import { Text, TouchableOpacity, View } from "react-native";
import BackIcon from "../../assets/images/icons/back.svg";
import MenuIcon from "../icons/MenuIcon";

const TopBar = ({ title }) => {
  return (
    <View className="bg-white flex-row justify-between items-center px-6 py-3 border-b-[1px] border-[#D3D3D3]">
      <TouchableOpacity>
        <BackIcon />
      </TouchableOpacity>
      <Text className="font-korean text-center text-base text-black font-bold">
        {title}
      </Text>
      <TouchableOpacity>
        <MenuIcon color="#000000" />
      </TouchableOpacity>
    </View>
  );
};

export default TopBar;
