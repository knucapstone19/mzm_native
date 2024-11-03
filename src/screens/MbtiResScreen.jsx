import { Share, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import TopBar from "../components/TopBar";
import styles from "../styles/styles";

const MbtiResScreen = ({ route }) => {
  const { res } = route.params;
  const navigation = useNavigation();

  const handleShare = async () => {
    try {
      await Share.share({
        message: `음식 MBTI 분석 결과\n\n나의 음식 취향: ${res.type}\n분석 내용: ${res.content}`,
      });
    } catch (error) {
      Alert.alert("오류 발생", error.message);
    }
  };

  return (
    <View className="flex-1 bg-[#FAFAFA]">
      <TopBar isBack={true} handleBack={() => navigation.navigate("Main")} />
      <View className="items-center h-[480px] space-y-20 p-10">
        <Text className={`${styles("24-title")} text-[#111111]`}>
          당신의 음식 취향은?
        </Text>
        <View className="items-center space-y-10">
          <Text className={`${styles("40-title")} text-[#111111]`}>
            {res.type}
          </Text>
          <Text className={`${styles("16-text")} text-[#383838]`}>
            {res.content}
          </Text>
        </View>
      </View>
      <View className="items-center space-y-4">
        <TouchableOpacity
          className="w-[188px] py-2.5 rounded-full bg-[#40BAFF]"
          onPress={() => navigation.navigate("Main")}
          activeOpacity={0.7}
        >
          <Text className={`${styles("16-title")} text-white text-center`}>
            알겠습니다!
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ elevation: 1 }}
          className="w-[188px] py-[10px] rounded-full bg-white"
          onPress={handleShare}
          activeOpacity={0.7}
        >
          <Text className={`${styles("16-title")} text-[#40BAFF] text-center`}>
            공유하기
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MbtiResScreen;
