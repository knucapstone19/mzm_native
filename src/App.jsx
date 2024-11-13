// @format
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import UsernameForm from "./screens/UsernameForm";
import SchoolForm from "./screens/SchoolForm";
import TabBar from "./ui/TabBar";
import SettingScreen from "./screens/SettingScreen";
import CategoryScreen from "./screens/CategoryScreen";
import NomnScreen from "./screens/NomnScreen";
import ListUpScreen from "./screens/ListUpScreen";
import MbtiTestScreen from "./screens/MbtiTestScreen";
import MbtiResScreen from "./screens/MbtiResScreen";
import LooklikeScreen from "./screens/LooklikeScreen";
import LooklikeResScreen from "./screens/LooklikeResScreen";
import StoreDetailScreen from "./screens/StoreDetailScreen";
import ReviewScreen from "./screens/ReviewScreen";
import ProfileModScreen from "./screens/ProfileModScreen";
import LikedStoreScreen from "./screens/LikedStoreScreen";
import WrittenReviewScreen from "./screens/WrittenReviewScreen";
import MbtiHistoryScreen from "./screens/MbtiHistoryScreen";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <SafeAreaView className="flex-1">
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Username" component={UsernameForm} />
          <Stack.Screen name="School" component={SchoolForm} />
          <Stack.Screen name="Main" component={TabBar} />
          <Stack.Screen name="Setting" component={SettingScreen} />
          <Stack.Screen name="Category" component={CategoryScreen} />
          <Stack.Screen name="Nomn" component={NomnScreen} />
          <Stack.Screen name="ListUp" component={ListUpScreen} />
          <Stack.Screen name="MbtiTest" component={MbtiTestScreen} />
          <Stack.Screen name="MbtiRes" component={MbtiResScreen} />
          <Stack.Screen name="Looklike" component={LooklikeScreen} />
          <Stack.Screen name="LooklikeRes" component={LooklikeResScreen} />
          <Stack.Screen name="StoreDetail" component={StoreDetailScreen} />
          <Stack.Screen name="Review" component={ReviewScreen} />
          <Stack.Screen name="ProfileMod" component={ProfileModScreen} />
          <Stack.Screen name="LikedStore" component={LikedStoreScreen} />
          <Stack.Screen name="WrittenReview" component={WrittenReviewScreen} />
          <Stack.Screen name="MbtiHistory" component={MbtiHistoryScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;
