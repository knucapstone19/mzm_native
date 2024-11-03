import { useEffect, useRef, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
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

  const handleSelect = (school) => {
    setInputSelect(school);
    modalizeRef.current?.close();
  };

  const updateProfile = async () => {
    const token = await AsyncStorage.getItem("@user_token");
    const userName = await AsyncStorage.getItem("@user_name");

    try {
      const res = await fetch("http://211.243.47.122:3005/user", {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: userName,
          schoolId: inputSelect[0],
        }),
      });

      if (!res.ok) {
        throw new Error("서버 응답이 올바르지 않습니다.");
      }

      await res.json();
    } catch (error) {
      console.error("유저 정보 업데이트 중 오류 발생:", error);
    }

    navigation.replace("Main");
  };

  useEffect(() => {
    const getSchoolData = async () => {
      const res = await fetch("http://211.243.47.122:3005/school");
      const data = await res.json();

      setSchoolData(
        data.map(({ schoolId, schoolName }) => [schoolId, schoolName])
      );
    };

    try {
      getSchoolData();
    } catch (e) {
      console.error(e.message);
    }
  }, []);

  return (
    <GestureHandlerRootView className="flex-1 bg-white">
      <TopBar isBack={true} handleBack={() => navigation.goBack()} />
      <View className="flex-1 flex-col justify-between p-6">
        <View>
          <Text className={`mb-10 ${styles("bold-20-title")} text-[#111111]`}>
            재학중인 학교를 선택해주세요!
          </Text>
          <TouchableOpacity
            className="flex-row justify-between items-center px-4 py-3 border-[1px] border-[#D3D3D3] rounded-[10px]"
            onPress={() => modalizeRef.current?.open()}
            activeOpacity={0.7}
          >
            <Text className={`${styles("16-text")} text-[#111111]`}>
              {inputSelect ? inputSelect[1] : "학교를 선택해주세요!"}
            </Text>
            <SelectIcon />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          className={`py-3.5 rounded-[10px] ${
            !inputSelect ? "bg-[#B0B0B0]" : "bg-[#FF8800]"
          }`}
          onPress={updateProfile}
          activeOpacity={0.7}
          disabled={!inputSelect}
        >
          <Text className={`${styles("16-title")} text-[#FFFFFF] text-center`}>
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
              onPress={() => handleSelect(school)}
              activeOpacity={0.7}
            >
              <Text className={`${styles("16-text")} text-[#111111]`}>
                {school[1]}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Modalize>
    </GestureHandlerRootView>
  );
};

export default SchoolForm;
