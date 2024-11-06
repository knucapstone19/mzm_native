import { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import LocationIcon from "../../assets/images/icons/location.svg";
import UnlikedIcon from "../../assets/images/icons/unliked.svg";
import LikedIcon from "../../assets/images/icons/liked.svg";
import FullStarIcon from "../../assets/images/icons/full_star.svg";
import HalfStarIcon from "../../assets/images/icons/half_star.svg";
import EmptyStarIcon from "../../assets/images/icons/empty_star.svg";
import styles from "../styles/styles";

const StoreItem = ({
  storeName,
  liked,
  rating,
  reviewCount,
  category,
  address,
  storeImage,
}) => {
  const [isLiked, setIsLiked] = useState(liked);
  const intCount = ~~rating;
  const halfCount = rating % 1 && 1;
  const emptyCount = 5 - intCount - halfCount;
  const images = storeImage ?? new Array(4).fill(null);

  return (
    <View className="p-4 bg-white">
      <View className="flex-row justify-between items-center">
        <View className="flex-row items-center space-x-2">
          <LocationIcon />
          <Text className={`mt-1 ${styles("bold-20-title")} text-[#111111]`}>
            {storeName}
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
          {Number.isInteger(rating) ? rating.toFixed(1) : rating}
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
          ({reviewCount}건)
        </Text>
      </View>
      <View className="self-start mt-1.5 px-[9px] py-1 rounded-full border-[#FF8800] border-[1px]">
        <Text className={`${styles("12-text")} text-[#383838]`}>
          {category}
        </Text>
      </View>
      <Text className={`mt-3 ${styles("12-text")} text-[#383838]`}>
        {address}
      </Text>
      <ScrollView
        horizontal={true}
        overScrollMode="never"
        showsHorizontalScrollIndicator={false}
        className="mt-4 space-x-2"
      >
        {images.map((item, idx) => (
          <Image
            key={idx.toString()}
            source={item ?? require("../../assets/images/null_store.png")}
            className={`${
              idx === 0
                ? "rounded-l-xl"
                : idx === images.length - 1 && "rounded-r-xl"
            }`}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default StoreItem;
