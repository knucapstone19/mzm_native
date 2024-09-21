// @format
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import TabBar from "./ui/TabBar";
import LoginScreen from "./screens/LoginScreen";

//TODO: 그리고 사용되는 이미지 마다 디렉토리 체계화해서 관리 필요
function App(): React.JSX.Element {
  return (
    <SafeAreaView className="flex-1">
      {/* <NavigationContainer>
        <TabBar />
      </NavigationContainer> */}
      <LoginScreen />
    </SafeAreaView>
  );
}

export default App;
