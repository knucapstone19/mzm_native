import { useEffect, useRef, useState } from "react";
import { Alert, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import deleteUser from "../hooks/deleteUser";
import TopBar from "../components/TopBar";
import SettingSector from "../components/SettingSector";
import handleLogOut from "../hooks/handleLogOut";

const SettingScreen = () => {
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const isFirstRef = useRef(true);
  const navigation = useNavigation();

  const handleWithdraw = async () => {
    await deleteUser();
    handleLogOut(setIsLoggedOut);
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
        <SettingSector
          title="계정"
          text={["로그아웃", "회원탈퇴"]}
          highlight={true}
          handlePress={[() => handleLogOut(setIsLoggedOut), checkWithdraw]}
        />
        <SettingSector
          title="서비스 동의"
          text={["계정 정보 활용 및 마케팅 정보 수신", "라이선스 확인"]}
        />
      </View>
    </View>
  );
};

export default SettingScreen;
