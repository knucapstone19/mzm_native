import { useEffect, useState } from "react";
import {
  View,
  FlatList,
  Platform,
  Alert,
  BackHandler,
  Modal,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import WebView from "react-native-webview";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import TopBar from "../components/TopBar";
import LoginButton from "../components/LoginButton";
import SplashLogo from "../../assets/images/icons/splash_logo.svg";
import SocialData from "../json/socialData.json";

const SOCIAL_IMAGES = {
  "kakao.png": require("../../assets/images/social/kakao.png"),
  "naver.png": require("../../assets/images/social/naver.png"),
  "google.png": require("../../assets/images/social/google.png"),
};

// TODO: 모달 컴포넌트 분리 및 함수 정리 필요
const LoginScreen = () => {
  const [showWebView, setShowWebView] = useState(false);
  const [registrationId, setRegistrationId] = useState("");
  const navigation = useNavigation();

  const socialData = SocialData.map((item) => ({
    ...item,
    src: SOCIAL_IMAGES[item.src],
  }));

  let isNavigating = false;
  const checkNavigation = async (token) => {
    let data = null;
    if (token) {
      try {
        const res = await fetch("http://211.243.47.122:3005/user", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        data = await res.json();
      } catch (e) {
        console.error(e.message);
      }
    }

    try {
      if (!data?.user.school && token) {
        navigation.navigate("Nickname");
      } else if (data?.user.school && token) {
        navigation.replace("Main");
      }
    } finally {
      isNavigating = false;
    }
  };

  const handleNavigation = async (navState) => {
    if (navState.url.startsWith("http://localhost:5173/auth?access-token=")) {
      if (isNavigating) return;
      isNavigating = true;

      const url = [...navState.url.split("?")];
      url.shift();

      let token = null;
      const params = url[0].split("&");
      for (let param of params) {
        if (param.startsWith("access-token")) {
          try {
            token = param.split("=")[1];
            await AsyncStorage.setItem("@user_token", param.split("=")[1]);
          } catch (e) {
            console.error("토큰 저장에 실패하였습니다.");
          }
        }
      }

      checkNavigation(token);
      setShowWebView(false);
    }
  };

  useEffect(() => {
    const hasToken = async () => {
      const token = await AsyncStorage.getItem("@user_token");
      const id = await AsyncStorage.getItem("@registration_id");

      setRegistrationId(id);

      if (token) {
        const { exp } = jwtDecode(token);
        const now = Math.floor(Date.now() / 1000);

        if (now < exp) {
          checkNavigation(token);
        } else {
          setShowWebView(true);
        }
      }
    };
    hasToken();
  }, []);

  return (
    <View className="bg-white flex-1">
      <TopBar
        isBack={true}
        onPress={() => {
          if (Platform.OS === "ios") {
            Alert.alert("앱을 종료하려면 홈 버튼을 눌러주세요.", "");
          } else {
            BackHandler.exitApp();
          }
        }}
      />
      <View className="items-center w-full px-6 pt-40 space-y-[120px]">
        <SplashLogo />
        <View className="w-full space-y-3">
          <FlatList
            data={socialData}
            renderItem={({ item, index }) => (
              <LoginButton
                color={item.color}
                textColor={item?.textColor}
                borderColor={item?.borderColor}
                src={item.src}
                enterprise={item.enterprise}
                registrationId={item.registrationId}
                setShowWebView={setShowWebView}
                setRegistrationId={setRegistrationId}
              />
            )}
            keyExtractor={(_, idx) => idx.toString()}
            scrollEnabled={false}
            ItemSeparatorComponent={() => <View className="h-3" />}
          />
        </View>
      </View>

      <Modal
        visible={showWebView}
        onRequestClose={() => setShowWebView(false)}
        animationType="slide"
      >
        <View className="flex-1">
          <TopBar
            isBack={true}
            onPress={() => {
              setShowWebView(false);
            }}
          />
          <WebView
            source={{
              uri: `http://211.243.47.122:3005/oauth2/authorization/${registrationId}`,
            }}
            onNavigationStateChange={handleNavigation}
            startInLoadingState={true}
          />
        </View>
      </Modal>
    </View>
  );
};

export default LoginScreen;
