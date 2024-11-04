import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Easing,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import getUser from "../hooks/getUser";
import HistTabButton from "../components/HistTabButton";
import styles from "../styles/styles";

const ProfileSector = () => {
  const [profileData, setProfileData] = useState([]);
  const navigation = useNavigation();
  const opacity = new Animated.Value(0);

  const handleLoad = () => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

  useFocusEffect(
    useCallback(() => {
      const getProfile = async () => {
        try {
          const token = await AsyncStorage.getItem("@user_token");
          const data = await getUser(token);
          setProfileData([
            data?.user.profileUrl,
            data?.user.username,
            data?.user.school.schoolId,
            data?.user.school.schoolName,
          ]);
        } catch (error) {
          console.error(error);
        }
      };
      getProfile();
    }, [])
  );

  return (
    <View
      style={{
        elevation: 1,
        borderRadius: 10,
      }}
      className="mt-4 mb-8"
    >
      <View className="flex-col px-4 pt-6 pb-4 rounded-[10px] bg-white">
        <View className="flex-row justify-center items-center space-x-6">
          {!profileData[0] ? (
            <ActivityIndicator size="large" color="#FF8800" />
          ) : (
            <Animated.Image
              source={{ uri: profileData[0] }}
              style={{ opacity }}
              className="w-28 h-28 rounded-full"
              onLoad={handleLoad}
            />
          )}

          <View className="flex-col">
            <View className="flex-row items-center mb-6">
              <Text className={`pr-2 ${styles("16-title")} text-[#383838]`}>
                {profileData[1]}
              </Text>
              <View className="h-[14px] border-[0.5px] border-[#666666]" />
              <Text className={`pl-2 ${styles("16-text")} text-[#A9A9A9]`}>
                {profileData[3]}
              </Text>
            </View>
            <TouchableOpacity
              className="flex-row justify-center items-center px-4 py-2.5 rounded-full bg-[#FF8800]"
              onPress={() => navigation.navigate("ProfileMod", { profileData })}
              activeOpacity={0.7}
            >
              <Text className={`${styles("14-text")} text-white`}>
                프로필 수정
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className="flex-row justify-around items-center mt-7">
          <HistTabButton
            src={require("../../assets/images/3d/pin.png")}
            text="찜한 식당"
          />
          <View className="h-6 border-[0.5px] border-[#D3D3D3]" />
          <HistTabButton
            src={require("../../assets/images/3d/review.png")}
            text="작성한 리뷰"
          />
        </View>
      </View>
    </View>
  );
};

export default ProfileSector;
