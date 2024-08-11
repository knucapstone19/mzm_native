import { View, Text, Image, TouchableOpacity } from "react-native";

const CategoryItem = ({ src, text, isSmall, idx }) => {
  return (
    <TouchableOpacity
      key={idx.toString()}
      className="flex flex-col items-center pb-3 pr-4"
      onPress={() => console.log(text)}
    >
      <View
        className={`bg-[#F0F0F0] ${isSmall ? "p-3" : "p-[10px]"} rounded-full`}
      >
        {/* TODO: 웹 사이트에서 앱을 다운로드할 수 있는 곳이나 사용 중인 플랫폼 또는
          마켓플레이스의 설명 섹션에 이 링크를 붙여 넣어 주세요. 
          https://www.flaticon.com/kr/free-icon/bibimbap_8269621?term=%EB%B9%84%EB%B9%94%EB%B0%A5&page=1&position=3&origin=search&related_id=8269621 */}
        <Image source={src} />
      </View>
      <Text className="mt-1 font-korean text-xs text-[#383838]">{text}</Text>
    </TouchableOpacity>
  );
};

export default CategoryItem;
