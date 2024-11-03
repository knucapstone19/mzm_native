import { useCallback, useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import SearchBar from "../components/SearchBar";
import LogoIcon from "../../assets/images/icons/logo.svg";
import MenuIcon from "../icons/MenuIcon";
import styles from "../styles/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MainTopBar = () => {
  const [school, setSchool] = useState(null);
  const navigation = useNavigation();
  const searchBarRef = useRef();

  useFocusEffect(
    useCallback(() => {
      const getSchool = async () => {
        const token = await AsyncStorage.getItem("@user_token");
        let data = null;

        try {
          const res = await fetch("http://211.243.47.122:3005/user", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          data = await res.json();
          setSchool(data?.user.school.schoolName);
        } catch (e) {
          console.error(e.message);
        }
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
      <SearchBar
        ref={searchBarRef}
        handlePress={() => navigation.navigate("Search")}
      />
    </View>
  );
};

export default MainTopBar;
