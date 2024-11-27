import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import getLikedStore from "../hooks/getLikedStore";
import TopBar from "../components/TopBar";
import StoreItem from "../components/StoreItem";
import WarningIcon from "../../assets/images/icons/warning.svg";
import styles from "../styles/styles";

const LikedStoreScreen = () => {
  const [storeArray, setStoreArray] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      await getLikedStore(setStoreArray);
    };
    fetchData();
  }, []);

  return (
    <View className="flex-1">
      <TopBar
        title="찜한 식당"
        isBack={true}
        bgColor="white"
        handleBack={() => navigation.goBack()}
      />
      {storeArray ? (
        storeArray?.length ? (
          <FlatList
            data={storeArray}
            renderItem={({ item, index }) => (
              <StoreItem
                storeId={item.storeId}
                storeName={item.placeName}
                rating={item.rates}
                reviewCount={item.reviewCount}
                category={item.categoryName}
                address={item.roadAddressName}
                storeImage={item.storeImage}
              />
            )}
            keyExtractor={(item) => item.storeId.toString()}
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
              찜한 식당이 없어요 ㅠㅠ
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

export default LikedStoreScreen;
