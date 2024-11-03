import { Image, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "../styles/styles";

const MainSector = ({ idx, title, parts, src, isBig, width }) => {
  const navigation = useNavigation();

  const handleNavigate = () => {
    if (title === "음식 MBTI") {
      navigation.navigate("MbtiTest");
    }
  };

  return (
    <View
      style={{ flexBasis: `${width}%` }}
      className={`${idx % 2 ? "pl-2" : idx !== 4 ? "pr-2" : null} py-2`}
    >
      <TouchableOpacity
        style={{
          elevation: 1,
        }}
        className="h-[104px] px-4 pt-[14px] pb-3 relative overflow-hidden rounded-[10px] bg-white"
        onPress={handleNavigate}
        activeOpacity={0.9}
      >
        <View className="flex-row">
          <View className="flex-col z-10">
            <Text className={`mb-2 ${styles("main")} text-[#111111]`}>
              {title}
            </Text>
            <Text>
              {parts.map((part, idx) => (
                <Text
                  key={idx.toString()}
                  style={{ color: `${part.color ?? "#383838"}` }}
                  className={`${styles("12-text")}`}
                >
                  {part.text}
                </Text>
              ))}
            </Text>
          </View>
          <Image
            source={src}
            className={`${
              isBig
                ? "w-[149px] h-[149px] -right-12 -bottom-16"
                : "w-[89px] h-[89px] -right-10 -bottom-10"
            } absolute`}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default MainSector;
