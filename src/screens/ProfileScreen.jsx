import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import ProfileSector from "../ui/ProfileSector";
import TopBar from "../components/TopBar";
import HistCardButton from "../components/HistCardButton";
import CardData from "../json/cardData.json";
import styles from "../styles/styles";

const ProfileScreen = () => {
  return (
    <View>
      <TopBar title="마이프로필" />
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

        <TouchableOpacity className="bg-[#FF8800] mt-10 mb-4 py-[11px] rounded-[10px]">
          <Text className={`${styles("16-title")} text-center text-white`}>
            로그아웃
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;
