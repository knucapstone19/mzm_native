import { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import getStoreDetail from "../hooks/getStoreDetail";
import getLiked from "../hooks/getLiked";
import postLiked from "../hooks/postLiked";
import deleteLiked from "../hooks/deleteLiked";
import TabButton from "../ui/TabButton";
import TopBar from "../components/TopBar";
import ReviewSummary from "../components/ReviewSummary";
import LocationIcon from "../../assets/images/icons/location.svg";
import FullStarIcon from "../../assets/images/icons/full_star.svg";
import HalfStarIcon from "../../assets/images/icons/half_star.svg";
import EmptyStarIcon from "../../assets/images/icons/empty_star.svg";
import styles from "../styles/styles";

const StoreDetailScreen = ({ route }) => {
  const { storeId } = route.params;
  const [store, setStore] = useState(null);
  const [intCount, setIntCount] = useState(0);
  const [halfCount, setHalfCount] = useState(0);
  const [emptyCount, setEmptyCount] = useState(5);
  const [images, setImages] = useState(null);
  const [isLiked, setIsLiked] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  const handleToggle = () => {
    setIsLoading(false);
    setIsLiked((isLiked) => !isLiked);
  };

  useEffect(() => {
    const fetchData = async () => {
      const storeData = await getStoreDetail(storeId);
      const likedData = await getLiked(storeId);
      // console.log(storeData);
      setStore(storeData);
      setIsLiked(likedData);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (store) {
      setIntCount(~~store.rates);
      setHalfCount(store.rates % 1 && 1);
      setEmptyCount(5 - intCount - halfCount);
      setImages(store.storeImage ?? new Array(4).fill(null));
    }
  }, [store]);

  useEffect(() => {
    const patchLiked = async () => {
      if (isLiked && !isLoading) await postLiked(storeId);
      else if (isLiked === false && !isLoading) await deleteLiked(storeId);
    };
    patchLiked();
  }, [isLiked, isLoading]);

  return (
    <View className="flex-1">
      <TopBar
        isBack={true}
        bgColor="white"
        handleBack={() => navigation.goBack()}
      />
      <ScrollView
        vertical={true}
        overScrollMode="never"
        showsVerticalScrollIndicator={false}
      >
        {store && images && (
          <View className="flex-1">
            <Image
              source={
                store?.storeImage ??
                require("../../assets/images/null_store.png")
              }
              className="w-screen h-48"
            />
            <View className="px-4 py-[14px] bg-white">
              <View className="flex-row items-center space-x-2">
                <LocationIcon />
                <Text
                  className={`mt-1 ${styles("bold-20-title")} text-[#111111]`}
                >
                  {store.placeName}
                </Text>
              </View>
              <View className="flex-row items-center ml-1 mt-1 space-x-1.5">
                <Text className={`${styles("number")} text-[#FF8800]`}>
                  {Number.isInteger(store.rates)
                    ? store.rates.toFixed(1)
                    : store.rates}
                </Text>
                <View className="flex-row space-x-0.5">
                  {Array.from({ length: intCount }, (_, idx) => (
                    <FullStarIcon key={idx.toString()} />
                  ))}
                  {Array.from({ length: halfCount }, (_, idx) => (
                    <HalfStarIcon key={idx.toString()} />
                  ))}
                  {Array.from({ length: emptyCount }, (_, idx) => (
                    <EmptyStarIcon key={idx.toString()} />
                  ))}
                </View>
                <Text className={`${styles("number")} text-[#A9A9A9]`}>
                  ({store.reviewCount}건)
                </Text>
              </View>
              <View className="self-start mt-1.5 px-[9px] py-1 rounded-full border-[#FF8800] border-[1px]">
                <Text className={`${styles("12-text")} text-[#383838]`}>
                  {store.categoryName}
                </Text>
              </View>
              <Text className={`mt-3 ${styles("12-text")} text-[#383838]`}>
                {store.roadAddressName}
              </Text>
              <View>
                <ScrollView
                  horizontal={true}
                  overScrollMode="never"
                  showsHorizontalScrollIndicator={false}
                  className="mt-4 space-x-2"
                >
                  {images.map((item, idx) => (
                    <Image
                      key={idx.toString()}
                      source={
                        item ?? require("../../assets/images/null_store.png")
                      }
                      className={`w-24 h-24 ${
                        idx === 0
                          ? "rounded-l-xl"
                          : idx === images.length - 1 && "rounded-r-xl"
                      }`}
                    />
                  ))}
                </ScrollView>
              </View>
            </View>
            <TabButton
              phoneNumber={store.phoneNumber}
              isLiked={isLiked}
              storeName={store.placeName}
              handleToggle={handleToggle}
            />
            <View className="px-4 py-[14px] bg-white">
              <Text className={`${styles("bold-20-title")} text-[#111111]`}>
                식당 리뷰하기
              </Text>
              <Text className={`mt-1 ${styles("12-text")} text-[#383838]`}>
                다른 사람들에게 의견을 알려주세요
              </Text>
              <TouchableOpacity
                className="flex-row justify-around mt-4 mb-10 py-2"
                onPress={() => navigation.navigate("Review", { storeId })}
                activeOpacity={0.8}
              >
                {Array.from({ length: 5 }, (_, idx) => (
                  <EmptyStarIcon key={idx.toString()} width={32} height={32} />
                ))}
              </TouchableOpacity>
              <Text className={`${styles("bold-20-title")} text-[#111111]`}>
                식당 리뷰 요약
              </Text>
              <Text className={`mt-1 ${styles("12-text")} text-[#383838]`}>
                AI로 요약된 리뷰이므로 부정확한 정보가 있을 수 있는 점 양해
                부탁드립니다.
              </Text>
              <View className="mt-2">
                <ReviewSummary
                  src={require("../../assets/images/3d/thumb-up.png")}
                  title="긍정 리뷰 요약"
                  content="가격도 저렴한데 양도 많고 맛도 최고인 분식집이에요!"
                />
                <ReviewSummary
                  src={require("../../assets/images/3d/thumb-down.png")}
                  title="부정 리뷰 요약"
                  content="분위기가 너무 시끄럽고 테이블이 좁아서 불편했어요."
                />
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default StoreDetailScreen;
