import { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Animated,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import TopBar from "../components/TopBar";
import MbtiQuestion from "../components/MbtiQuestion";
import MbtiQData from "../json/mbtiQData.json";
import MbtiRData from "../json/mbtiRData.json";
import styles from "../styles/styles";

const MbtiTestScreen = () => {
  const navigation = useNavigation();
  const [resArray, setResArray] = useState(
    Array.from({ length: MbtiQData.length })
  );
  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    setIsDisabled(resArray.filter((res) => res === undefined).length !== 0);
  }, [resArray]);

  return (
    <>
      {isLoading ? (
        <Animated.View
          style={{ opacity: fadeAnim }}
          className="bg-[#FAFAFA] flex-1 justify-center items-center"
        >
          <Text className={`${styles("24-title")} text-[#111111] text-center`}>
            모든 항목을 완료했습니다! {"\n"} 잠시만 기다려주세요.
          </Text>
          <Image
            className="w-44 h-44 mt-16"
            source={require("../../assets/images/check.png")}
          />
        </Animated.View>
      ) : (
        <ScrollView className="bg-white">
          <TopBar isBack={true} onPress={() => navigation.goBack()} />
          <View className="items-center pb-6">
            <View className="items-center space-y-2 pt-4 pb-12">
              <Text className={`${styles("24-title")} text-[#111111]`}>
                음식 MBTI 검사 항목입니다.
              </Text>
              <Text className={`${styles("14-text")} text-[#383838]`}>
                항목은 총 20개이며 예상 시간은 40분입니다.
              </Text>
            </View>
            {MbtiQData.map((res, idx) => (
              <MbtiQuestion
                key={idx}
                num={idx}
                question={res.question}
                rating={res.rating}
                prop={res.prop}
                res={resArray}
                sendRes={setResArray}
              />
            ))}
            <TouchableOpacity
              className={`${
                isDisabled ? "bg-[#B0B0B0]" : "bg-[#40BAFF]"
              } w-48 py-2.5 mt-10 rounded-full`}
              activeOpacity={0.7}
              onPress={() => {
                const propVal = new Map();

                resArray.forEach(([key, val]) => {
                  propVal.has(key)
                    ? propVal.set(key, propVal.get(key) + val)
                    : propVal.set(key, val);
                });

                const resType = `${propVal.get("맵") > 0 ? "맵" : "순"}${
                  propVal.get("짠") > 0 ? "짠" : "싱"
                }${propVal.get("달") > 0 ? "달" : "씀"}${
                  propVal.get("고") > 0 ? "고" : "채"
                }`;

                // TODO: 음식 MBTI 활동 내역 서버에 put할 예정 (백엔드 기능 구현 아직)

                setIsLoading(true);

                Animated.timing(fadeAnim, {
                  toValue: 1,
                  duration: 1000,
                  useNativeDriver: true,
                }).start(() => {
                  setTimeout(() => {
                    navigation.navigate("MbtiRes", {
                      data: MbtiRData.filter(
                        (mbti) => mbti.type === resType
                      )[0],
                    });
                  }, 3000);
                });
              }}
              disabled={isDisabled}
            >
              <Text className={`${styles("16-title")} text-center text-white`}>
                완료
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </>
  );
};

export default MbtiTestScreen;
