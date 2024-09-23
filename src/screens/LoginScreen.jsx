import { useState } from "react";
import {
  View,
  FlatList,
  Platform,
  Alert,
  BackHandler,
  Modal,
} from "react-native";
import TopBar from "../components/TopBar";
import LoginButton from "../components/LoginButton";
import SplashLogo from "../../assets/images/icons/splash_logo.svg";
import SocialData from "../json/socialData.json";
import WebView from "react-native-webview";

const SOCIAL_IMAGES = {
  "kakao.png": require("../../assets/images/social/kakao.png"),
  "naver.png": require("../../assets/images/social/naver.png"),
  "google.png": require("../../assets/images/social/google.png"),
};

const LoginScreen = () => {
  const [showWebView, setShowWebView] = useState(false);
  const [registrationId, setRegistrationId] = useState("");

  const socialData = SocialData.map((item) => ({
    ...item,
    src: SOCIAL_IMAGES[item.src],
  }));

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
        onRequestClose={() => setShowWebView(false)} // WebView 닫기
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
            onNavigationStateChange={(navState) => {
              console.log(navState.url);

              if (
                navState.url.includes(
                  `http://211.243.47.122:3005/oauth2/code/${registrationId}`
                )
              ) {
                setShowWebView(false);
              }
            }}
            startInLoadingState={true}
          />
        </View>
      </Modal>
    </View>
  );
};

export default LoginScreen;
