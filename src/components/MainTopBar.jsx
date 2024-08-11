import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import LogoIcon from "../../assets/images/icons/logo.svg";
import SearchIcon from "../../assets/images/icons/search.svg";
import ProfileIcon from "../icons/ProfileIcon";
import MenuIcon from "../icons/MenuIcon";

const MainTopBar = () => {
  const navigation = useNavigation();

  return (
    <View className="bg-white px-6 pb-4 border-b-[1px] border-[#D3D3D3]">
      <View className="flex-row justify-between">
        <View className="flex-row items-center space-x-3">
          <LogoIcon />
          <Text className="font-korean text-xl text-[#383838] font-bold">
            강남대
          </Text>
        </View>
        <View className="flex-row items-center space-x-2">
          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <ProfileIcon />
          </TouchableOpacity>
          <TouchableOpacity>
            <MenuIcon />
          </TouchableOpacity>
        </View>
      </View>
      <View className="flex-row items-center h-11 pl-4 space-x-0.5 border-[1px] border-[#FF8800] rounded-md">
        <SearchIcon />
        <TextInput
          className="text-xs text-[#111111]"
          onPress={() => navigation.navigate("Search")}
          placeholder="찾으시는 메뉴를 검색하세요!"
          placeholderTextColor="#A9A9A9"
          // value={searchText}
          // onChangeText={(text) => setSearchText(text)}
        />
      </View>
    </View>
  );
};

export default MainTopBar;
