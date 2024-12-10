import { useEffect, useState } from "react";
import {
  Alert,
  BackHandler,
  FlatList,
  Modal,
  Platform,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import WebView from "react-native-webview";
import DeviceInfo from "react-native-device-info";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import getUser from "../hooks/getUser";
import TopBar from "../components/TopBar";
import LoginButton from "../components/LoginButton";
import SplashLogo from "../../assets/images/icons/splash_logo.svg";
import SocialData from "../json/socialData.json";

const SOCIAL_IMAGES = {
  "kakao.png": require("../../assets/images/social/kakao.png"),
  "naver.png": require("../../assets/images/social/naver.png"),
  "google.png": require("../../assets/images/social/google.png"),
};

const LoginScreen = () => {
  const [showWebview, setShowWebview] = useState(false);
  const [regId, setRegId] = useState("");
  const navigation = useNavigation();
  const socialData = SocialData.map((item) => ({
    ...item,
    src: SOCIAL_IMAGES[item.src],
  }));

  const handleExit = () => {
    if (Platform.OS === "ios") {
      Alert.alert("앱을 종료하려면 홈 버튼을 눌러주세요.", "");
    } else {
      BackHandler.exitApp();
    }
  };

  let isNavigating = false;
  const checkNavigate = async (token) => {
    const data = await getUser(token);
    try {
      const userId = data.attributes.userId.toString();
      await AsyncStorage.setItem("@user_id", userId);
    } catch (error) {
      console.error("AsyncStorage에 데이터 저장 실패:", error.message);
    }

    try {
      if (!data?.user.school && token) {
        navigation.navigate("Username");
      } else if (data?.user.school && token) {
        navigation.replace("Main");
      }
    } finally {
      isNavigating = false;
    }
  };

  const handleNavigate = async (navState) => {
    if (navState.url.startsWith("http://localhost:5173/auth?access-token=")) {
      if (isNavigating) return;
      isNavigating = true;

      const url = [...navState.url.split("?")];
      url.shift();
      const params = url[0].split("&");

      let token = null;
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

      checkNavigate(token);
      setShowWebview(false);
    }
  };

  useEffect(() => {
    const hasToken = async () => {
      const token = await AsyncStorage.getItem("@user_token");
      const id = await AsyncStorage.getItem("@reg_id");
      setRegId(id);

      if (token) {
        const { exp } = jwtDecode(token);
        const now = Math.floor(Date.now() / 1000);

        if (now < exp) {
          checkNavigate(token);
        } else {
          setShowWebview(true);
        }
      }
    };
    hasToken();
  }, []);

  return (
    <View className="flex-1 bg-white">
      <TopBar isBack={true} handleBack={handleExit} />
      <View className="items-center w-full space-y-[120px] px-6 pt-40">
        <SplashLogo />
        <View className="w-full space-y-3">
          <FlatList
            data={socialData}
            renderItem={({ item, index }) => (
              <LoginButton
                regId={item.regId}
                setRegId={setRegId}
                setShowWebview={setShowWebview}
                src={item.src}
                platform={item.platform}
                bgColor={item.bgColor}
                textColor={item?.textColor}
                borderColor={item?.borderColor}
              />
            )}
            keyExtractor={(_, idx) => idx.toString()}
            scrollEnabled={false}
            ItemSeparatorComponent={() => <View className="h-3" />}
          />
        </View>
      </View>

      <Modal
        visible={showWebview}
        onRequestClose={() => setShowWebview(false)}
        animationType="slide"
      >
        <View className="flex-1">
          <TopBar isBack={true} handleBack={() => setShowWebview(false)} />
          <WebView
            source={{
              uri: `http://58.234.90.197:3005/oauth2/authorization/${regId}`,
            }}
            onNavigationStateChange={handleNavigate}
            startInLoadingState={true}
            userAgent={DeviceInfo.getUserAgent() + "-kwdApp-"}
          />
        </View>
      </Modal>
    </View>
  );
};

export default LoginScreen;
