import { useEffect, useRef, useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Modalize } from "react-native-modalize";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TopBar from "../components/TopBar";
import styles from "../styles/styles";

const ProfileModScreen = ({ route }) => {
  const { profileData } = route.params;
  const [schoolData, setSchoolData] = useState([]);
  const [url, setUrl] = useState(profileData[0]);
  const [userName, setUserName] = useState(profileData[1]);
  const [school, setSchool] = useState([profileData[2], profileData[3]]);
  const [isDisabled, setIsDisabled] = useState(true);
  const [message, setMessage] = useState("");
  const modalizeRef = useRef(null);
  const navigation = useNavigation();

  const handleSelect = (school) => {
    setSchool(school);
    modalizeRef.current?.close();
  };

  const updateProfile = async () => {
    const token = await AsyncStorage.getItem("@user_token");

    const updatedData = {
      schoolId: school[0],
    };

    if (userName !== profileData[1]) {
      updatedData.username = userName;
    }

    try {
      const res = await fetch("http://211.243.47.122:3005/user", {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (!res.ok) {
        throw new Error("서버 응답이 올바르지 않습니다.");
      }

      await res.json();
    } catch (error) {
      console.error("유저 정보 업데이트 중 오류 발생:", error);
    }

    navigation.navigate("Main");
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

  useEffect(() => {
    let isDuplicated = null;
    const checkError = async () => {
      if (userName !== profileData[1]) {
        try {
          const res = await fetch(
            `http://211.243.47.122:3005/user/duplicate-name?name=${userName}`
          );
          isDuplicated = await res.json();
        } catch (e) {
          console.error(e.message);
        }
      }

      if (userName.length < 2 || userName.length > 10) {
        setIsDisabled(true);
        setMessage("2 ~ 10자 사이로 입력해주세요.");
      } else if (/[!@#\$%\^\&*\)\(+=._-]|[\s]/.test(userName)) {
        setIsDisabled(true);
        setMessage("‘_’ 이외의 특수문자 입력은 불가합니다.");
      } else if (isDuplicated) {
        setIsDisabled(true);
        setMessage("중복된 닉네임입니다.");
      } else {
        setIsDisabled(false);
      }
    };
    checkError();
  }, [userName]);

  return (
    <GestureHandlerRootView className="flex-1">
      <TopBar
        title="프로필 수정"
        isBack={true}
        bgColor="white"
        handleBack={() => navigation.goBack()}
      />

      <View className="items-center px-6 pt-10">
        <TouchableOpacity
          className="rounded-full border-4 border-white"
          activeOpacity={0.7}
        >
          <Image source={{ uri: url }} className="w-28 h-28 rounded-full" />
        </TouchableOpacity>

        <View className="w-full mt-10">
          <View
            className={`flex-col p-4 border-[1px] ${
              isDisabled ? "border-[#EC2222]" : "border-[#D3D3D3]"
            } rounded-t-[10px] bg-white`}
          >
            <View className="flex-row items-center">
              <Text
                className={`${styles("14-text")} ${
                  isDisabled ? "text-[#EC2222]" : "text-[#111111]"
                }`}
              >
                닉네임
              </Text>
              <TextInput
                value={userName}
                onChangeText={(userName) => setUserName(userName)}
                placeholder="닉네임을 입력해주세요"
                className="font-normal text-base tracking-normal leading-[22.4px] text-[#111111] w-56 pl-1 py-0 absolute left-20"
              />
            </View>
            {isDisabled && (
              <Text
                className={`ml-20 mt-2 pl-1 ${styles(
                  "12-text"
                )} text-[#EC2222]`}
              >
                {message}
              </Text>
            )}
          </View>

          <View className="flex-row items-center p-4 border-x-[1px] border-b-[1px] border-[#D3D3D3] rounded-b-[10px] bg-white">
            <Text className={`${styles("14-text")} text-[#111111]`}>
              학교 정보
            </Text>
            <TouchableOpacity
              className="w-56 pl-1 absolute left-24"
              onPress={() => modalizeRef.current?.open()}
            >
              <Text className={`${styles("16-text")} text-[#111111]`}>
                {school[1]}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          className={`w-full mt-10 py-3.5 rounded-[10px] ${
            isDisabled ? "bg-[#B0B0B0]" : "bg-[#FF8800]"
          }`}
          onPress={updateProfile}
          activeOpacity={0.7}
          disabled={isDisabled}
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

export default ProfileModScreen;
