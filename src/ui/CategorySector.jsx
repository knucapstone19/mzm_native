import { useEffect, useState } from "react";
import { View, Text, FlatList, Dimensions } from "react-native";
import CategoryItem from "../components/CategoryItem";
import CategoryData from "../json/categoryData.json";
import styles from "../styles/styles";

const CATEGORY_IMAGES = {
  "k-food.png": require("../../assets/images/category/k-food.png"),
  "j-food.png": require("../../assets/images/category/j-food.png"),
  "c-food.png": require("../../assets/images/category/c-food.png"),
  "s-food.png": require("../../assets/images/category/s-food.png"),
  "chicken.png": require("../../assets/images/category/chicken.png"),
  "hamburger.png": require("../../assets/images/category/hamburger.png"),
  "pizza.png": require("../../assets/images/category/pizza.png"),
  "dessert.png": require("../../assets/images/category/dessert.png"),
};

const CategorySector = () => {
  const [categoryCols, setcategoryCols] = useState(5);
  const categoryWidth = Dimensions.get("window").width - 80 - 64;
  const categoryData = CategoryData.map((item) => ({
    ...item,
    src: CATEGORY_IMAGES[item.src],
  }));

  useEffect(() => {
    setcategoryCols(Math.floor(categoryWidth / 48));
  }, []);

  return (
    <View
      style={{
        elevation: 1,
        borderRadius: 10,
      }}
      className="mt-4 mb-2"
    >
      <View className="bg-white flex flex-col items-stretch pt-[14px] pb-4 px-4 rounded-[10px]">
        <Text className={`mb-2 ${styles("main")} text-[#111111]`}>
          메뉴 별 카테고리
        </Text>
        {categoryCols === 5 ? (
          <FlatList
            key={"_"}
            data={categoryData}
            renderItem={({ item, index }) => (
              <CategoryItem
                src={item.src}
                text={item.text}
                isSmall={item.isSmall}
                idx={index}
              />
            )}
            keyExtractor={(_, idx) => idx.toString()}
            numColumns={5}
            scrollEnabled={false}
            ItemSeparatorComponent={() => <View className="h-3" />}
          />
        ) : (
          <FlatList
            key={"#"}
            className="self-center"
            data={categoryData}
            renderItem={({ item, index }) => (
              <CategoryItem
                src={item.src}
                text={item.text}
                isSmall={item.isSmall}
                idx={index}
                margin={2.5}
              />
            )}
            keyExtractor={(_, idx) => idx.toString()}
            numColumns={4}
            scrollEnabled={false}
            ItemSeparatorComponent={() => <View className="w-4 h-3" />}
          />
        )}
      </View>
    </View>
  );
};

export default CategorySector;
