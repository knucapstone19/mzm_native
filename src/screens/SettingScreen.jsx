import { useEffect, useRef, useState } from "react";
import {
  Alert,
  BackHandler,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TopBar from "../components/TopBar";
import ArrowIcon from "../../assets/images/icons/arrow.svg";
import styles from "../styles/styles";

const SettingScreen = () => {
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const isFirstRef = useRef(true);
  const navigation = useNavigation();

  const handleLogOut = async () => {
    await AsyncStorage.removeItem("@user_token");
    await AsyncStorage.removeItem("@user_name");
    setIsLoggedOut(true);

    if (Platform.OS === "ios") {
      Alert.alert("앱을 종료하려면 홈 버튼을 눌러주세요.", "");
    } else {
      BackHandler.exitApp();
    }
  };

  const handleWithdraw = async () => {
    const token = await AsyncStorage.getItem("@user_token");

    try {
      const res = await fetch("http://211.243.47.122:3005/user", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("서버 응답이 올바르지 않습니다.");
      }

      await res.json();
    } catch (error) {
      console.error("유저 정보 삭제 중 오류 발생:", error);
    }

    handleLogOut();
  };

  const checkWithdraw = () => {
    Alert.alert(
      "회원 탈퇴",
      "정말로 회원 탈퇴를 하시겠습니까?",
      [
        {
          text: "취소",
          style: "cancel",
        },
        {
          text: "확인",
          onPress: handleWithdraw,
        },
      ],
      { cancelable: true }
    );
  };

  useEffect(() => {
    if (isFirstRef.current) {
      isFirstRef.current = false;
      return;
    }

    navigation.replace("Login");
  }, [isLoggedOut]);

  return (
    <View>
      <TopBar
        title="환경 설정"
        isBack={true}
        bgColor="white"
        handleBack={() => navigation.goBack()}
      />
      <View>
        <View>
          <Text
            className={`p-4 ${styles(
              "16-text"
            )} text-[#111111] border-b-[1px] border-[#D3D3D3]`}
          >
            계정
          </Text>
          <View className="bg-white">
            <TouchableOpacity
              className="flex-row justify-between items-center p-4 border-b-[1px] border-[#D3D3D3]"
              onPress={handleLogOut}
              activeOpacity={0.7}
            >
              <Text className={`${styles("14-text")} text-[#383838]`}>
                로그아웃
              </Text>
              <ArrowIcon />
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-row justify-between items-center p-4 border-b-[1px] border-[#D3D3D3]"
              onPress={checkWithdraw}
              activeOpacity={0.7}
            >
              <Text className={`${styles("14-text")} text-[#E21B1B]`}>
                회원탈퇴
              </Text>
              <ArrowIcon />
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <Text
            className={`p-4 ${styles(
              "16-text"
            )} text-[#111111] border-b-[1px] border-[#D3D3D3]`}
          >
            서비스 동의
          </Text>
          <View className="bg-white">
            <TouchableOpacity
              className="flex-row justify-between items-center p-4 border-b-[1px] border-[#D3D3D3]"
              activeOpacity={0.7}
            >
              <Text className={`${styles("14-text")} text-[#383838]`}>
                계정 정보 활용 및 마케팅 정보 수신
              </Text>
              <ArrowIcon />
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-row justify-between items-center p-4 border-b-[1px] border-[#D3D3D3]"
              activeOpacity={0.7}
            >
              <Text className={`${styles("14-text")} text-[#383838]`}>
                라이선스 확인
              </Text>
              <ArrowIcon />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SettingScreen;
