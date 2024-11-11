import { Linking, Share, Text, TouchableOpacity, View } from "react-native";
import CallIcon from "../../assets/images/icons/call.svg";
import UnlikedIcon from "../../assets/images/icons/unliked.svg";
import LikedIcon from "../../assets/images/icons/liked.svg";
import ShareIcon from "../../assets/images/icons/share.svg";
import styles from "../styles/styles";

const TabButton = ({ phoneNumber, isLiked, storeName, handleToggle }) => {
  return (
    <View className="flex-row justify-between items-center mb-2 border-t-[1px] border-[#F0F0F0] bg-white">
      <TouchableOpacity
        className="items-center w-1/3 space-y-1 py-4"
        onPress={() => Linking.openURL(`tel:${phoneNumber}`)}
        activeOpacity={0.7}
      >
        <CallIcon />
        <Text className={`${styles("14-text")} text-[#383838]`}>전화</Text>
      </TouchableOpacity>
      <View className="h-9 border-r-[1px] border-[#F0F0F0]" />
      <TouchableOpacity
        className="items-center w-1/3 space-y-1 py-4"
        onPress={handleToggle}
        activeOpacity={0.7}
      >
        {isLiked ? <LikedIcon /> : <UnlikedIcon />}
        <Text className={`${styles("14-text")} text-[#383838]`}>좋아요</Text>
      </TouchableOpacity>
      <View className="h-9 border-r-[1px] border-[#F0F0F0]" />
      <TouchableOpacity
        className="items-center w-1/3 space-y-1 py-4"
        onPress={async () =>
          await Share.share({
            message: `${storeName} 식당을 추천해요!`,
          })
        }
        activeOpacity={0.7}
      >
        <ShareIcon />
        <Text className={`${styles("14-text")} text-[#383838]`}>공유</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TabButton;
