import { useCallback, useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import getUser from "../hooks/getUser";
import SearchBar from "../components/SearchBar";
import LogoIcon from "../../assets/images/icons/logo.svg";
import MenuIcon from "../icons/MenuIcon";
import styles from "../styles/styles";

const MainTopBar = () => {
  const [school, setSchool] = useState(null);
  const searchBarRef = useRef();
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      const getSchool = async () => {
        const token = await AsyncStorage.getItem("@user_token");
        const data = await getUser(token);
        const school = data?.user.school.schoolName.slice(0, -2);
        setSchool(school);
      };
      getSchool();
    }, [])
  );

  return (
    <View className="px-6 py-4 absolute z-10 top-0 left-0 right-0 border-b-[1px] border-[#D3D3D3] bg-white">
      <View className="flex-row justify-between mb-2">
        <View className="flex-row items-center space-x-4">
          <LogoIcon />
          <Text className={`${styles("bold-20-title")} text-[#383838]`}>
            {school}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("Setting")}
          activeOpacity={0.7}
        >
          <MenuIcon />
        </TouchableOpacity>
      </View>
      <View className="items-center">
        <SearchBar
          ref={searchBarRef}
          handlePress={() => navigation.navigate("Search")}
        />
      </View>
    </View>
  );
};

export default MainTopBar;
