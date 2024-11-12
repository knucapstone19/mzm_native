import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import getUser from "../hooks/getUser";
import getCategoryStore from "../hooks/getCategoryStore";
import TopBar from "../components/TopBar";
import CategoryItem from "../components/CategoryItem";
import StoreItem from "../components/StoreItem";
import WarningIcon from "../../assets/images/icons/warning.svg";
import CategoryData from "../json/categoryData.json";
import styles from "../styles/styles";

const CATEGORY_IMAGES = {
  "k-food.png": require("../../assets/images/category/k-food.png"),
  "j-food.png": require("../../assets/images/category/j-food.png"),
  "c-food.png": require("../../assets/images/category/c-food.png"),
  "s-food.png": require("../../assets/images/category/s-food.png"),
  "w-food.png": require("../../assets/images/category/w-food.png"),
  "chicken.png": require("../../assets/images/category/chicken.png"),
  "fast-food.png": require("../../assets/images/category/fast-food.png"),
  "etc.png": require("../../assets/images/category/etc.png"),
};

const CategoryScreen = ({ route }) => {
  const { idx, category } = route.params;
  const [categoryName, setCategoryName] = useState(category);
  const [storeArray, setStoreArray] = useState(null);
  const scrollRef = useRef(null);
  const navigation = useNavigation();

  const categoryData = CategoryData.map((item) => ({
    ...item,
    src: CATEGORY_IMAGES[item.src],
  }));

  const handleScroll = (idx) => {
    if (categoryData.length > idx) {
      scrollRef.current.scrollToIndex({
        index: idx,
        animated: true,
      });
    }
  };

  useEffect(() => {
    handleScroll(idx);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setStoreArray(null);
      const token = await AsyncStorage.getItem("@user_token");
      const userData = await getUser(token);
      const location = [userData?.user.school.lat, userData?.user.school.lng];

      let storeData = [];
      for (let page = 1; page <= 3; page++) {
        const pageData = await getCategoryStore(location, category, page);
        storeData = [...storeData, ...pageData];
      }
      setStoreArray(storeData);
    };
    fetchData();
  }, [categoryName]);

  return (
    <View className="flex-1">
      <TopBar
        title="카테고리 별 메뉴"
        isBack={true}
        bgColor="white"
        handleBack={() => navigation.goBack()}
      />
      <View>
        <FlatList
          ref={scrollRef}
          data={categoryData}
          className="mb-0.5 py-2 bg-white"
          renderItem={({ item, index }) => (
            <CategoryItem
              idx={index}
              src={item.src}
              text={item.text}
              isSmall={item.isSmall}
              isSelected={categoryName}
              setIsSelected={setCategoryName}
              margin={2.5}
              handleScroll={handleScroll}
            />
          )}
          keyExtractor={(_, idx) => idx.toString()}
          getItemLayout={(_, index) => ({
            length: 68,
            offset: 68 * index,
            index,
          })}
          horizontal={true}
          overScrollMode="never"
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <View className="w-1" />}
        />
      </View>
      {storeArray ? (
        storeArray?.length ? (
          <FlatList
            data={storeArray}
            renderItem={({ item, index }) => (
              <StoreItem
                storeId={item.storeId}
                storeName={item.placeName}
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
    </View>
  );
};

export default CategoryScreen;
