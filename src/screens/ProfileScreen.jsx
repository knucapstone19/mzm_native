import { View, Text, Image, TouchableOpacity } from "react-native";
import ArrowIcon from "../../assets/images/icons/arrow.svg";
import TopBar from "../components/TopBar";
import styles from "../styles/styles";

const ProfileScreen = () => {
  return (
    <View>
      <TopBar title="마이프로필" />
      <View className="mx-6">
        <View
          style={{
            shadowRadius: 10,
            elevation: 1,
            backgroundColor: "transparent",
            borderRadius: 10,
          }}
          className="mt-5 mb-2"
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
                  <TouchableOpacity className="flex-col items-center pr-2">
                    <Text className={`${styles("16-title")} text-[#383838]`}>
                      닉네임
                    </Text>
                  </TouchableOpacity>
                  <View className="h-[14px] border-[0.5px] border-[#666666]" />
                  <TouchableOpacity className="flex-col items-center pl-2">
                    <Text className={`${styles("16-text")} text-[#A9A9A9]`}>
                      강남대
                    </Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity className="bg-[#FF8800] flex-row justify-center items-center px-4 py-2.5 rounded-full">
                  <Text className={`${styles("14-text")} text-white`}>
                    프로필 수정
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View className="flex-row justify-around items-center mt-7">
              <TouchableOpacity className="flex-col items-center">
                <Image
                  className="w-12 h-12"
                  source={require("../../assets/images/3d/pin.png")}
                />
                <Text className={`mt-2 ${styles("14-text")} text-[#383838]`}>
                  찜한 식당
                </Text>
              </TouchableOpacity>
              <View className="h-[24px] border-[0.5px] border-[#D3D3D3]" />
              <TouchableOpacity className="flex-col items-center">
                <Image
                  className="w-12 h-12"
                  source={require("../../assets/images/3d/review.png")}
                />
                <Text className={`mt-2 ${styles("14-text")} text-[#383838]`}>
                  작성한 리뷰
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <TouchableOpacity className="mt-8 bg-white flex-row justify-between items-center pt-[14px] pb-4 px-4 border-[1px] border-[#D3D3D3] rounded-[10px]">
          <View className="flex-col">
            <Text className={`${styles("14-title")} text-[#111111]`}>
              음식 MBTI 기록
            </Text>
            <Text className={`mt-1 ${styles("12-text")} text-[#383838]`}>
              음식 MBTI 활동한 결과들을 확인해보세요!
            </Text>
          </View>
          <ArrowIcon />
        </TouchableOpacity>
        <TouchableOpacity className="mt-4 bg-white flex-row justify-between items-center pt-[14px] pb-4 px-4 border-[1px] border-[#D3D3D3] rounded-[10px]">
          <View className="flex-col">
            <Text className={`${styles("14-title")} text-[#111111]`}>
              음식 닮은꼴 AI 테스트 기록
            </Text>
            <Text className={`mt-1 ${styles("12-text")} text-[#383838]`}>
              음식 닮은꼴 AI 테스트를 활동한 결과들을 확인해보세요!
            </Text>
          </View>
          <ArrowIcon />
        </TouchableOpacity>
        <TouchableOpacity className="mt-4 bg-white flex-row justify-between items-center pt-[14px] pb-4 px-4 border-[1px] border-[#D3D3D3] rounded-[10px]">
          <View className="flex-col">
            <Text className={`${styles("14-title")} text-[#111111]`}>
              음식 이상형 월드컵 기록
            </Text>
            <Text className={`mt-1 ${styles("12-text")} text-[#383838]`}>
              음식 이상형 월드컵을 활동한 결과들을 확인해보세요!
            </Text>
          </View>
          <ArrowIcon />
        </TouchableOpacity>
        <TouchableOpacity className="bg-[#FF8800] mt-10 py-[11px] rounded-[10px]">
          <Text className={`${styles("16-title")} text-center text-white`}>
            로그아웃
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileScreen;
