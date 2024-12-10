import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TopBar from "../components/TopBar";
import ReviewItem from "../components/ReviewItem";
import WarningIcon from "../../assets/images/icons/warning.svg";
import styles from "../styles/styles";

const WrittenReviewScreen = () => {
  const [reviewArray, setReviewArray] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem("@user_token");
        const res = await fetch(`http://58.234.90.197:3005/profiles/review`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setReviewArray(data);
      } catch (e) {
        console.error(e.message);
      }
    };
    fetchData();
  }, []);

  return (
    <View className="flex-1">
      <TopBar
        title="작성한 리뷰"
        isBack={true}
        bgColor="white"
        handleBack={() => navigation.goBack()}
      />
      {reviewArray ? (
        reviewArray?.length ? (
          <FlatList
            data={reviewArray}
            renderItem={({ item, index }) => (
              <ReviewItem
                content={item.content}
                createdAt={item.createdAt}
                rates={item.rates}
                storeId={item.storeId}
                userId={item.userId}
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

export default WrittenReviewScreen;
