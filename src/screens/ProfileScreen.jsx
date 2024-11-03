import { useEffect, useRef, useState } from "react";
import {
  Alert,
  BackHandler,
  FlatList,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProfileSector from "../ui/ProfileSector";
import TopBar from "../components/TopBar";
import HistCardButton from "../components/HistCardButton";
import CardData from "../json/cardData.json";
import styles from "../styles/styles";

const ProfileScreen = () => {
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const isFirstRef = useRef(true);
  const navigation = useNavigation();

  const handleLogOut = async () => {
    await AsyncStorage.removeItem("@user_token");
    setIsLoggedOut(true);

    if (Platform.OS === "ios") {
      Alert.alert("앱을 종료하려면 홈 버튼을 눌러주세요.", "");
    } else {
      BackHandler.exitApp();
    }
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
      <TopBar title="마이프로필" bgColor="white" />
      <ScrollView
        className="mb-[50px] px-6"
        overScrollMode="never"
        showsVerticalScrollIndicator={false}
      >
        <ProfileSector />
        <FlatList
          data={CardData}
          renderItem={({ item, index }) => (
            <HistCardButton title={item.title} text={item.text} />
          )}
          keyExtractor={(_, idx) => idx.toString()}
          scrollEnabled={false}
          ItemSeparatorComponent={() => <View className="h-4" />}
        />
        <TouchableOpacity
          className="mt-10 mb-4 py-[11px] rounded-[10px] bg-[#FF8800]"
          onPress={handleLogOut}
          activeOpacity={0.7}
        >
          <Text className={`${styles("16-title")} text-white text-center`}>
            로그아웃
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;
