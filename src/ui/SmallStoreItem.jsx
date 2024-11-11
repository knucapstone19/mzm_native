import { Image, Text, View } from "react-native";
import LocationIcon from "../../assets/images/icons/location.svg";
import FullStarIcon from "../../assets/images/icons/full_star.svg";
import HalfStarIcon from "../../assets/images/icons/half_star.svg";
import EmptyStarIcon from "../../assets/images/icons/empty_star.svg";
import styles from "../styles/styles";

const SmallStoreItem = ({
  storeImage,
  storeName,
  rating,
  reviewCount,
  category,
  address,
}) => {
  const intCount = ~~rating;
  const halfCount = rating % 1 && 1;
  const emptyCount = 5 - intCount - halfCount;

  return (
    <View className="flex-row mb-12 space-x-3 px-4 pt-[14px] pb-4 rounded-[10px] bg-white">
      <Image
        source={storeImage ?? require("../../assets/images/null_store.png")}
        className="w-[100px] h-[100px] rounded-md"
      />
      <View>
        <View className="flex-row items-center">
          <LocationIcon />
          <Text className={`${styles("16-title")} text-[#111111]`}>
            {storeName}
          </Text>
        </View>
        <View className="flex-row">
          <View className="flex-row items-center ml-1 space-x-1.5">
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
        </View>
        <View className="self-start mt-1.5 px-2 py-[3px] border-[#FF8800] border-[1px] rounded-full">
          <Text className={`${styles("12-text")} text-[#383838]`}>
            {category}
          </Text>
        </View>
        <Text className={`mt-1 ${styles("12-text")} text-[#383838]`}>
          {address}
        </Text>
      </View>
    </View>
  );
};

export default SmallStoreItem;
