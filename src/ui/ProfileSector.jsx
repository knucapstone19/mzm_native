import { View, Text, TouchableOpacity, Image } from "react-native";
import HistTabButton from "../components/HistTabButton";
import styles from "../styles/styles";

const ProfileSector = () => {
  return (
    <View
      style={{
        elevation: 1,
        borderRadius: 10,
      }}
      className="mt-4 mb-8"
    >
      <View className="bg-white flex flex-col pt-[14px] pb-4 px-4 rounded-[10px]">
        <View className="flex-row items-center">
          <TouchableOpacity className="mr-6">
            <Image
              className="w-32 h-32"
              source={require("../../assets/images/profile.png")}
            />
          </TouchableOpacity>
          <View className="flex-col">
            <View className="flex-row items-center mb-6">
              <Text className={`pr-2 ${styles("16-title")} text-[#383838]`}>
                닉네임
              </Text>
              <View className="h-[14px] border-[0.5px] border-[#666666]" />
              <Text className={`pl-2 ${styles("16-text")} text-[#A9A9A9]`}>
                강남대
              </Text>
            </View>
            <TouchableOpacity className="bg-[#FF8800] flex-row justify-center items-center px-4 py-2.5 rounded-full">
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
          <View className="h-[24px] border-[0.5px] border-[#D3D3D3]" />
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
