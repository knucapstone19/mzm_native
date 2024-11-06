import { useEffect, useState } from "react";
import {
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import getUser from "../hooks/getUser";
import TopBar from "../components/TopBar";
import LocationIcon from "../../assets/images/icons/location.svg";
import UnlikedIcon from "../../assets/images/icons/unliked.svg";
import LikedIcon from "../../assets/images/icons/liked.svg";
import FullStarIcon from "../../assets/images/icons/full_star.svg";
import HalfStarIcon from "../../assets/images/icons/half_star.svg";
import EmptyStarIcon from "../../assets/images/icons/empty_star.svg";
import styles from "../styles/styles";

const NomnScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [store, setStore] = useState(null);
  const navigation = useNavigation();

  const [isLiked, setIsLiked] = useState(false);
  const [intCount, setIntCount] = useState(0);
  const [halfCount, setHalfCount] = useState(0);
  const [emptyCount, setEmptyCount] = useState(5);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = await AsyncStorage.getItem("@user_token");
      const data = await getUser(token);
      const location = [data?.user.school.lat, data?.user.school.lng];
      const randomPage = Math.floor(Math.random() * 3) + 1;
      const randomIdx = Math.floor(Math.random() * 15) + 1;
      try {
        const res = await fetch(
          `http://211.243.47.122:3005/store/search?latitude=${location[0]}&longitude=${location[1]}&page=${randomPage}`
        );
        const data = await res.json();
        setStore(data[randomIdx]);
        setIsLoading(false);
      } catch (e) {
        console.error(e.message);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      setIntCount(~~store.rating);
      setHalfCount(store.rating % 1 && 1);
      setEmptyCount(5 - intCount - halfCount);
      setImages(store.storeImage ?? new Array(4).fill(null));
      setIsLiked(store.liked);
    }
  }, [isLoading]);

  return (
    <View className="flex-1">
      <TopBar
        title="주변 추천 맛집"
        isBack={true}
        bgColor="white"
        handleBack={() => navigation.goBack()}
      />
      <View className="flex-1 px-8 py-24 bg-[#FAFAFA]">
        {!isLoading && (
          <ImageBackground
            source={images[0] ?? require("../../assets/images/null_store.png")}
            imageStyle={{ borderRadius: 20 }}
            className="flex-1 justify-end p-4"
          >
            <View className="flex-row justify-between items-center">
              <View className="flex-row items-center space-x-2">
                <LocationIcon />
                <Text
                  className={`mt-1 ${styles("bold-20-title")} text-[#111111]`}
                >
                  {store.placeName}
                </Text>
              </View>
              {/* TODO: 애니메이션 주기 */}
              <TouchableOpacity
                className="mt-0.5"
                onPress={() => setIsLiked((isLiked) => !isLiked)}
                activeOpacity={0.7}
              >
                {isLiked ? <LikedIcon /> : <UnlikedIcon />}
              </TouchableOpacity>
            </View>
            <View className="flex-row items-center ml-1 mt-1 space-x-1.5">
              <Text className={`${styles("number")} text-[#FF8800]`}>
                {Number.isInteger(store.rating)
                  ? store.rating.toFixed(1)
                  : store.rating}
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
              {store.addressName}
            </Text>
          </ImageBackground>
        )}
      </View>
    </View>
  );
};

export default NomnScreen;
