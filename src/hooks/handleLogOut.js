import { Alert, BackHandler, Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const handleLogOut = async (setIsLoggedOut) => {
  await AsyncStorage.removeItem("@user_token");
  await AsyncStorage.removeItem("@user_name");
  setIsLoggedOut(true);

  if (Platform.OS === "ios") {
    Alert.alert("앱을 종료하려면 홈 버튼을 눌러주세요.", "");
  } else {
    BackHandler.exitApp();
  }
};

export default handleLogOut;
