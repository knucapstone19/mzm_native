import { useEffect, useState } from "react";
import {
  Animated,
  FlatList,
  Image,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import TopBar from "../components/TopBar";
import MbtiQuestion from "../components/MbtiQuestion";
import ContentButton from "../components/ContentButton";
import MbtiQData from "../json/mbtiQData.json";
import MbtiRData from "../json/mbtiRData.json";
import styles from "../styles/styles";
import postMbtiHistory from "../hooks/postMbtiHistory";

const MbtiTestScreen = () => {
  const [resArray, setResArray] = useState(
    Array.from({ length: MbtiQData.length })
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [fadeAnim] = useState(new Animated.Value(0));
  const navigation = useNavigation();

  const resData = () => {
    const propVal = new Map();

    resArray.forEach(([key, val]) => {
      propVal.has(key)
        ? propVal.set(key, propVal.get(key) + val)
        : propVal.set(key, val);
    });

    return `${propVal.get("맵") > 0 ? "맵" : "순"}${
      propVal.get("짠") > 0 ? "짠" : "싱"
    }${propVal.get("달") > 0 ? "달" : "씀"}${
      propVal.get("고") > 0 ? "고" : "채"
    }`;
  };

  const handleNavigate = async () => {
    setIsLoading(true);

    const resType = resData();
    await postMbtiHistory(resType);

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        const resType = resData();
        navigation.navigate("MbtiRes", {
          res: MbtiRData.filter((mbti) => mbti.type === resType)[0],
        });
      }, 3000);
    });
  };

  useEffect(() => {
    let isNotSelected = resArray.filter((res) => res === undefined).length;
    setIsDisabled(isNotSelected !== 0);
  }, [resArray]);

  return (
    <>
      {isLoading ? (
        <Animated.View
          style={{ opacity: fadeAnim }}
          className="flex-1 justify-center items-center bg-[#FAFAFA]"
        >
          <Text className={`${styles("24-title")} text-[#111111] text-center`}>
            모든 항목을 완료했습니다! {"\n"} 잠시만 기다려주세요.
          </Text>
          <Image
            source={require("../../assets/images/check.png")}
            className="w-44 h-44 mt-16"
          />
        </Animated.View>
      ) : (
        <ScrollView className="bg-white">
          <TopBar isBack={true} handleBack={() => navigation.goBack()} />
          <View className="items-center pb-6">
            <View className="items-center space-y-2 pt-4 pb-12">
              <Text className={`${styles("24-title")} text-[#111111]`}>
                음식 MBTI 검사 항목입니다.
              </Text>
              <Text className={`${styles("14-text")} text-[#383838]`}>
                항목은 총 20개이며 예상 시간은 40분입니다.
              </Text>
            </View>
            <FlatList
              data={MbtiQData}
              renderItem={({ item, index }) => (
                <MbtiQuestion
                  key={index}
                  idx={index}
                  question={item.question}
                  rating={item.rating}
                  attribute={item.attribute}
                  res={resArray}
                  sendRes={setResArray}
                />
              )}
              keyExtractor={(_, idx) => idx.toString()}
              scrollEnabled={false}
            />
            <ContentButton
              text="완료"
              isDisabled={isDisabled}
              handleNavigate={handleNavigate}
            />
          </View>
        </ScrollView>
      )}
    </>
  );
};

export default MbtiTestScreen;
