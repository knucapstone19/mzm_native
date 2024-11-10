import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import getUser from "../hooks/getUser";
import getStore from "../hooks/getStore";
import TopBar from "../components/TopBar";
import StoreItem from "../components/StoreItem";
import FilterIcon from "../../assets/images/icons/filter.svg";
import styles from "../styles/styles";
import FilterBottomSheet from "../ui/FilterBottomSheet";

const ListUpScreen = () => {
  const [school, setSchool] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("인기순");
  const [storeArray, setStoreArray] = useState(null);
  const modalizeRef = useRef(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      const token = await AsyncStorage.getItem("@user_token");
      const userData = await getUser(token);
      setSchool(userData.user.school.schoolName);

      const location = [userData.user.school.lat, userData.user.school.lng];

      let storeData = [];
      for (let page = 1; page <= 3; page++) {
        const pageData = await getStore(location, page);
        storeData = [...storeData, ...pageData];
      }

      if (selectedFilter === "인기순") {
        storeData.sort((a, b) => b.reviewCount - a.reviewCount);
      } else if (selectedFilter === "평점순") {
        storeData.sort((a, b) => b.rating - a.rating);
      } else {
        storeData.sort((a, b) => a.distance - b.distance);
      }
      setStoreArray(storeData);
    };
    fetchData();
  }, [selectedFilter]);

  return (
    <GestureHandlerRootView className="flex-1">
      <TopBar
        title="맛집 리스트업"
        isBack={true}
        bgColor="white"
        handleBack={() => navigation.goBack()}
      />
      <View className="flex-row justify-between items-center mb-0.5 px-4 py-[14px] bg-white">
        <View className="flex-row items-center space-x-3">
          <Text className={`${styles("16-text")} text-[#111111]`}>
            {school}
          </Text>
          <Text className={`${styles("14-text")} text-[#383838]`}>
            반경 20km
          </Text>
        </View>
        <TouchableOpacity
          className="flex-row items-center space-x-2 px-3 py-2 border-[1px] border-[#D3D3D3] rounded-lg"
          onPress={() => modalizeRef?.current.open()}
          activeOpacity={0.7}
        >
          <Text className={`${styles("16-text")} text-[#383838]`}>
            {selectedFilter}
          </Text>
          <FilterIcon />
        </TouchableOpacity>
      </View>
      {storeArray ? (
        storeArray?.length ? (
          <FlatList
            data={storeArray}
            renderItem={({ item, index }) => (
              <StoreItem
                storeName={item.placeName}
                liked={item.liked}
                rating={item.rating}
                reviewCount={item.reviewCount}
                category={item.categoryName}
                address={item.addressName}
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
              조건에 맞는 식당이 없어요 ㅠㅠ
            </Text>
          </View>
        )
      ) : (
        <View className="flex-1 justify-center">
          <ActivityIndicator size="large" color="#FF8800" />
        </View>
      )}

      <FilterBottomSheet
        ref={modalizeRef}
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
      />
    </GestureHandlerRootView>
  );
};

export default ListUpScreen;
