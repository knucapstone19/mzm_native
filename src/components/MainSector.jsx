import { View, Text, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "../styles/styles";

const MainSector = ({ title, parts, src, isBig, width, idx }) => {
  const navigation = useNavigation();

  return (
    <View
      style={{ flexBasis: `${width}%` }}
      className={`py-2 ${idx % 2 ? "pl-2" : idx !== 4 ? "pr-2" : null}`}
    >
      {/* FIXME: opacity 효과가 아닌 눌러지는 애니메이션 효과를 부여하면 더 좋을 듯 */}
      <TouchableOpacity
        style={{
          elevation: 1,
        }}
        className="bg-white h-[104px] px-4 pt-[14px] pb-3 relative overflow-hidden rounded-[10px]"
        activeOpacity={0.9}
        // FIXME: navigation 기능 수정 (임의로 로그 출력)
        onPress={() => {
          if (title === "음식 MBTI") {
            navigation.navigate("MbtiTest");
          }
        }}
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
            className={`${
              isBig
                ? "w-[149px] h-[149px] -right-12 -bottom-16"
                : "w-[89px] h-[89px] -right-10 -bottom-10"
            } absolute`}
            source={src}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default MainSector;
