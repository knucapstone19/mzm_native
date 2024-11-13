import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FullStarIcon from "../../assets/images/icons/full_star.svg";
import HalfStarIcon from "../../assets/images/icons/half_star.svg";
import EmptyStarIcon from "../../assets/images/icons/empty_star.svg";
import styles from "../styles/styles";

const ReviewItem = ({ content, createdAt, rates, storeId, userId }) => {
  const [store, setStore] = useState(null);
  const [date, setDate] = useState(null);
  const navigation = useNavigation();
  const pastDate = new Date(createdAt);
  const currentDate = new Date();

  let result = "";
  const calcDate = () => {
    const diffInMs = currentDate - pastDate;

    const diffInYears = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 365));
    const diffInMonths = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 30));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInSeconds = Math.floor(diffInMs / 1000);

    if (diffInYears > 0) {
      result = `${diffInYears}년`;
    } else if (diffInMonths > 0) {
      result = `${diffInMonths}개월`;
    } else if (diffInDays > 0) {
      result = `${diffInDays}일`;
    } else if (diffInHours > 0) {
      result = `${diffInHours}시간`;
    } else if (diffInMinutes > 0) {
      result = `${diffInMinutes}분`;
    } else {
      result = `${diffInSeconds}초`;
    }
    setDate(result);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem("@user_token");
        const res = await fetch(`http://211.243.47.122:3005/store/${storeId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setStore(data);
      } catch (e) {
        console.error(e.message);
      }
    };
    calcDate();
    fetchData();
  }, []);

  return (
    <TouchableOpacity
      className="px-4 pt-[14px] pb-4 bg-white"
      onPress={() => navigation.navigate("StoreDetail", { storeId })}
      activeOpacity={0.8}
    >
      <Text className={`mt-1 ${styles("16-text")} text-[#111111]`}>
        {store?.placeName}
      </Text>
      <View className="flex-row items-center mt-0.5 space-x-1.5">
        <Text className={`${styles("number")} text-[#FF8800]`}>
          {Number.isInteger(rates) ? rates.toFixed(1) : rates}
        </Text>
        <View className="flex-row space-x-0.5">
          {Array.from({ length: ~~rates }, (_, idx) => (
            <FullStarIcon key={idx.toString()} />
          ))}
          {Array.from({ length: rates % 1 && 1 }, (_, idx) => (
            <HalfStarIcon key={idx.toString()} />
          ))}
          {Array.from({ length: 5 - ~~rates - (rates % 1 && 1) }, (_, idx) => (
            <EmptyStarIcon key={idx.toString()} />
          ))}
        </View>
        <Text className={`ml-1 ${styles("12-text")} text-[#A9A9A9]`}>
          {date} 전
        </Text>
      </View>
      <Text className={`mt-4 ${styles("14-text")} text-[#383838]`}>
        {content}
      </Text>
    </TouchableOpacity>
  );
};

export default ReviewItem;
