import { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Modalize } from "react-native-modalize";
import TopBar from "../components/TopBar";
import styles from "../styles/styles";

const ProfileModScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [schoolData, setSchoolData] = useState([]);
  const [nickname, setNickname] = useState(route.params.data[0]);
  const [school, setSchool] = useState([null, route.params.data[1]]);
  const [isDisabled, setIsDisabled] = useState(true);
  const [message, setMessage] = useState("");
  const modalizeRef = useRef(null);

  useEffect(() => {
    const getSchool = async () => {
      const res = await fetch("http://211.243.47.122:3005/school");
      const data = await res.json();

      setSchoolData(
        data.map(({ schoolId, schoolName }) => [schoolId, schoolName])
      );
    };

    try {
      getSchool();
    } catch (e) {
      console.error(e.message);
    }
  }, []);

  useEffect(() => {
    let isDuplicated = null;
    const checkError = async () => {
      if (nickname !== route.params.data[0]) {
        try {
          const res = await fetch(
            `http://211.243.47.122:3005/user/duplicate-name?name=${nickname}`
          );
          isDuplicated = await res.json();
        } catch (e) {
          console.error(e.message);
        }
      }

      if (nickname.length < 2 || nickname.length > 10) {
        setIsDisabled(true);
        setMessage("2 ~ 10자 사이로 입력해주세요.");
      } else if (/[!@#\$%\^\&*\)\(+=._-]|[\s]/.test(nickname)) {
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
  }, [nickname]);

  return (
    <GestureHandlerRootView className="flex-1">
      <TopBar
        isBack={true}
        title="프로필 수정"
        bgColor="white"
        onPress={() => navigation.goBack()}
      />

      <View className="items-center px-6 pt-10">
        <TouchableOpacity>
          <Image
            className="w-32 h-32"
            source={require("../../assets/images/profile.png")}
          />
        </TouchableOpacity>

        <View className="w-full mt-10">
          <View
            className={`bg-white flex-col p-4 rounded-t-[10px] border-[1px] ${
              isDisabled ? "border-[#EC2222]" : "border-[#D3D3D3]"
            }`}
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
                className="font-normal text-base leading-[22.4px] tracking-normal text-[#111111] w-56 pl-1 py-0 absolute left-20"
                placeholder="닉네임을 입력해주세요"
                value={nickname}
                onChangeText={(nickname) => setNickname(nickname)}
              />
            </View>
            {isDisabled && (
              <Text
                className={`pl-1 ml-20 mt-2 ${styles(
                  "12-text"
                )} text-[#EC2222]`}
              >
                {message}
              </Text>
            )}
          </View>

          <View className="bg-white flex-row items-center p-4 rounded-b-[10px] border-x-[1px] border-b-[1px] border-[#D3D3D3]">
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
          className={`${
            isDisabled ? "bg-[#B0B0B0]" : "bg-[#FF8800]"
          } w-full py-3.5 mt-10 rounded-[10px]`}
          activeOpacity={0.7}
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
                setSchool(school);
                modalizeRef.current?.close();
              }}
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
