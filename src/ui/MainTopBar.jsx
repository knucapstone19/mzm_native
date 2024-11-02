import { useRef } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import SearchBar from "../components/SearchBar";

import LogoIcon from "../../assets/images/icons/logo.svg";
import MenuIcon from "../icons/MenuIcon";
import styles from "../styles/styles";

const MainTopBar = () => {
  const searchBarRef = useRef();
  const navigation = useNavigation();

  return (
    <View className="bg-white px-6 py-4 absolute z-10 top-0 left-0 right-0 border-b-[1px] border-[#D3D3D3]">
      <View className="flex-row justify-between mb-2">
        <View className="flex-row items-center space-x-4">
          <LogoIcon />
          <Text className={`${styles("bold-20-title")} text-[#383838]`}>
            강남대
          </Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            navigation.navigate("Setting");
          }}
        >
          <MenuIcon />
        </TouchableOpacity>
      </View>
      <SearchBar
        ref={searchBarRef}
        press={() => navigation.navigate("Search")}
      />
    </View>
  );
};

export default MainTopBar;
