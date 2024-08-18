import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "../styles/styles";
import LogoIcon from "../../assets/images/icons/logo.svg";
import SearchIcon from "../../assets/images/icons/search.svg";
import MenuIcon from "../icons/MenuIcon";

const MainTopBar = () => {
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
        <TouchableOpacity>
          <MenuIcon color="#363636" />
        </TouchableOpacity>
      </View>
      <View className="flex-row items-center h-[50px] pl-4 space-x-0.5 border-[1px] border-[#FF8800] rounded-md">
        <SearchIcon />
        <TextInput
          className="font-normal text-base leading-[22.4px] tracking-normal text-[#111111]"
          // onPress={() => navigation.navigate("Search")}
          placeholder="찾으시는 메뉴를 검색하세요!"
          placeholderTextColor="#A9A9A9"
          textAlignVertical="center"
          // value={searchText}
          // onChangeText={(text) => setSearchText(text)}
        />
      </View>
    </View>
  );
};

export default MainTopBar;
