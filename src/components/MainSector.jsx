import { View, Text, Image, TouchableOpacity } from "react-native";
import styles from "../styles/styles";

const MainSector = ({ title, parts, src, isBig, width, idx }) => {
  return (
    <View
      style={{ flexBasis: `${width}%` }}
      className={`py-2 ${idx % 2 ? "pl-2" : idx !== 4 ? "pr-2" : null}`}
    >
      {/* FIXME: opacity 효과가 아닌 눌러지는 애니메이션 효과를 부여하면 더 좋을 듯 */}
      <View
        style={{
          shadowRadius: 10,
          elevation: 1,
          backgroundColor: "transparent",
          borderRadius: 10,
        }}
      >
        <TouchableOpacity
          activeOpacity={1.0}
          className="bg-white h-[104px] px-4 pt-[14px] pb-3 relative overflow-hidden rounded-[10px]"
          // FIXME: navigation 기능 수정 (임의로 로그 출력)
          onPress={() => console.log(`${title} 눌러짐`)}
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
            {/* TODO: 웹 사이트에서 앱을 다운로드할 수 있는 곳이나 사용 중인 플랫폼 또는
              마켓플레이스의 설명 섹션에 이 링크를 붙여 넣어 주세요. 
              https://www.figma.com/community/file/1030350068466019692/3dicons-open-source-3d-icon-library */}
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
    </View>
  );
};

export default MainSector;
