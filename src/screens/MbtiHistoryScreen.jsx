import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MbtiItem from "../ui/MbtiItem";
import TopBar from "../components/TopBar";
import WarningIcon from "../../assets/images/icons/warning.svg";
import styles from "../styles/styles";

const MbtiHistoryScreen = () => {
  const [result, setResult] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem("@user_token");
        const res = await fetch("http://58.234.90.197:3005/mbti/history", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setResult(data.content);
      } catch (e) {
        console.error(e.message);
      }
    };
    fetchData();
  }, []);

  return (
    <View className="flex-1">
      <TopBar
        title="음식 Mbti 기록"
        isBack={true}
        bgColor="white"
        handleBack={() => navigation.goBack()}
      />
      {result ? (
        result?.length ? (
          <FlatList
            data={result}
            renderItem={({ item, index }) => (
              <MbtiItem
                title={item.title}
                createdAt={item.createdAt}
                description={item.description}
              />
            )}
            keyExtractor={(_, index) => index.toString()}
            initialNumToRender={10}
            maxToRenderPerBatch={10}
            overScrollMode="never"
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <View className="h-1" />}
          />
        ) : (
          <View className="flex-1 justify-center items-center space-y-2">
            <WarningIcon />
            <Text className={`${styles("main")} text-[#111111]`}>
              작성한 리뷰가 없어요 ㅠㅠ
            </Text>
          </View>
        )
      ) : (
        <View className="flex-1 justify-center">
          <ActivityIndicator size="large" color="#FF8800" />
        </View>
      )}
    </View>
  );
};

export default MbtiHistoryScreen;
