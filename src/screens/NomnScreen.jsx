import { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Swiper from "react-native-deck-swiper";
import getUser from "../hooks/getUser";
import getStore from "../hooks/getStore";
import CardItem from "../ui/CardItem";
import TopBar from "../components/TopBar";
import WarningIcon from "../../assets/images/icons/warning.svg";
import styles from "../styles/styles";

const NomnScreen = () => {
  const [storeArray, setStoreArray] = useState(null);
  const [isAllSwiped, setIsAllSwiped] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      const token = await AsyncStorage.getItem("@user_token");
      const userId = await AsyncStorage.getItem("@user_id");

      const data = await getUser(token);
      const location = [data?.user.school.lat, data?.user.school.lng];

      try {
        const response = await fetch(
          `http://58.234.90.197:3005/recommend?latitude=${location[0]}&longitude=${location[1]}`,
          {
            method: "GET",
            headers: {
              "X-User-ID": userId.toString(),
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setStoreArray(data);
        return data;
      } catch (error) {
        console.error("API 호출 에러:", error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <View className="flex-1">
      <TopBar
        title="주변 추천 맛집"
        isBack={true}
        bgColor="white"
        handleBack={() => navigation.goBack()}
      />
      <View className="flex-1 bg-[#FAFAFA]">
        {storeArray ? (
          !isAllSwiped ? (
            <Swiper
              cards={storeArray}
              renderCard={(item) => {
                return (
                  <CardItem
                    storeId={item?.storeId}
                    storeName={item?.placeName}
                    rating={item?.rating}
                    reviewCount={item?.reviewCount}
                    category={item?.categoryName}
                    address={item?.addressName}
                    storeImage={item?.storeImage}
                  />
                );
              }}
              cardStyle={{ height: "80%" }}
              backgroundColor={"#FAFAFA"}
              onSwipedAll={() => setIsAllSwiped(true)}
              cardIndex={0}
              stackSize={10}
            />
          ) : (
            <View className="flex-1 justify-center items-center space-y-2">
              <WarningIcon />
              <Text className={`${styles("main")} text-[#111111]`}>
                더 이상의 추천 카드가 없습니다.
              </Text>
            </View>
          )
        ) : (
          <View className="flex-1 justify-center">
            <ActivityIndicator size="large" color="#FF8800" />
          </View>
        )}
      </View>
    </View>
  );
};

export default NomnScreen;
