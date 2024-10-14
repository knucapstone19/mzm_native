import { View, Text, TouchableOpacity, Share } from "react-native";
import { useNavigation } from "@react-navigation/native";
import TopBar from "../components/TopBar";
import styles from "../styles/styles";

const MbtiResScreen = ({ route }) => {
  const { data } = route.params;
  const navigation = useNavigation();

  return (
    <View className="bg-[#FAFAFA] flex-1">
      <TopBar isBack={true} onPress={() => navigation.navigate("Main")} />
      <View className="items-center h-[480px] p-10 space-y-20">
        <Text className={`${styles("24-title")} text-[#111111]`}>
          당신의 음식 취향은?
        </Text>
        <View className="items-center space-y-10">
          <Text className={`${styles("40-title")} text-[#111111]`}>
            {data.type}
          </Text>
          <Text className={`${styles("16-text")} text-[#383838]`}>
            {data.content}
          </Text>
        </View>
      </View>
      <View className="items-center space-y-4">
        <TouchableOpacity
          className="bg-[#40BAFF] w-[188px] py-[10px] rounded-full"
          activeOpacity={0.7}
        >
          <Text
            className={`${styles("16-title")} text-white text-center`}
            onPress={() => navigation.navigate("Main")}
          >
            알겠습니다!
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ elevation: 1 }}
          className="bg-white w-[188px] py-[10px] rounded-full"
          activeOpacity={0.7}
        >
          <Text
            className={`${styles("16-title")} text-[#40BAFF] text-center`}
            onPress={async () => {
              try {
                await Share.share({
                  message: `음식 MBTI 분석 결과\n\n나의 음식 취향: ${data.type}\n분석 내용: ${data.content}`,
                });
              } catch (error) {
                Alert.alert("오류 발생", error.message);
              }
            }}
          >
            공유하기
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MbtiResScreen;
