import { Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import TopBar from "../components/TopBar";
import FullStarIcon from "../../assets/images/icons/full_star.svg";
import EmptyStarIcon from "../../assets/images/icons/empty_star.svg";
import styles from "../styles/styles";
import { useEffect, useState } from "react";

const ReviewScreen = ({ route }) => {
  const { storeId } = route.params;
  const [rating, setRating] = useState(Array.from({ length: 5 }, () => false));
  const navigation = useNavigation();

  useEffect(() => {
    console.log(rating.filter((v) => v).length);
    console.log(rating.filter((v) => !v).length);
  }, [rating]);

  return (
    <View className="flex-1 bg-[#FAFAFA]">
      <TopBar isBack={true} handleBack={() => navigation.goBack()} />
      <View className="px-4 py-[14px]">
        <Text className={`${styles("bold-20-title")} text-[#111111]`}>
          식당 리뷰하기
        </Text>
        <Text className={`mt-1 ${styles("12-text")} text-[#383838]`}>
          다른 사람들에게 의견을 알려주세요
        </Text>
        <View className="flex-row justify-around mt-4 mb-10 py-2">
          {Array.from({ length: rating.filter((v) => v).length }, (_, idx) => (
            <TouchableOpacity
              key={idx.toString()}
              onPress={() =>
                setRating(() => Array.from({ length: 5 }, (_, i) => i <= idx))
              }
              activeOpacity={0.8}
            >
              <FullStarIcon width={32} height={32} />
            </TouchableOpacity>
          ))}
          {Array.from({ length: rating.filter((v) => !v).length }, (_, idx) => (
            <TouchableOpacity
              key={idx.toString()}
              onPress={() =>
                setRating(() =>
                  Array.from(
                    { length: 5 },
                    (_, i) => i <= idx + rating.filter((v) => v).length
                  )
                )
              }
              activeOpacity={0.8}
            >
              <EmptyStarIcon width={32} height={32} />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

export default ReviewScreen;
