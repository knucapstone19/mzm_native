import { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Platform,
  Alert,
  BackHandler,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProfileSector from "../ui/ProfileSector";
import TopBar from "../components/TopBar";
import HistCardButton from "../components/HistCardButton";
import CardData from "../json/cardData.json";
import styles from "../styles/styles";

const ProfileScreen = () => {
  const isFirstRef = useRef(true);
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const navigation = useNavigation();

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
        className="px-6 mb-[50px]"
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
          className="bg-[#FF8800] mt-10 mb-4 py-[11px] rounded-[10px]"
          activeOpacity={0.7}
          onPress={async () => {
            await AsyncStorage.removeItem("@user_token");
            setIsLoggedOut(true);

            if (Platform.OS === "ios") {
              Alert.alert("앱을 종료하려면 홈 버튼을 눌러주세요.", "");
            } else {
              BackHandler.exitApp();
            }
          }}
        >
          <Text className={`${styles("16-title")} text-center text-white`}>
            로그아웃
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;
