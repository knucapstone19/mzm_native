// @format
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import NicknameForm from "./screens/NicknameForm";
import SchoolForm from "./screens/SchoolForm";
import TabBar from "./ui/TabBar";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <SafeAreaView className="flex-1">
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Nickname" component={NicknameForm} />
          <Stack.Screen name="School" component={SchoolForm} />
          <Stack.Screen name="Main" component={TabBar} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;
