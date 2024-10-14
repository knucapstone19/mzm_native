import { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Modalize } from "react-native-modalize";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TopBar from "../components/TopBar";
import SelectIcon from "../../assets/images/icons/select.svg";
import styles from "../styles/styles";

const SchoolForm = () => {
  const [schoolData, setSchoolData] = useState([]);
  const [inputSelect, setInputSelect] = useState(null);
  const modalizeRef = useRef(null);
  const navigation = useNavigation();

  useEffect(() => {
    const getSchool = async () => {
      const res = await fetch("http://211.243.47.122:3005/school");
      const data = await res.json();

      setSchoolData(data.map(({ schoolName }) => schoolName));
    };

    try {
      getSchool();
    } catch (e) {
      console.error(e.message);
    }
  }, []);

  return (
    <GestureHandlerRootView className="bg-white flex-1">
      <TopBar isBack={true} onPress={() => navigation.goBack()} />
      <View className="flex-1 flex-col justify-between px-6 py-6">
        <View>
          <Text className={`mb-10 ${styles("bold-20-title")} text-[#111111]`}>
            재학중인 학교를 선택해주세요!
          </Text>

          <TouchableOpacity
            className="flex-row justify-between items-center px-4 py-3 border-[1px] border-[#D3D3D3] rounded-[10px]"
            activeOpacity={0.7}
            onPress={() => modalizeRef.current?.open()}
          >
            <Text className={`${styles("16-text")} text-[#111111]`}>
              {inputSelect ? inputSelect : "학교를 선택해주세요!"}
            </Text>
            <SelectIcon />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          className={`${
            !inputSelect ? "bg-[#B0B0B0]" : "bg-[#FF8800]"
          }  py-3.5 rounded-[10px]`}
          activeOpacity={0.7}
          onPress={async () => {
            const token = await AsyncStorage.getItem("@user_token");
            const userName = await AsyncStorage.getItem("@user_name");
            console.log(token);
            console.log(userName);
            console.log(inputSelect);

            // PUT 메서드 만들어지면 다시 테스트
            try {
              const res = await fetch("http://211.243.47.122:3005/user", {
                method: "PUT",
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  user: {
                    name: userName,
                    school: inputSelect,
                  },
                }),
              });

              if (!res.ok) {
                throw new Error("서버 응답이 올바르지 않습니다.");
              }

              const result = await res.json();
              console.log("업데이트된 유저 정보:", result);
            } catch (error) {
              console.error("유저 정보 업데이트 중 오류 발생:", error);
            }

            navigation.replace("Main");
          }}
          disabled={!inputSelect}
        >
          <Text className={`${styles("16-title")} text-center text-[#FFFFFF]`}>
            완료
          </Text>
        </TouchableOpacity>
      </View>

      <Modalize
        ref={modalizeRef}
        snapPoint={400}
        handlePosition="inside"
        avoidKeyboardLikeIOS={true}
        HeaderComponent={
          <View className="pt-6">
            <Text
              className={`pt-6 pb-4 ${styles(
                "bold-20-title"
              )} text-[#111111] text-center`}
            >
              학교를 선택하세요!
            </Text>
          </View>
        }
        // keyboardAvoidingBehavior={Platform.OS === "ios" ? undefined : "height"}
      >
        <ScrollView>
          {schoolData.map((school, index) => (
            <TouchableOpacity
              key={index}
              className="px-6 py-[17px]"
              activeOpacity={0.7}
              onPress={() => {
                setInputSelect(school);
                modalizeRef.current?.close();
              }}
            >
              <Text className={`${styles("16-text")} text-[#111111]`}>
                {school}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Modalize>
    </GestureHandlerRootView>
  );
};

export default SchoolForm;
