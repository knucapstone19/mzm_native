import { useEffect, useRef, useState } from "react";
import { FlatList, ScrollView, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ProfileSector from "../ui/ProfileSector";
import TopBar from "../components/TopBar";
import HistCardButton from "../components/HistCardButton";
import NavButton from "../components/NavButton";
import handleLogOut from "../hooks/handleLogOut";
import CardData from "../json/cardData.json";

const ProfileScreen = () => {
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const isFirstRef = useRef(true);
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
        className="mb-[50px] px-6"
        overScrollMode="never"
        showsVerticalScrollIndicator={false}
      >
        <ProfileSector />
        <FlatList
          data={CardData}
          className="mb-10"
          renderItem={({ item, index }) => (
            <HistCardButton title={item.title} text={item.text} />
          )}
          keyExtractor={(_, idx) => idx.toString()}
          scrollEnabled={false}
          ItemSeparatorComponent={() => <View className="h-4" />}
        />
        <NavButton
          text="로그아웃"
          marginBottm={6}
          handleNavigate={() => handleLogOut(setIsLoggedOut)}
        />
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;
