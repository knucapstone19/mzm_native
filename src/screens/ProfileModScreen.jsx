import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import TopBar from "../components/TopBar";
import { useState } from "react";
import styles from "../styles/styles";

const ProfileModScreen = () => {
  const route = useRoute();
  const [nickname, setNickname] = useState(route.params.data[0]);
  const navigation = useNavigation();

  console.log(route.params);
  return (
    <View className="flex-1">
      <TopBar
        isBack={true}
        title="프로필 수정"
        bgColor="white"
        onPress={() => navigation.goBack()}
      />
      <View className="items-center px-6 pt-10">
        <TouchableOpacity>
          <Image
            className="w-32 h-32"
            source={require("../../assets/images/profile.png")}
          />
        </TouchableOpacity>
        <View className="bg-white flex-row items-center w-full px-4 py-4 mt-10 rounded-t-[10px] border-[1px] border-[#D3D3D3]">
          <Text className={`${styles("14-text")} text-[#111111]`}>닉네임</Text>
          <TextInput
            className="font-normal text-base leading-[22.4px] tracking-normal text-[#111111] w-60 pl-2 py-1.5 absolute left-20"
            placeholder="닉네임을 입력해주세요"
            value={nickname}
            onChangeText={(nickname) => setNickname(nickname)}
          />
        </View>
      </View>
    </View>
  );
};

export default ProfileModScreen;
