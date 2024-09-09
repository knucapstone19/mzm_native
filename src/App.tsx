// @format
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import TabBar from "./ui/TabBar";

//TODO: 그리고 사용되는 이미지 마다 디렉토리 체계화해서 관리 필요
//FIXME: 상단 톱바 각 페이지 별로 다르게 해야 함
//FIXME: png 이미지 피그마에서 해상도 높게해서 다시 export!
function App(): React.JSX.Element {
  return (
    <SafeAreaView className="flex-1">
      <NavigationContainer>
        <TabBar />
      </NavigationContainer>
    </SafeAreaView>
  );
}

export default App;
