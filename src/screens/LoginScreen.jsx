import { View, FlatList } from "react-native";
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
  const socialData = SocialData.map((item) => ({
    ...item,
    src: SOCIAL_IMAGES[item.src],
  }));

  return (
    <View className="bg-white flex-1">
      <TopBar isBack={true} />
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
              />
            )}
            keyExtractor={(_, idx) => idx.toString()}
            scrollEnabled={false}
            ItemSeparatorComponent={() => <View className="h-3" />}
          />
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;
